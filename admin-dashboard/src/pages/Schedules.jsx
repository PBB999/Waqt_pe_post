import React, { useState, useEffect } from "react";
import {
	GoogleMap,
	Marker,
	Polygon,
	DirectionsService,
	DirectionsRenderer,
	useJsApiLoader,
} from "@react-google-maps/api";
import { googleMapsConfig } from "../lib/googleMapsConfig";

const mapContainerStyle = {
	width: "100%",
	height: "600px",
};

const center = {
	lat: 19.8856,
	lng: 74.4766,
};

const generateDeliveries = () => {
	return Array.from({ length: 15 }, (_, i) => {
		const randomHour = Math.floor(Math.random() * 7) + 10;
		const startMinute = Math.floor(Math.random() * 4) * 15;
		const endMinute = (startMinute + Math.floor(Math.random() * 3) * 15) % 60;
		const endHour = randomHour + Math.floor((startMinute + 45) / 60);

		return {
			id: i + 1,
			address: `Delivery ${i + 1}`,
			coordinates: {
				lat: 19.88 + Math.random() * 0.02,
				lng: 74.47 + Math.random() * 0.02,
			},
			timeWindow: {
				start: new Date(new Date().setHours(randomHour, startMinute, 0, 0)),
				end: new Date(new Date().setHours(endHour, endMinute, 0, 0)),
			},
		};
	});
};

const dummyPostmen = [
	{ id: 1, name: "Postman 1" },
	{ id: 2, name: "Postman 2" },
	{ id: 3, name: "Postman 3" },
	{ id: 4, name: "Postman 3" },
];

const App = () => {
	const [assignments, setAssignments] = useState([]);
	const [directionsResponses, setDirectionsResponses] = useState(new Map());
	const [beatAreas, setBeatAreas] = useState([]);
	const [dummyDeliveries, setDummyDeliveries] = useState([]);

	const { isLoaded } = useJsApiLoader(googleMapsConfig);

	useEffect(() => {
		const storedDeliveries = localStorage.getItem("dummyDeliveries");
		if (storedDeliveries) {
			setDummyDeliveries(JSON.parse(storedDeliveries));
		} else {
			const newDeliveries = generateDeliveries();
			setDummyDeliveries(newDeliveries);
			localStorage.setItem("dummyDeliveries", JSON.stringify(newDeliveries));
		}
	}, []);

	const handleDirectionsCallback = (assignmentId, response) => {
		if (response && response.status === "OK") {
			setDirectionsResponses((prev) => new Map(prev).set(assignmentId, response));
		}
	};

	const kMeansClustering = (dataPoints, k) => {
		const maxIterations = 100;
		const centroids = dataPoints.slice(0, k);
		let clusters = Array.from({ length: k }, () => []);

		for (let iteration = 0; iteration < maxIterations; iteration++) {
			clusters = Array.from({ length: k }, () => []);

			dataPoints.forEach((point) => {
				let nearestCentroidIndex = 0;
				let minDistance = Number.MAX_VALUE;

				centroids.forEach((centroid, index) => {
					const distance = Math.sqrt(
						Math.pow(point.lat - centroid.lat, 2) +
							Math.pow(point.lng - centroid.lng, 2),
					);
					if (distance < minDistance) {
						minDistance = distance;
						nearestCentroidIndex = index;
					}
				});

				clusters[nearestCentroidIndex].push(point);
			});

			let centroidsUpdated = false;
			centroids.forEach((centroid, index) => {
				const cluster = clusters[index];
				if (cluster.length > 0) {
					const newLat = cluster.reduce((sum, p) => sum + p.lat, 0) / cluster.length;
					const newLng = cluster.reduce((sum, p) => sum + p.lng, 0) / cluster.length;
					if (newLat !== centroid.lat || newLng !== centroid.lng) {
						centroids[index] = { lat: newLat, lng: newLng };
						centroidsUpdated = true;
					}
				}
			});

			if (!centroidsUpdated) break;
		}

		return clusters;
	};

	const clusterDeliveries = () => {
		const deliveryCoords = dummyDeliveries.map((d) => ({
			...d.coordinates,
			timeWindow: d.timeWindow,
		}));

		const optimalClusters = 4;
		console.log("optimalClusters:", optimalClusters);

		const clusters = kMeansClustering(deliveryCoords, optimalClusters);

		const allDeliveries = dummyDeliveries.sort((a, b) => {
			return new Date(a.timeWindow.start) - new Date(b.timeWindow.start);
		});

		console.log("Sorted Deliveries:", allDeliveries);

		const sortedAssignmentsData = clusters.map((cluster, index) => {
			const postman = dummyPostmen[index];

			const sortedDeliveries = cluster
				.map((delivery) => ({
					...delivery,
					timeWindow: delivery.timeWindow,
				}))
				.sort((a, b) => new Date(a.timeWindow.start) - new Date(b.timeWindow.start)); 

			return {
				postmanId: postman.id,
				postmanName: postman.name,
				beatId: index + 1,
				deliveries: sortedDeliveries,
			};
		});

		setAssignments(sortedAssignmentsData);

		const polygons = clusters.map((cluster) => {
			const latitudes = cluster.map((point) => point.lat);
			const longitudes = cluster.map((point) => point.lng);
			const latMin = Math.min(...latitudes);
			const latMax = Math.max(...latitudes);
			const lngMin = Math.min(...longitudes);
			const lngMax = Math.max(...longitudes);

			const buffer = 0.001;
			return [
				{ lat: latMin - buffer, lng: lngMin - buffer },
				{ lat: latMin - buffer, lng: lngMax + buffer },
				{ lat: latMax + buffer, lng: lngMax + buffer },
				{ lat: latMax + buffer, lng: lngMin - buffer },
			];
		});

		setBeatAreas(polygons);
	};

	const getOptimizedRoute = (deliveries) => {
		const routeCoords = deliveries.map((delivery) => delivery);

		if (routeCoords.length < 2) return {};

		const origin = routeCoords[0];
		const destination = routeCoords[routeCoords.length - 1];
		const waypoints = routeCoords.slice(1, -1).map((coordinate) => ({
			location: coordinate,
			stopover: true,
		}));

		return {
			origin: new window.google.maps.LatLng(origin.lat, origin.lng),
			destination: new window.google.maps.LatLng(destination.lat, destination.lng),
			waypoints,
			travelMode: "DRIVING",
		};
	};

	useEffect(() => {
		if (dummyDeliveries.length > 0) {
			clusterDeliveries();
		}
	}, [dummyDeliveries]);

	if (!isLoaded) return <div>Loading...</div>;

	const routeColors = [
		"#FF0000",
		"#0000FF",
		"#00FF00",
		"#FFA500",
		"#800080",
		"#FFC0CB",
		"#008000",
		"#A52A2A",
	];

	return (
		<div>
			<h1>Indian Post Delivery System</h1>
			<GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={13}>
				{dummyDeliveries.map((delivery) => (
					<Marker
						key={delivery.id}
						position={delivery.coordinates}
						label={`D${delivery.id}`}
					/>
				))}
				{beatAreas.map((polygon, index) => (
					<Polygon
						key={index}
						paths={polygon}
						options={{
							fillColor: routeColors[index % routeColors.length],
							fillOpacity: 0.3,
							strokeColor: routeColors[index % routeColors.length],
							strokeOpacity: 0.8,
							strokeWeight: 2,
						}}
					/>
				))}
				{assignments.map(
					(assignment) =>
						assignment.deliveries.length > 1 &&
						!directionsResponses.has(assignment.postmanId) && (
							<DirectionsService
								key={`service-${assignment.postmanId}`}
								options={getOptimizedRoute(assignment.deliveries)}
								callback={(response) =>
									handleDirectionsCallback(assignment.postmanId, response)
								}
							/>
						),
				)}
				{Array.from(directionsResponses.values()).map((response, index) => (
					<DirectionsRenderer
						key={`renderer-${index}`}
						options={{
							directions: response,
							polylineOptions: {
								strokeColor: routeColors[index % routeColors.length],
							},
						}}
					/>
				))}
			</GoogleMap>
			<h2>Delivery Assignments</h2>
			<table>
				<thead>
					<tr>
						<th>Postman</th>
						<th>Beat ID</th>
						<th>Deliveries</th>
					</tr>
				</thead>
				<tbody>
					{assignments.map((assignment) => (
						<tr key={assignment.postmanId}>
							<td>{assignment.postmanName}</td>
							<td>{assignment.beatId}</td>
							<td>
								<ul>
									{assignment.deliveries.map((delivery) => (
										<li key={delivery.id}>
											D{delivery.id} (
											{new Date(
												delivery.timeWindow.start,
											).toLocaleTimeString()}{" "}
											-
											{new Date(delivery.timeWindow.end).toLocaleTimeString()}
											)
										</li>
									))}
								</ul>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default App;

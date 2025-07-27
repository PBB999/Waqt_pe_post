import React, { useState, useEffect } from "react";
import {
	GoogleMap,
	Marker,
	DirectionsService,
	DirectionsRenderer,
	useJsApiLoader,
	Rectangle
} from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";
import { getParcelByPin } from "../redux/features/parcel/parcelActions";
import { fetchAllPostmen } from "../redux/features/postman/postmanSlice";
import { saveParcelAssignments } from "../redux/features/postman/postmanAction";
import { Button } from "../components/ui/button";
import { googleMapsConfig } from "../lib/googleMapsConfig";

const mapContainerStyle = {
	width: "100%",
	height: "600px",
};

const center = {
	lat: 19.8856,
	lng: 74.4766,
};

const App = () => {
	const [assignments, setAssignments] = useState([]);
	const [directionsResponses, setDirectionsResponses] = useState([]);
	const [totalDistance, setTotalDistance] = useState({});
	const [optimized, setOptimized] = useState(false);
	const dispatch = useDispatch();
	const authState = useSelector((state) => state.auth);
	const [editingAssignment, setEditingAssignment] = useState(null);
	const [editedDeliveries, setEditedDeliveries] = useState([]);

	const handleEditClick = (assignment) => {
		setEditingAssignment(assignment);
		setEditedDeliveries([...assignment.deliveries]);
	};

	const handleSaveChanges = () => {
		setAssignments((prevAssignments) =>
			prevAssignments.map((assignment) =>
				assignment.postman === editingAssignment.postman
					? { ...assignment, deliveries: editedDeliveries }
					: assignment,
			),
		);
		setEditingAssignment(null);
		setEditedDeliveries([]);
	};

	const handleCancelEdit = () => {
		setEditingAssignment(null);
		setEditedDeliveries([]);
	};

	const postmanState = useSelector((state) => state.postman);
	const parcelState = useSelector((state) => state.parcel);

	const saveAssignments = () => {
		if (assignments.length === 0) return;
		assignments.forEach((assignment) => {
			dispatch(
				saveParcelAssignments({
					postmanId: assignment.postman,
					assignments: assignment.deliveries.map((d) => d._id),
				}),
			);
		});
	};

	const kMeansClustering = (dataPoints, k) => {
		const maxIterations = 100;
		let centroids = dataPoints.slice(0, k);
		let clusters = Array.from({ length: k }, () => []);

		for (let iteration = 0; iteration < maxIterations; iteration++) {
			// Reset clusters
			clusters = Array.from({ length: k }, () => []);

			// Assign points to the nearest centroid
			dataPoints.forEach((point) => {
				let nearestCentroidIndex = 0;
				let minDistance = Number.MAX_VALUE;

				centroids.forEach((centroid, index) => {
					const distance = Math.sqrt(
						Math.pow(point.lat - centroid.lat, 2) +
							Math.pow(point.lng - centroid.lng, 2),
					);

					const timeOverlap =
						centroid.timeWindow &&
						point.timeWindow.start < centroid.timeWindow.end &&
						centroid.timeWindow.start < point.timeWindow.end;

					if (distance < minDistance && timeOverlap) {
						minDistance = distance;
						nearestCentroidIndex = index;
					}
				});

				clusters[nearestCentroidIndex].push(point);
			});

			// Balance the clusters
			while (true) {
				const maxClusterIndex = clusters.reduce(
					(maxIdx, cluster, idx) =>
						cluster.length > clusters[maxIdx].length ? idx : maxIdx,
					0,
				);

				const minClusterIndex = clusters.reduce(
					(minIdx, cluster, idx) =>
						cluster.length < clusters[minIdx].length ? idx : minIdx,
					0,
				);

				if (clusters[maxClusterIndex].length - clusters[minClusterIndex].length <= 1) break;

				// Move a point from max cluster to min cluster
				const pointToMove = clusters[maxClusterIndex].pop();
				clusters[minClusterIndex].push(pointToMove);
			}

			// Recalculate centroids
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


	const { isLoaded } = useJsApiLoader(googleMapsConfig);

	const clusterDeliveries = () => {
		if (optimized) return;
		let parcels = parcelState.parcels;
		const deliveryCoords = parcels.map((d) => ({
			lat: d.deliveryAddress.location.latitude,
			lng: d.deliveryAddress.location.longitude,
			timeWindow: {
				start: new Date(d.timeSlot.startTime),
				end: new Date(d.timeSlot.endTime),
			},
		}));
		const postmen = postmanState.postmen;
		console.log("postmen", postmen);
		const optimalClusters = postmen.length;
		const clusters = kMeansClustering(deliveryCoords, optimalClusters);
		parcels = parcels.map((parcel) => ({
			...parcel,
			timeSlot: {
				startTime: new Date(parcel.timeSlot.startTime),
				endTime: new Date(parcel.timeSlot.endTime),
			},
		}));
		const clusteredAssignments = clusters.map((cluster, index) => ({
			postman: postmen[index]._id,
			deliveries: cluster.map((point) =>
				parcels.find((d) => {
					return (
						d.deliveryAddress.location.latitude === point.lat &&
						d.deliveryAddress.location.longitude === point.lng &&
						d.timeSlot.startTime.toLocaleTimeString() ===
							point.timeWindow.start.toLocaleTimeString() &&
						d.timeSlot.endTime.toLocaleTimeString() ===
							point.timeWindow.end.toLocaleTimeString()
					);
				}),
			),
		}));
		clusteredAssignments.forEach((assignment) => {
			assignment.deliveries.sort((a, b) => a.timeSlot.startTime - b.timeSlot.startTime);
		});
		setAssignments(clusteredAssignments);
		optimizeRoutes(clusteredAssignments);
		setOptimized(true);
	};

	const optimizeRoutes = (clusteredAssignments) => {
		setDirectionsResponses([]);
		setTimeout(() => {}, 1999);
		clusteredAssignments.forEach((assignment, index) => {
			const waypoints = assignment.deliveries.map((delivery) => ({
				location: {
					lat: delivery.deliveryAddress.location.latitude,
					lng: delivery.deliveryAddress.location.longitude,
				},
				stopover: true,
			}));

			if (waypoints.length > 1) {
				const chunkedWaypoints = chunkWaypoints(waypoints, 23);

				chunkedWaypoints.forEach((chunk, chunkIndex) => {
					const origin = chunk[0]?.location;
					const destination = chunk[chunk.length - 1]?.location;
					const waypoints = chunk.slice(1, -1);

					setDirectionsResponses((prev) => [
						...prev,
						{
							id: `${index}-${chunkIndex}`,
							postman: assignment.postman,
							origin: origin,
							destination: destination,
							waypoints: waypoints,
							directions: null,
							distance: 0,
						},
					]);
				});
			}
		});
	};

	const handleDirectionsCallback = (chunkId, response) => {
		if (response && response.status === "OK") {
			const totalDistanceForRoute = response.routes[0].legs.reduce(
				(sum, leg) => sum + leg.distance.value,
				0,
			);

			setDirectionsResponses((prev) =>
				prev.map((res) =>
					res.id === chunkId
						? { ...res, directions: response, distance: totalDistanceForRoute }
						: res,
				),
			);

			const [postmanId] = chunkId.split("-");
			setTotalDistance((prevDistance) => ({
				...prevDistance,
				[postmanId]: (prevDistance[postmanId] || 0) + totalDistanceForRoute,
			}));
		}
	};

	const chunkWaypoints = (waypoints, chunkSize) => {
		const chunks = [];
		for (let i = 0; i < waypoints.length; i += chunkSize) {
			chunks.push(waypoints.slice(i, i + chunkSize));
		}
		return chunks;
	};

	useEffect(() => {
		setTotalDistance({});
	}, [directionsResponses]);

	const getDeliveries = (pin) => {
		dispatch(getParcelByPin(pin));
	};

	useEffect(() => {
		if (!authState?.userInfo?.pinCode) return;
		getDeliveries(authState.userInfo.pinCode);
	}, [authState]);
	useEffect(() => {
		if (!authState?.userInfo?.pinCode) return;
		dispatch(fetchAllPostmen());
	}, [authState]);

	useEffect(() => {
		if (parcelState.parcels.length > 0 && postmanState.postmen.length > 0) {
			clusterDeliveries();
		}
	}, [parcelState.parcels, postmanState.postmen]);

	const calculateBoundingBox = (deliveries) => {
		const lats = deliveries.map((delivery) => delivery.deliveryAddress.location.latitude);
		const lngs = deliveries.map((delivery) => delivery.deliveryAddress.location.longitude);

		const bounds = {
			north: Math.max(...lats),
			south: Math.min(...lats),
			east: Math.max(...lngs),
			west: Math.min(...lngs),
		};

		return bounds;
	};


	if (!isLoaded) return <div>Loading...</div>;

	return (
		<div>
			<Button onClick={clusterDeliveries}>Cluster & Optimize Routes</Button>
			<GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={13}>
				{/* Markers for deliveries */}
				{parcelState.parcels?.map((delivery) => (
					<Marker
						key={delivery._id}
						position={{
							lat: delivery.deliveryAddress.location.latitude,
							lng: delivery.deliveryAddress.location.longitude,
						}}
						label={`${
							delivery.receiverId?.name ? delivery.receiverId.name : "Unknown"
						}`}
					/>
				))}

				{/* Rectangles for clusters */}
				{assignments.map((assignment, index) => {
					if (!assignment.deliveries || assignment.deliveries.length === 0) return null;

					const bounds = calculateBoundingBox(assignment.deliveries);

					return (
						<Rectangle
							key={index}
							options={{
								bounds: bounds,
								strokeColor: ["#FF0000", "#0000FF", "#00FF00", "#FFA500"][
									index % 4
								],
								strokeOpacity: 0.8,
								strokeWeight: 2,
								fillColor: ["#FFCCCC", "#CCCCFF", "#CCFFCC", "#FFE5CC"][index % 4],
								fillOpacity: 0.2,
							}}
						/>
					);
				})}

				{/* Directions rendering */}
				{directionsResponses.map((request, index) => (
					<React.Fragment key={index}>
						{!request.directions && (
							<DirectionsService
								options={{
									origin: request.origin,
									destination: request.destination,
									waypoints: request.waypoints,
									optimizeWaypoints: true,
									travelMode: "DRIVING",
								}}
								callback={(response) => {
									handleDirectionsCallback(request.id, response);
								}}
							/>
						)}
						{request.directions && (
							<DirectionsRenderer
								options={{
									directions: request.directions,
									polylineOptions: {
										strokeColor: ["#FF0000", "#0000FF", "#00FF00", "#FFA500"][
											index % 4
										],
										strokeWeight: 4,
									},
								}}
							/>
						)}
					</React.Fragment>
				))}
			</GoogleMap>
			<div className="flex justify-end p-5">
				{postmanState.parcelAssignmentLoading ? (
					<Button>Saving...</Button>
				) : (
					<Button onClick={() => saveAssignments()}>Save Assignments</Button>
				)}
			</div>
			<div>
				<h2>Assignments</h2>
				<table class="table-auto border-collapse border border-gray-300 w-full text-sm text-left">
					<thead class="bg-gray-100">
						<tr>
							<th class="border border-gray-300 px-4 py-2">Postman</th>
							<th class="border border-gray-300 px-4 py-2">Assigned Deliveries</th>
							<th class="border border-gray-300 px-4 py-2">Time Slots</th>
							<th class="border border-gray-300 px-4 py-2">
								Total Distance (meters)
							</th>
						</tr>
					</thead>
					<tbody>
						{assignments.map((assignment, index) => {
							return (
								<tr key={index} class="hover:bg-gray-50">
									<td class="border border-gray-300 px-4 py-2 font-medium text-gray-700">
										{
											postmanState.postmen.filter(
												(postman) => postman._id === assignment.postman,
											)[0].name
										}
									</td>
									<td class="border border-gray-300 px-4 py-2 text-gray-600">
										{assignment.deliveries.map((delivery, idx) => (
											<div key={idx} class="mb-1">
												{delivery.receiverId?.name || "Unknown"}
											</div>
										))}
									</td>
									<td class="border border-gray-300 px-4 py-2 text-gray-600">
										{assignment.deliveries.map((delivery, idx) => {
											const startTime = new Date(
												delivery.timeSlot.startTime,
											).toLocaleTimeString([], {
												hour: "2-digit",
												minute: "2-digit",
											});
											const endTime = new Date(
												delivery.timeSlot.endTime,
											).toLocaleTimeString([], {
												hour: "2-digit",
												minute: "2-digit",
											});
											return (
												<div key={idx} class="mb-1">
													{startTime} - {endTime}
												</div>
											);
										})}
									</td>
									<td class="border border-gray-300 px-4 py-2 text-gray-600">
										{directionsResponses
											.filter((res) => res.postman === assignment.postman)
											.reduce((sum, res) => sum + (res.distance || 0), 0)}
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default App;

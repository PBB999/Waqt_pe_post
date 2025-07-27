import { GoogleMap, Marker, Polyline, useJsApiLoader } from "@react-google-maps/api";
import React, { useMemo } from "react";

const PostmenRoutesMap = ({ postmenRoutes }) => {
	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey: "AIzaSyD_8jnLrih5VTanXsxpTAM6KPD7kn9x_vM",
	});

	const containerStyle = {
		width: "100%",
		height: "600px",
	};

	const bounds = useMemo(() => {
		if (!isLoaded || !postmenRoutes) return null;

		const bounds = new window.google.maps.LatLngBounds();
		postmenRoutes.forEach((postman) => {
			postman.locations.forEach((location) => {
				bounds.extend(location);
			});
		});
		return bounds;
	}, [isLoaded, postmenRoutes]);

	const colors = ["#FF0000", "#0000FF", "#008000", "#FFA500", "#800080"];
	const mapRef = React.useRef(null);

	const onLoad = (map) => {
		mapRef.current = map;
		if (bounds) {
			map.fitBounds(bounds);
		}
	};

	if (!isLoaded) return <div>Loading...</div>;

	return (
		<GoogleMap
			mapContainerStyle={containerStyle}
			onLoad={onLoad}
			options={{ disableDefaultUI: true }}
		>
			{postmenRoutes.map((postman, index) => (
				<React.Fragment key={postman.id}>
					<Polyline
						path={postman.locations}
						options={{
							strokeColor: colors[index % colors.length],
							strokeOpacity: 0.8,
							strokeWeight: 4,
						}}
					/>
					{postman.locations.map((location, locIndex) => (
						<Marker
							key={`${postman.id}-${locIndex}`}
							position={location}
							icon={{
								path: window.google.maps.SymbolPath.CIRCLE,
								scale: 6,
								fillColor: "#991B0b",
								fillOpacity: 1,
								strokeWeight: 0,
							}}
						/>
					))}
				</React.Fragment>
			))}
		</GoogleMap>
	);
};

export default PostmenRoutesMap;

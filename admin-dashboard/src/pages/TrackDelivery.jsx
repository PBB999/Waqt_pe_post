import React, { useState } from "react";
import EnterId from "../components/custom/EnterId";
import TrackDetails from "../components/custom/TrackDetails";

const TrackDelivery = () => {
	const [orderId, setOrderId] = useState(null);
	const [trackingDetails, setTrackingDetails] = useState(null);

	const mockTrackingDetails = {
		sender: {
			name: "John Doe",
			address: "1234 Elm St, Springfield, IL",
		},
		receiver: {
			name: "Jane Smith",
			address: "5678 Oak St, Chicago, IL",
		},
		status: "In Transit",
		progress: 50,
	};

	const handleTrackDelivery = (id) => {
		setOrderId(id);
		setTrackingDetails(mockTrackingDetails);
		console.log(`Tracking delivery for order ID: ${id}`);
	};

	return (
		<div className="min-h-screen bg-gray-100 relative">
			<EnterId onTrackDelivery={handleTrackDelivery} />

			{orderId && (
				<div className="mt-6">
					<TrackDetails orderId={orderId} trackingDetails={trackingDetails} />
				</div>
			)}
		</div>
	);
};

export default TrackDelivery;

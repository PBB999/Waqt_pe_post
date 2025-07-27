import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const TrackDeliveries = () => {
	const { id } = useParams();
	const [parcelData, setParcelData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchParcelData = async () => {
			try {
				setLoading(true);
				const response = await axios.get(`http://localhost:5000/api/parcel/${id}`, {
					headers: {
						"Content-Type": "application/json",
					},
				});

				console.log("Response:", response.data);

				setParcelData(response.data);
			} catch (err) {
				console.error("Fetch Error:", err.response ? err.response.data : err.message);
				setError(err.response?.data?.message || "Failed to fetch parcel details");
			} finally {
				setLoading(false);
			}
		};

		if (id) {
			fetchParcelData();
		}
	}, [id]);

	if (loading) return <div className="loader">Loading...</div>;
	if (error) return <div className="error">{error}</div>;

	return (
		<div className="track-delivery">
			<h1>Track Your Delivery</h1>
			{parcelData ? (
				<div className="parcel-details">
					<p>
						<strong>Parcel ID:</strong> {parcelData._id}
					</p>
					<p>
						<strong>Status:</strong> {parcelData.status}
					</p>
					<p>
						<strong>Sender:</strong> {parcelData.senderId}
					</p>
					<p>
						<strong>Receiver:</strong> {parcelData.receiverId}
					</p>
					<p>
						<strong>Pickup Address:</strong> {parcelData.pickupAddress}
					</p>
					<p>
						<strong>Delivery Address:</strong> {parcelData.deliveryAddress}
					</p>
					<p>
						<strong>Delivery Type:</strong> {parcelData.deliveryType}
					</p>
					<p>
						<strong>Price:</strong> {parcelData.price} USD
					</p>
					<p>
						<strong>Created At:</strong>{" "}
						{new Date(parcelData.createdAt).toLocaleString()}
					</p>
					<p>
						<strong>Updated At:</strong>{" "}
						{new Date(parcelData.updatedAt).toLocaleString()}
					</p>
				</div>
			) : (
				<p>No parcel data found.</p>
			)}
		</div>
	);
};

export default TrackDeliveries;

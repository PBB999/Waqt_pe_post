import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EnterId = () => {
	const [orderId, setOrderId] = useState("");
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (orderId) {
			navigate(`/track-delivery/${orderId}`);
		} else {
			alert("Please enter a valid order ID");
		}
	};

	return (
		<div className="absolute top-4 left-4 w-96">
			<form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-lg w-full">
				<h2 className="text-2xl font-bold mb-4 text-center">Track Delivery</h2>
				<input
					type="text"
					value={orderId}
					onChange={(e) => setOrderId(e.target.value)}
					className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
					placeholder="Enter Order ID"
				/>
				<button
					type="submit"
					className="w-full bg-red-800 text-white py-2 rounded hover:bg-red-700"
				>
					Track Delivery
				</button>
			</form>
		</div>
	);
};

export default EnterId;

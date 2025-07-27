import React from "react";
import { useNavigate } from "react-router-dom";

const TrackDetails = () => {
	const sender = {
		name: "John Doe",
		address: "123 Main Street, Springfield, USA",
		contact: "+1 234 567 890",
	};

	const receiver = {
		name: "Jane Smith",
		address: "456 Elm Street, Gotham, USA",
		contact: "+1 987 654 321",
	};

	const trackingStatus = [
		{ step: "Picked Up", completed: true },
		{ step: "In Transit", completed: true },
		{ step: "Out for Delivery", completed: false },
		{ step: "Delivered", completed: false },
	];

	const navigate = useNavigate();

	return (
		<div className="min-h-screen bg-gray-100 flex items-center justify-center">
			<div className="w-full max-w-4xl bg-white rounded-lg shadow-xl p-8">
				<h1 className="text-3xl font-bold text-red-800 text-center mb-8">Track Details</h1>
				<div className="flex justify-between mb-8">
					<div className="w-1/2 p-4 border rounded-lg shadow-md">
						<h2 className="text-lg font-semibold text-gray-700">Sender Information</h2>
						<p className="mt-2 text-gray-600">Name: {sender.name}</p>
						<p className="mt-1 text-gray-600">Address: {sender.address}</p>
						<p className="mt-1 text-gray-600">Contact: {sender.contact}</p>
					</div>
					<div className="w-1/2 p-4 border rounded-lg shadow-md">
						<h2 className="text-lg font-semibold text-gray-700">
							Receiver Information
						</h2>
						<p className="mt-2 text-gray-600">Name: {receiver.name}</p>
						<p className="mt-1 text-gray-600">Address: {receiver.address}</p>
						<p className="mt-1 text-gray-600">Contact: {receiver.contact}</p>
					</div>
				</div>
				<div className="mb-6">
					<h2 className="text-lg font-semibold text-gray-700 mb-6">Tracking Status</h2>
					<div className="flex items-center justify-between relative">
						{trackingStatus.map((status, index) => (
							<div key={index} className="flex flex-col items-center relative">
								<div
									className={`w-6 h-6 rounded-full flex items-center justify-center font-bold border-2 ${
										status.completed
											? "border-red-800 bg-white"
											: "border-gray-300 bg-white"
									}`}
								>
									{status.completed && (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="w-4 h-4 text-red-800"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											strokeWidth={2}
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M5 13l4 4L19 7"
											/>
										</svg>
									)}
								</div>
								<p
									className={`mt-2 text-sm font-medium ${
										status.completed ? "text-red-800" : "text-gray-500"
									}`}
								>
									{status.step}
								</p>
								{index < trackingStatus.length - 1 && (
									<div
										className={`absolute bottom-10 transform -translate-y-1/2 left-20 w-48 ${
											status.completed
												? "border-t-2 border-red-800"
												: "border-t-2 border-dotted border-gray-400"
										}`}
									/>
								)}
							</div>
						))}
					</div>
				</div>
				<div className="text-center">
					<button
						onClick={() => navigate("/track-delivery")}
						className="mt-6 px-6 py-2 bg-red-800 text-white rounded hover:bg-red-700"
					>
						Back to Track Delivery
					</button>
				</div>
			</div>
		</div>
	);
};

export default TrackDetails;

import React from "react";
import { Truck, QrCode, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ActionButtons = () => {
	const navigate = useNavigate();
	return (
		<div className="bg-gray-100 shadow-md rounded-lg p-8 mb-5">
			<h3 className="text-2xl font-semibold text-gray-800 mb-6">Actions</h3>
			<div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
				<button
					className="group w-full flex flex-col items-center justify-center px-6 py-4 bg-white text-gray-800 font-medium rounded-lg shadow-md hover:bg-red-800 hover:text-white transition duration-300"
					onClick={() => navigate("/assign-delivery")}
				>
					<div className="mb-2 p-4 bg-red-100 group-hover:bg-red-700 rounded-full transition duration-300">
						<Truck className="w-8 h-8 text-red-800 group-hover:text-white transition duration-300" />
					</div>
					Assign Deliveries
					<p className="text-sm text-gray-600 group-hover:text-gray-200 mt-1 text-center">
						Manually or Automatically based on QR data and time slot
					</p>
				</button>
				<button
					className="group w-full flex flex-col items-center justify-center px-6 py-4 bg-white text-gray-800 font-medium rounded-lg shadow-md hover:bg-red-800 hover:text-white transition duration-300"
					onClick={() => navigate("/qr-management")}
				>
					<div className="mb-2 p-4 bg-red-100 group-hover:bg-red-700 rounded-full transition duration-300">
						<QrCode className="w-8 h-8 text-red-800 group-hover:text-white transition duration-300" />
					</div>
					Bulk QR Code Generation
					<p className="text-sm text-gray-600 group-hover:text-gray-200 mt-1 text-center">
						Generate QR codes in bulk for deliveries
					</p>
				</button>
				<button
					className="group w-full flex flex-col items-center justify-center px-6 py-4 bg-white text-gray-800 font-medium rounded-lg shadow-md hover:bg-red-800 hover:text-white transition duration-300"
					onClick={() => navigate("/schedules")}
				>
					<div className="mb-2 p-4 bg-red-100 group-hover:bg-red-700 rounded-full transition duration-300">
						<MapPin className="w-8 h-8 text-red-800 group-hover:text-white transition duration-300" />
					</div>
					Delivery Tracking on Maps
					<p className="text-sm text-gray-600 group-hover:text-gray-200 mt-1 text-center">
						View pickup and drop coordinates
					</p>
				</button>
			</div>
		</div>
	);
};

export default ActionButtons;

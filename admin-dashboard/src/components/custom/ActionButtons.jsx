import React from "react";
import { Truck, QrCode, Users, Bell, FileText, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ActionButtons = () => {
	const navigate = useNavigate();
	return (
		<div className="bg-gray-100 shadow-md rounded-lg p-8 m-2">
			<h3 className="text-2xl font-semibold text-gray-800 mb-6">Actions</h3>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
				<button
					className="group w-full flex flex-col items-center justify-center px-6 py-4 bg-white text-gray-800 font-medium rounded-lg shadow-md hover:bg-red-800 hover:text-white transition duration-300"
					onClick={() => navigate("/assign-delivery")}
				>
					<div className="mb-2 p-4 bg-red-100 group-hover:bg-red-700 rounded-full transition duration-300">
						<Truck className="w-8 h-8 text-red-800 group-hover:text-white transition duration-300" />
					</div>
					Assign Deliveries
				</button>
				<button
					className="group w-full flex flex-col items-center justify-center px-6 py-4 bg-white text-gray-800 font-medium rounded-lg shadow-md hover:bg-red-800 hover:text-white transition duration-300"
					onClick={() => navigate("/qr-management")}
				>
					<div className="mb-2 p-4 bg-red-100 group-hover:bg-red-700 rounded-full transition duration-300">
						<QrCode className="w-8 h-8 text-red-800 group-hover:text-white transition duration-300" />
					</div>
					Generate QR Codes
				</button>
				<button
					className="group w-full flex flex-col items-center justify-center px-6 py-4 bg-white text-gray-800 font-medium rounded-lg shadow-md hover:bg-red-800 hover:text-white transition duration-300"
					onClick={() => navigate("/postman-management")}
				>
					<div className="mb-2 p-4 bg-red-100 group-hover:bg-red-700 rounded-full transition duration-300">
						<Users className="w-8 h-8 text-red-800 group-hover:text-white transition duration-300" />
					</div>
					Manage Postmen
				</button>
				<button
					className="group w-full flex flex-col items-center justify-center px-6 py-4 bg-white text-gray-800 font-medium rounded-lg shadow-md hover:bg-red-800 hover:text-white transition duration-300"
					onClick={() => navigate("/complaints")}
				>
					<div className="mb-2 p-4 bg-red-100 group-hover:bg-red-700 rounded-full transition duration-300">
						<AlertTriangle className="w-8 h-8 text-red-800 group-hover:text-white transition duration-300" />
					</div>
					Check Complaints
				</button>
				<button
					className="group w-full flex flex-col items-center justify-center px-6 py-4 bg-white text-gray-800 font-medium rounded-lg shadow-md hover:bg-red-800 hover:text-white transition duration-300"
					onClick={() => navigate("/assign-delivery")}
				>
					<div className="mb-2 p-4 bg-red-100 group-hover:bg-red-700 rounded-full transition duration-300">
						<Bell className="w-8 h-8 text-red-800 group-hover:text-white transition duration-300" />
					</div>
					Check Notifications
				</button>
				<button
					className="group w-full flex flex-col items-center justify-center px-6 py-4 bg-white text-gray-800 font-medium rounded-lg shadow-md hover:bg-red-800 hover:text-white transition duration-300"
					onClick={() => navigate("/report-analytics")}
				>
					<div className="mb-2 p-4 bg-red-100 group-hover:bg-red-700 rounded-full transition duration-300">
						<FileText className="w-8 h-8 text-red-800 group-hover:text-white transition duration-300" />
					</div>
					Check Reports
				</button>
			</div>
		</div>
	);
};

export default ActionButtons;

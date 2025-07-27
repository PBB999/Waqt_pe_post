import React from "react";
import { FaEye, FaUser } from "react-icons/fa";
import { Button } from "../ui/button";

const ActivePostmen = () => {
	const postmen = [
		{ id: 1, name: "John Doe", status: "Active", deliveries: 15 },
		{ id: 2, name: "Jane Smith", status: "Active", deliveries: 20 },
		{ id: 3, name: "Samuel Green", status: "Active", deliveries: 0 },
		{ id: 4, name: "Rajaram Dike", status: "Active", deliveries: 5 },
		{ id: 4, name: "Tukaram Bhike", status: "Active", deliveries: 5 },
	];

	return (
		<div className="p-6 bg-gray-100 rounded-lg shadow-md">
			<h3 className="text-2xl font-semibold text-gray-800 mb-4">Active Postmen</h3>
			<div className="space-y-1">
				{postmen
					.filter((postman) => postman.status === "Active")
					.map((postman) => (
						<div
							key={postman.id}
							className="bg-white p-2 border px-5 rounded-lg shadow-lg flex justify-between items-center"
						>
							<div className="flex items-center space-x-3">
								<FaUser className="text-red-800 " />
								<div className="flex flex-col">
									<span className="text-md font-medium text-gray-800">
										{postman.name}
									</span>
									<span className="text-xs text-gray-500">
										Deliveries: {postman.deliveries}
									</span>
								</div>
							</div>
							<span className="text-sm text-green-500 font-medium">
								{postman.status}
							</span>
						</div>
					))}
			</div>
			<Button className="mt-4 bg-red-800 text-white hover:bg-red-900 flex items-center justify-center space-x-2">
				<FaEye />
				<span>View All</span>
			</Button>
		</div>
	);
};

export default ActivePostmen;

import React from "react";
import { FaMedal } from "react-icons/fa";
import { Button } from "../ui/button";

const TopPerformingPostmen = () => {
	const postmen = [
		{ id: 1, name: "John Doe", deliveries: 25 },
		{ id: 2, name: "Jane Smith", deliveries: 20 },
		{ id: 3, name: "Samuel Green", deliveries: 15 },
		{ id: 4, name: "Rajaram Dike", deliveries: 10 },
		{ id: 5, name: "Tukaram Bhike", deliveries: 8 },
	];

	const sortedPostmen = postmen.sort((a, b) => b.deliveries - a.deliveries);

	return (
		<div className="p-6 bg-blue-50 rounded-lg shadow-md">
			<h3 className="text-2xl font-semibold text-blue-800 mb-4">Top Performing Postmen</h3>
			<div className="space-y-2">
				{sortedPostmen.map((postman, index) => (
					<div
						key={postman.id}
						className="bg-white p-3 border rounded-lg shadow flex justify-between items-center"
					>
						<div className="flex items-center space-x-3">
							<FaMedal
								className={`text-xl ${
									index === 0
										? "text-yellow-500"
										: index === 1
										? "text-gray-400"
										: "text-orange-400"
								}`}
							/>
							<div className="flex flex-col">
								<span className="text-lg font-medium text-gray-800">
									{postman.name}
								</span>
								<span className="text-sm text-gray-600">
									Deliveries this month: {postman.deliveries}
								</span>
							</div>
						</div>
						<span className="text-md font-semibold text-blue-600">#{index + 1}</span>
					</div>
				))}
			</div>
			<Button className="mt-4 bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center space-x-2">
				View All
			</Button>
		</div>
	);
};

export default TopPerformingPostmen;

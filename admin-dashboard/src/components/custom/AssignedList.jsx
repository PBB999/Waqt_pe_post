import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

import AssignedDeliveries from "./AssignedDeliveryDetails";

const PostmanList = () => {
	const [selectedPostmanId, setSelectedPostmanId] = useState(null);

	const postmen = [
		{
			id: "P001",
			name: "Rajesh Verma",
			mobile: "9876543210",
			assignedDeliveries: 20,
			completedDeliveries: 15,
			pendingDeliveries: 5,
		},
		{
			id: "P002",
			name: "Anjali Mehta",
			mobile: "9123456789",
			assignedDeliveries: 18,
			completedDeliveries: 17,
			pendingDeliveries: 1,
		},
		{
			id: "P003",
			name: "Suresh Gupta",
			mobile: "9823456789",
			assignedDeliveries: 25,
			completedDeliveries: 20,
			pendingDeliveries: 5,
		},
	];

	const handleViewDetails = (id) => {
		setSelectedPostmanId(id);
	};

	const handleBackToList = () => {
		setSelectedPostmanId(null);
	};

	return (
		<div className="p-6 bg-gray-100 min-h-screen">
			{!selectedPostmanId ? (
				<Card className="p-6 bg-white rounded-lg shadow-lg">
					<h1 className="text-2xl font-semibold text-gray-800 mb-6">Postman List</h1>

					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Postman ID</TableHead>
								<TableHead>Name</TableHead>
								<TableHead>Mobile Number</TableHead>
								<TableHead>Assigned Deliveries</TableHead>
								<TableHead>Completed Deliveries</TableHead>
								<TableHead>Pending Deliveries</TableHead>
								<TableHead>Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{postmen.map((postman) => (
								<TableRow key={postman.id}>
									<TableCell>{postman.id}</TableCell>
									<TableCell>{postman.name}</TableCell>
									<TableCell>{postman.mobile}</TableCell>
									<TableCell>{postman.assignedDeliveries}</TableCell>
									<TableCell>{postman.completedDeliveries}</TableCell>
									<TableCell>{postman.pendingDeliveries}</TableCell>
									<TableCell>
										<Button
											className="bg-blue-700 text-white hover:bg-blue-800"
											onClick={() => handleViewDetails(postman.id)}
										>
											View Details
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</Card>
			) : (
				<>
					<Button
						className="mb-4 bg-gray-600 text-white hover:bg-gray-700"
						onClick={handleBackToList}
					>
						Back to Postman List
					</Button>
					<AssignedDeliveries postmanId={selectedPostmanId} />
				</>
			)}
		</div>
	);
};

export default PostmanList;

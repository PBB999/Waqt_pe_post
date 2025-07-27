import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Card } from "@/components/ui/card";
import { Button } from "../ui/button";
import { Modal } from "../ui/modal";

const AssignedDeliveries = ({ postmanId }) => {
	const [deliveries, setDeliveries] = useState([]);
	const [postmanName, setPostmanName] = useState("");
	const [selectedDelivery, setSelectedDelivery] = useState(null);

	const postmen = [
		{
			id: "P001",
			name: "Rajesh Verma",
			deliveries: [
				{
					id: "D001",
					receiver: "Priya Sharma",
					senderName: "Arun Gupta",
					senderMobile: "9988776655",
					senderAddress: "Delhi, India",
					senderCity: "Delhi",
					senderPincode: "110001",
					receiverAddress: "Mumbai, India",
					receiverCity: "Mumbai",
					receiverPincode: "400001",
					receiverMobile: "9876543210",
					pickupType: "Postman",
					pickupPostman: "Rajesh Verma",
					pickupTimeWindow: "10:00 AM - 12:00 PM",
					status: "In Transit",
					timeline: [
						{ time: "10:00 AM, Jan 1", location: "Delhi (Sender)" },
						{ time: "3:00 PM, Jan 2", location: "Sorting Hub (Noida)" },
						{ time: "12:00 PM, Jan 3", location: "Mumbai (Receiver)" },
					],
				},
				{
					id: "D002",
					receiver: "Amit Malhotra",
					senderName: "Sunita Mehta",
					senderMobile: "8889997766",
					senderAddress: "Noida, India",
					senderCity: "Noida",
					senderPincode: "201301",
					receiverAddress: "Pune, India",
					receiverCity: "Pune",
					receiverPincode: "411001",
					receiverMobile: "9123456789",
					pickupType: "Self",
					pickupTimeWindow: "9:00 AM - 11:00 AM",
					status: "Delivered",
					timeline: [
						{ time: "9:00 AM, Jan 1", location: "Noida (Sender)" },
						{ time: "6:00 PM, Jan 2", location: "Sorting Hub (Mumbai)" },
						{ time: "10:00 AM, Jan 4", location: "Pune (Receiver)" },
					],
				},
			],
		},
	];

	useEffect(() => {
		const postman = postmen.find((p) => p.id === postmanId);
		if (postman) {
			setDeliveries(postman.deliveries);
			setPostmanName(postman.name);
		}
	}, [postmanId]);

	const handleShowDetails = (delivery) => {
		setSelectedDelivery(delivery);
	};

	const handleCloseDetails = () => {
		setSelectedDelivery(null);
	};

	return (
		<Card className="p-6 bg-white rounded-lg shadow-lg">
			<h1 className="text-2xl font-semibold text-gray-800 mb-6">
				Assigned Deliveries for {postmanName}
			</h1>

			{deliveries.length > 0 ? (
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Delivery ID</TableHead>
							<TableHead>Receiver</TableHead>
							<TableHead>Sender Address</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Details</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{deliveries.map((delivery) => (
							<TableRow key={delivery.id}>
								<TableCell>{delivery.id}</TableCell>
								<TableCell>{delivery.receiver}</TableCell>
								<TableCell>{delivery.senderAddress}</TableCell>
								<TableCell>{delivery.status}</TableCell>
								<TableCell>
									<Button
										onClick={() => handleShowDetails(delivery)}
										className="bg-blue-700 text-white hover:bg-blue-800"
									>
										View Details
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			) : (
				<p>No deliveries assigned to this postman.</p>
			)}

			{selectedDelivery && (
				<Modal onClose={handleCloseDetails}>
					<div className="p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
						<h2 className="text-2xl font-semibold text-gray-800 mb-6">
							Delivery Details
						</h2>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							<div>
								<h3 className="text-lg font-bold mb-4">Sender Details</h3>
								<p>
									<strong>Name:</strong> {selectedDelivery.senderName}
								</p>
								<p>
									<strong>Mobile:</strong> {selectedDelivery.senderMobile}
								</p>
								<p>
									<strong>Address:</strong> {selectedDelivery.senderAddress}
								</p>
								<p>
									<strong>City:</strong> {selectedDelivery.senderCity}
								</p>
								<p>
									<strong>Pincode:</strong> {selectedDelivery.senderPincode}
								</p>
								<p>
									<strong>Pickup Type:</strong> {selectedDelivery.pickupType}
								</p>
								{selectedDelivery.pickupType === "Postman" && (
									<p>
										<strong>Pickup Postman:</strong>{" "}
										{selectedDelivery.pickupPostman}
									</p>
								)}
								<p>
									<strong>Pickup Time Window:</strong>{" "}
									{selectedDelivery.pickupTimeWindow}
								</p>
							</div>
							<div>
								<h3 className="text-lg font-bold mb-4">Receiver Details</h3>
								<p>
									<strong>Name:</strong> {selectedDelivery.receiver}
								</p>
								<p>
									<strong>Mobile:</strong> {selectedDelivery.receiverMobile}
								</p>
								<p>
									<strong>Address:</strong> {selectedDelivery.receiverAddress}
								</p>
								<p>
									<strong>City:</strong> {selectedDelivery.receiverCity}
								</p>
								<p>
									<strong>Pincode:</strong> {selectedDelivery.receiverPincode}
								</p>
							</div>
						</div>
						<div className="mt-8">
							<h3 className="text-lg font-bold mb-4">Delivery Status Timeline</h3>
							<div className="border-l-2 border-gray-300 pl-4 space-y-4">
								{selectedDelivery.timeline.map((event, index) => (
									<div key={index} className="flex items-start space-x-4">
										<div className="w-4 h-4 bg-blue-500 rounded-full mt-1"></div>
										<div>
											<p className="font-semibold text-gray-800">
												{event.location}
											</p>
											<p className="text-sm text-gray-600">{event.time}</p>
										</div>
									</div>
								))}
							</div>
						</div>

						<Button
							onClick={handleCloseDetails}
							className="mt-6 bg-red-700 text-white hover:bg-red-800"
						>
							Close
						</Button>
					</div>
				</Modal>
			)}
		</Card>
	);
};

export default AssignedDeliveries;

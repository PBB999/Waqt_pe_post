import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

const DeliveryMetrics = () => {
	const metrics = {
		totalDeliveries: 120,
		pendingDeliveries: 15,
		failedDeliveries: 5,
		onTimeDeliveryRate: 87.5,
		averageDeliveryTime: " 1 hour 19 minutes",
	};

	const failedDeliveriesData = [
		{ deliveryId: "D101", customer: "Priya Sharma", reason: "Customer Unavailable" },
		{ deliveryId: "D102", customer: "Ravi Mehta", reason: "Address Not Found" },
		{ deliveryId: "D103", customer: "Sita Verma", reason: "Incorrect Address" },
		{ deliveryId: "D104", customer: "Arun Patel", reason: "Customer Unreachable" },
		{ deliveryId: "D105", customer: "Neha Gupta", reason: "No Delivery Slot" },
		{ deliveryId: "D106", customer: "Swati Gupta", reason: "Wrong Delivery Slot" },
		{ deliveryId: "D107", customer: "Ajay Gupta", reason: "No Delivery Slot" },
	];

	const [showMore, setShowMore] = useState(false);

	const toggleShowMore = () => {
		setShowMore(!showMore);
	};

	return (
		<div className="p-6 bg-gray-100">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div>
					<Card className="p-4 bg-white rounded-lg shadow-md">
						<h2 className="text-sm font-semibold text-gray-700 mb-4">
							Delivery Performance Metrics
						</h2>
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
							<div className="bg-blue-50 p-3 rounded-lg shadow-sm text-center">
								<p className="text-xs font-semibold text-blue-700">
									Total Deliveries
								</p>
								<p className="text-lg font-bold text-blue-900">
									{metrics.totalDeliveries}
								</p>
							</div>
							<div className="bg-yellow-50 p-3 rounded-lg shadow-sm text-center">
								<p className="text-xs font-semibold text-yellow-700">
									Pending Deliveries
								</p>
								<p className="text-lg font-bold text-yellow-900">
									{metrics.pendingDeliveries}
								</p>
							</div>
							<div className="bg-red-50 p-3 rounded-lg shadow-sm text-center">
								<p className="text-xs font-semibold text-red-700">
									Failed Deliveries
								</p>
								<p className="text-lg font-bold text-red-900">
									{metrics.failedDeliveries}
								</p>
							</div>
							<div className="bg-green-50 p-3 rounded-lg shadow-sm text-center">
								<p className="text-xs font-semibold text-green-700">
									On-time Delivery Rate
								</p>
								<p className="text-lg font-bold text-green-900">
									{metrics.onTimeDeliveryRate}%
								</p>
							</div>
							<div className="bg-purple-50 p-3 rounded-lg shadow-sm text-center">
								<p className="text-xs font-semibold text-purple-700">
									Average Delivery Time
								</p>
								<p className="text-lg font-bold text-purple-900">
									{metrics.averageDeliveryTime}
								</p>
							</div>
						</div>
					</Card>
				</div>
				<div>
					<Card className="p-4 bg-white rounded-lg shadow-md">
						<h2 className="text-sm font-semibold text-gray-700 mb-4">
							Failed Deliveries Details
						</h2>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className="text-xs">Delivery ID</TableHead>
									<TableHead className="text-xs">Customer</TableHead>
									<TableHead className="text-xs">Reason</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{failedDeliveriesData
									.slice(0, showMore ? failedDeliveriesData.length : 5)
									.map((delivery, index) => (
										<TableRow key={index}>
											<TableCell className="text-sm">
												{delivery.deliveryId}
											</TableCell>
											<TableCell className="text-sm">
												{delivery.customer}
											</TableCell>
											<TableCell className="text-sm">
												{delivery.reason}
											</TableCell>
										</TableRow>
									))}
							</TableBody>
						</Table>
						<button
							onClick={toggleShowMore}
							className="mt-4 text-sm text-blue-500 font-medium hover:underline"
						>
							{showMore ? "See Less" : "See More"}
						</button>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default DeliveryMetrics;

import React, { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../components/ui/table";
import { Card } from "@/components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from "../components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { getParcelByPin } from "../redux/features/parcel/parcelActions";
import { useNavigate } from "react-router-dom";

const DeliveryTableWithFilters = () => {
	const navigate = useNavigate();
	const [filters, setFilters] = useState({
		status: "All",
		type: "All",
		timeWindow: "",
		region: "",
		hub: "",
	});
	const dispatch = useDispatch();
	const authState = useSelector((state) => state.auth);
	const parcelState = useSelector((state) => state.parcel);

	const [deliveries, setDeliveries] = useState([]);

	const filteredDeliveries = deliveries.filter((delivery) => {
		const { status, type, timeWindow, region, hub } = filters;
		return (
			(status === "All" || delivery.status === status) &&
			(type === "All" || delivery.type === type) &&
			(timeWindow ? delivery.timeWindow.includes(timeWindow) : true) &&
			(region ? delivery.pickupAddress.includes(region) : true) &&
			(hub ? delivery.deliveryAddress.includes(hub) : true)
		);
	});

	const handleFilterChange = (filterKey, value) => {
		setFilters({ ...filters, [filterKey]: value });
	};

	const getDeliveries = (pin) => {
		dispatch(getParcelByPin(pin));
	};

	useEffect(() => {
		if (!authState?.userInfo?.pinCode) return;
		console.log("Fetching deliveries for pin", authState.userInfo.pinCode);
		getDeliveries(authState.userInfo.pinCode);
	}, [authState]);
	console.log("authstate", authState);

	useEffect(() => {
		if (!parcelState.parcels) return;
		const parcels = parcelState.parcels;
		let formattedParcels = parcels.map((parcel) => ({
			id: parcel._id,
			sender: parcel.senderId.name,
			receiver: parcel.receiverId ? parcel.receiverId.name : "Unknown",
			pickupAddress: parcel.pickupAddress.city,
			deliveryAddress: parcel.deliveryAddress.city,
			status: parcel.status,
			type: parcel.deliveryType,
			timeWindow: `${new Date(parcel.timeSlot.startTime).getHours()} : ${new Date(
				parcel.timeSlot.startTime,
			).getMinutes()} - ${new Date(parcel.timeSlot.endTime).getHours()} : ${
				new Date(parcel.timeSlot.endTime).getMinutes() === 0
					? "00"
					: new Date(parcel.timeSlot.endTime).getMinutes()
			}`,
		}));
		console.log();
		setDeliveries(formattedParcels);
	}, [parcelState.parcels]);

	const handleAssignDeliveries = () => {
		navigate("/assign");
		console.log("Assign Deliveries action triggered");
	};

	return (
		<Card className="p-6 bg-white rounded-lg shadow-lg mb-5">
			<h1 className="text-2xl font-semibold text-gray-800 mb-6">Delivery Management</h1>
			<div className="flex flex-wrap gap-4 mb-6">
				<Select
					className="w-48"
					onValueChange={(value) => handleFilterChange("status", value)}
				>
					<SelectTrigger>
						<SelectValue placeholder="Filter by Status" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="All">All</SelectItem>
						<SelectItem value="Pending">Pending</SelectItem>
						<SelectItem value="In-Progress">In-Progress</SelectItem>
						<SelectItem value="Completed">Completed</SelectItem>
						<SelectItem value="Returned">Returned</SelectItem>
					</SelectContent>
				</Select>

				<Select
					className="w-48"
					onValueChange={(value) => handleFilterChange("type", value)}
				>
					<SelectTrigger>
						<SelectValue placeholder="Filter by Type" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="All">All</SelectItem>
						<SelectItem value="Pickup">Pickup</SelectItem>
						<SelectItem value="Delivery">Delivery</SelectItem>
					</SelectContent>
				</Select>

				<Input
					className="w-48"
					type="text"
					placeholder="Filter by Time Window"
					onChange={(e) => handleFilterChange("timeWindow", e.target.value)}
				/>

				<Input
					className="w-48"
					type="text"
					placeholder="Filter by Region"
					onChange={(e) => handleFilterChange("region", e.target.value)}
				/>

				<Input
					className="w-48"
					type="text"
					placeholder="Filter by Hub"
					onChange={(e) => handleFilterChange("hub", e.target.value)}
				/>

				<Button
					onClick={handleAssignDeliveries}
					className="bg-red-700 text-white hover:bg-red-800"
				>
					Assign Deliveries
				</Button>
			</div>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Delivery ID</TableHead>
						<TableHead>Sender</TableHead>
						<TableHead>Receiver</TableHead>
						<TableHead>Pickup Address</TableHead>
						<TableHead>Delivery Address</TableHead>
						<TableHead>Status</TableHead>
						<TableHead>Type</TableHead>
						<TableHead>Time Window</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{filteredDeliveries.map((delivery) => (
						<TableRow key={delivery.id}>
							<TableCell>{delivery.id}</TableCell>
							<TableCell>{delivery.sender}</TableCell>
							<TableCell>{delivery.receiver}</TableCell>
							<TableCell>{delivery.pickupAddress}</TableCell>
							<TableCell>{delivery.deliveryAddress}</TableCell>
							<TableCell>{delivery.status}</TableCell>
							<TableCell>{delivery.type}</TableCell>
							<TableCell>{delivery.timeWindow}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Card>
	);
};

export default DeliveryTableWithFilters;

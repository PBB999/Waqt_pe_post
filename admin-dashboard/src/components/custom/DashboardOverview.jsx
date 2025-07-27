import React from "react";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	PieChart,
	Pie,
	Cell,
	LineChart,
	Line,
	ResponsiveContainer,
} from "recharts";

const DashboardOverview = () => {
	const barData = [
		{ name: "Monday", Delivery: 30, Package: 20, "Customer Service": 10 },
		{ name: "Tuesday", Delivery: 25, Package: 15, "Customer Service": 5 },
		{ name: "Wednesday", Delivery: 35, Package: 30, "Customer Service": 20 },
		{ name: "Thursday", Delivery: 40, Package: 25, "Customer Service": 15 },
		{ name: "Friday", Delivery: 20, Package: 10, "Customer Service": 5 },
		{ name: "Saturday", Delivery: 10, Package: 5, "Customer Service": 2 },
		{ name: "Sunday", Delivery: 5, Package: 2, "Customer Service": 1 },
	];

	const pieData = [
		{ name: "Delivery Issues", value: 40 },
		{ name: "Package Issues", value: 30 },
		{ name: "Customer Service Issues", value: 30 },
	];

	const resolvedVsPending = [
		{ name: "Resolved", value: 70 },
		{ name: "Pending", value: 30 },
	];

	const lineData = [
		{ month: "Jan", complaints: 120 },
		{ month: "Feb", complaints: 100 },
		{ month: "Mar", complaints: 90 },
		{ month: "Apr", complaints: 110 },
		{ month: "May", complaints: 80 },
		{ month: "Jun", complaints: 70 },
		{ month: "Jul", complaints: 60 },
	];

	const pieColors = ["#82ca9d", "#8884d8", "#ff8042"];

	return (
		<div className="p-6 bg-gray-50">
			<h2 className="text-2xl font-semibold text-gray-700 mb-6">Dashboard Overview</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				<div className="bg-white p-4 rounded-lg shadow-md">
					<h3 className="text-lg font-semibold text-gray-700 mb-4">
						Daily Complaints by Category
					</h3>
					<ResponsiveContainer width="100%" height={250}>
						<BarChart data={barData}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="name" />
							<YAxis />
							<Tooltip />
							<Legend />
							<Bar dataKey="Delivery" fill="#82ca9d" />
							<Bar dataKey="Package" fill="#8884d8" />
							<Bar dataKey="Customer Service" fill="#ff8042" />
						</BarChart>
					</ResponsiveContainer>
				</div>
				<div className="bg-white p-4 rounded-lg shadow-md">
					<h3 className="text-lg font-semibold text-gray-700 mb-4">
						Complaints Distribution
					</h3>
					<ResponsiveContainer width="100%" height={250}>
						<PieChart>
							<Pie
								data={pieData}
								dataKey="value"
								nameKey="name"
								cx="50%"
								cy="50%"
								outerRadius={70}
								label
							>
								{pieData.map((entry, index) => (
									<Cell key={`cell-${index}`} fill={pieColors[index]} />
								))}
							</Pie>
							<Tooltip />
							<Legend />
						</PieChart>
					</ResponsiveContainer>
				</div>
				<div className="bg-white p-4 rounded-lg shadow-md">
					<h3 className="text-lg font-semibold text-gray-700 mb-4">
						Resolved vs Pending Complaints
					</h3>
					<ResponsiveContainer width="100%" height={250}>
						<PieChart>
							<Pie
								data={resolvedVsPending}
								dataKey="value"
								nameKey="name"
								cx="50%"
								cy="50%"
								outerRadius={80}
								label
							>
								<Cell fill="#82ca9d" />
								<Cell fill="#ff8042" />
							</Pie>
							<Tooltip />
							<Legend />
						</PieChart>
					</ResponsiveContainer>
				</div>
				<div className="col-span-1 sm:col-span-2 bg-white p-4 rounded-lg shadow-md">
					<h3 className="text-lg font-semibold text-gray-700 mb-4">
						Monthly Complaint Trends
					</h3>
					<ResponsiveContainer width="100%" height={250}>
						<LineChart data={lineData}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="month" />
							<YAxis />
							<Tooltip />
							<Legend />
							<Line
								type="monotone"
								dataKey="complaints"
								stroke="#8884d8"
								strokeWidth={2}
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>
			</div>
		</div>
	);
};

export default DashboardOverview;

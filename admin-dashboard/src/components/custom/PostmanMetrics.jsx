import React from "react";
import {
	Bar,
	BarChart,
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import * as XLSX from "xlsx";
import { Button } from "../ui/button";

const PostmanMetrics = () => {
	const postmanData = [
		{ name: "Vijay Patil", deliveries: 150, complaints: 5, idleTime: "1h 30m" },
		{ name: "Pankaj Singh", deliveries: 130, complaints: 2, idleTime: "2h 15m" },
		{ name: "Rohan Das", deliveries: 140, complaints: 3, idleTime: "1h 45m" },
	];

	const dailyProductivity = [
		{ day: "Mon", productivity: 40 },
		{ day: "Tue", productivity: 35 },
		{ day: "Wed", productivity: 45 },
		{ day: "Thu", productivity: 50 },
		{ day: "Fri", productivity: 30 },
		{ day: "Sat", productivity: 60 },
		{ day: "Sun", productivity: 55 },
	];

	const exportExcel = () => {
		const ws = XLSX.utils.json_to_sheet(postmanData);
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, "Postman Performance");
		XLSX.writeFile(wb, "Postman_Performance_Report.xlsx");
	};

	return (
		<div className="p-6 bg-gray-100">
			<h2 className="text-2xl font-semibold text-gray-700 mb-6">Postman Performance</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div>
					<div className="p-4 bg-white rounded-lg shadow-md">
						<h3 className="text-xl font-semibold text-gray-700 mb-4">
							Leaderboard View
						</h3>
						<ResponsiveContainer width="100%" height={250}>
							<BarChart data={postmanData}>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="name" />
								<YAxis />
								<Tooltip />
								<Legend />
								<Bar dataKey="deliveries" fill="#8884d8" barSize={20} />
							</BarChart>
						</ResponsiveContainer>
					</div>
				</div>
				<div>
					<div className="p-4 bg-white rounded-lg shadow-md">
						<h3 className="text-xl font-semibold text-gray-700 mb-4">
							Daily Productivity Trends
						</h3>
						<ResponsiveContainer width="100%" height={250}>
							<LineChart data={dailyProductivity}>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="day" />
								<YAxis />
								<Tooltip />
								<Legend />
								<Line type="monotone" dataKey="productivity" stroke="#82ca9d" />
							</LineChart>
						</ResponsiveContainer>
					</div>
				</div>
			</div>
			<div className="mt-6">
				<Button
					onClick={exportExcel}
					className="bg-red-800 text-white py-2 px-4 rounded-lg shadow hover:bg-red-700 transition"
				>
					Export to Excel
				</Button>
			</div>
		</div>
	);
};

export default PostmanMetrics;

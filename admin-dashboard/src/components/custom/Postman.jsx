import {
	BarElement,
	CategoryScale,
	Chart as ChartJS,
	Legend,
	Title,
	Tooltip
} from "chart.js";
import React from "react";
import { Bar } from "react-chartjs-2";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const postman = {
	name: "Ram Mohan",
	email: "ram.mohan@example.com",
	phone: "8452137894",
	address: "1234 Ahmednagar, MAharashtra, India",
	status: "Active",
	joiningDate: "2021-06-01",
	beatID: "B12345",
};

const monthlyData = {
	labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
	datasets: [
		{
			label: "Returned",
			data: [5, 4, 3, 6, 7, 4, 3, 8, 6, 5, 4, 7],
			backgroundColor: "rgba(255, 99, 132, 0.6)",
		},
		{
			label: "Rescheduled",
			data: [8, 7, 6, 5, 9, 8, 7, 6, 5, 8, 6, 7],
			backgroundColor: "rgba(255, 159, 64, 0.6)",
		},
		{
			label: "Delivered",
			data: [20, 22, 18, 25, 30, 28, 24, 20, 22, 30, 27, 26],
			backgroundColor: "rgba(75, 192, 192, 0.6)",
		},
	],
};

const articleCounts = {
	returned: 50,
	rescheduled: 40,
	delivered: 250,
};

const Postman = ({ postman }) => {
	return (
		<div className="space-y-6">
			<div className="flex space-x-6">
				<div className="w-full lg:w-1/2">
					<div className="bg-white shadow-lg rounded-lg p-6">
						<div className="flex items-center justify-center mb-4">
							<div className="w-23 h-23 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center border-4 border-white p-3 m-1">
								<FaUserAlt className="text-white text-5xl" />
							</div>
						</div>
						<h2 className="text-2xl font-semibold text-center text-gray-900 flex items-center justify-center">
							{postman.name}
							{postman.status === "Active" ? (
								<AiOutlineCheckCircle className="ml-2 text-green-500 text-2xl" />
							) : (
								<AiOutlineCloseCircle className="ml-2 text-red-500 text-2xl" />
							)}
						</h2>
						<p className="text-center text-gray-600">{postman.email}</p>
						<div className="mt-6">
							<ul className="space-y-2 text-gray-700">
								<li>
									<strong className="font-medium">Phone:</strong> {postman.phone}
								</li>
								<li>
									<strong className="font-medium">Address:</strong>{" "}
									{postman.address}
								</li>
								<li>
									<strong className="font-medium">Joining Date:</strong>{" "}
									{postman.joiningDate}
								</li>
								<li>
									<strong className="font-medium">Beat ID:</strong>{" "}
									{postman.beatID}
								</li>{" "}
							</ul>
						</div>
					</div>
				</div>
				<div className="w-full lg:w-1/2">
					<div className="bg-white shadow-lg rounded-lg p-6">
						<h3 className="text-lg font-semibold text-gray-800 mb-4">
							Articles Delivery Overview
						</h3>
						<Bar
							data={monthlyData}
							options={{
								responsive: true,
								plugins: {
									title: {
										display: true,
										text: "Articles Delivery Overview by Month",
									},
									legend: {
										position: "top",
									},
								},
								scales: {
									x: {
										beginAtZero: true,
									},
									y: {
										beginAtZero: true,
										max: 35,
									},
								},
							}}
						/>
					</div>
				</div>
			</div>
			<div className="bg-white shadow-lg rounded-lg p-6">
				<h3 className="text-lg font-semibold text-gray-800 mb-4">Articles Summary</h3>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					<div className="bg-blue-100 p-4 rounded-lg shadow-md">
						<h4 className="font-semibold text-blue-700">Articles Returned</h4>
						<p className="text-xl font-bold text-blue-600">{articleCounts.returned}</p>
					</div>
					<div className="bg-purple-100 p-4 rounded-lg shadow-md">
						<h4 className="font-semibold text-purple-700">Articles Rescheduled</h4>
						<p className="text-xl font-bold text-purple-600">
							{articleCounts.rescheduled}
						</p>
					</div>
					<div className="bg-green-100 p-4 rounded-lg shadow-md">
						<h4 className="font-semibold text-green-700">Articles Delivered</h4>
						<p className="text-xl font-bold text-green-600">
							{articleCounts.delivered}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Postman;

import React, { useState } from "react";
import { Card } from "../ui/card";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";

const fetchReportData = async (period, region, postman) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			const data = [
				{
					id: 1,
					deliveryId: "D101",
					customer: "Priya Sharma",
					region: "North",
					postman: "John Doe",
					status: "Delivered",
				},
				{
					id: 2,
					deliveryId: "D102",
					customer: "Ravi Mehta",
					region: "South",
					postman: "Jane Smith",
					status: "Failed",
				},
				{
					id: 3,
					deliveryId: "D103",
					customer: "Anita Reddy",
					region: "East",
					postman: "Ravi Kumar",
					status: "Delivered",
				},
				{
					id: 4,
					deliveryId: "D104",
					customer: "Arjun Nair",
					region: "West",
					postman: "Priya Patel",
					status: "In Transit",
				},
			];
			const filteredData = data.filter(
				(item) =>
					(region ? item.region === region : true) &&
					(postman ? item.postman === postman : true) &&
					(period ? period === "all" || period === "lastMonth" : true),
			);
			resolve(filteredData);
		}, 1000);
	});
};

const CustomReports = () => {
	const [period, setPeriod] = useState("");
	const [region, setRegion] = useState("");
	const [postman, setPostman] = useState("");
	const [reportData, setReportData] = useState([]);
	const [loading, setLoading] = useState(false);

	const periods = ["All Time", "Last Week", "Last Month", "Last Quarter", "Last Year"];
	const regions = ["North", "South", "East", "West"];
	const postmen = ["John Doe", "Jane Smith", "Ravi Kumar", "Priya Patel"];

	const handleGenerateReport = async (format) => {
		setLoading(true);
		const data = await fetchReportData(period, region, postman);
		setReportData(data);
		setLoading(false);

		if (format === "PDF") {
			generatePDFReport(data);
		} else if (format === "Excel") {
			generateExcelReport(data);
		}
	};

	const generatePDFReport = (data) => {
		const doc = new jsPDF();
		doc.text("Custom Report", 20, 10);
		let yPosition = 20;

		data.forEach((item) => {
			doc.text(
				`Delivery ID: ${item.deliveryId} | Customer: ${item.customer} | Region: ${item.region} | Postman: ${item.postman} | Status: ${item.status}`,
				20,
				yPosition,
			);
			yPosition += 10;
		});

		doc.save("report.pdf");
	};

	const generateExcelReport = (data) => {
		const ws = XLSX.utils.json_to_sheet(data);
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, "Report");
		XLSX.writeFile(wb, "report.xlsx");
	};

	return (
		<div className="p-3 bg-white rounded-lg shadow-sm mt-6">
			<h3 className="text-xs font-semibold text-gray-700 mb-3">Custom Reports</h3>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Select Period
					</label>
					<select
						value={period}
						onChange={(e) => setPeriod(e.target.value)}
						className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
					>
						<option value="">Select Period</option>
						{periods.map((p, index) => (
							<option key={index} value={p.toLowerCase().replace(" ", "")}>
								{p}
							</option>
						))}
					</select>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Select Region
					</label>
					<select
						value={region}
						onChange={(e) => setRegion(e.target.value)}
						className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
					>
						<option value="">Select Region</option>
						{regions.map((r, index) => (
							<option key={index} value={r}>
								{r}
							</option>
						))}
					</select>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Select Postman
					</label>
					<select
						value={postman}
						onChange={(e) => setPostman(e.target.value)}
						className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
					>
						<option value="">Select Postman</option>
						{postmen.map((p, index) => (
							<option key={index} value={p}>
								{p}
							</option>
						))}
					</select>
				</div>
			</div>
			{loading && <div>Loading report...</div>}
			{!loading && reportData.length > 0 && (
				<Card className="mb-6">
					<h4 className="text-sm font-semibold text-gray-700 mb-3">Generated Report</h4>
					<table className="min-w-full table-auto">
						<thead>
							<tr>
								<th className="px-4 py-2 text-left">Delivery ID</th>
								<th className="px-4 py-2 text-left">Customer</th>
								<th className="px-4 py-2 text-left">Region</th>
								<th className="px-4 py-2 text-left">Postman</th>
								<th className="px-4 py-2 text-left">Status</th>
							</tr>
						</thead>
						<tbody>
							{reportData.map((item) => (
								<tr key={item.id}>
									<td className="px-4 py-2">{item.deliveryId}</td>
									<td className="px-4 py-2">{item.customer}</td>
									<td className="px-4 py-2">{item.region}</td>
									<td className="px-4 py-2">{item.postman}</td>
									<td className="px-4 py-2">{item.status}</td>
								</tr>
							))}
						</tbody>
					</table>
				</Card>
			)}
			<div className="flex justify-end gap-4">
				<button
					onClick={() => handleGenerateReport("PDF")}
					className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600"
				>
					Generate PDF Report
				</button>
				<button
					onClick={() => handleGenerateReport("Excel")}
					className="px-4 py-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600"
				>
					Generate Excel Report
				</button>
			</div>
		</div>
	);
};

export default CustomReports;

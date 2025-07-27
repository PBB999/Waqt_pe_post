import React, { useState, useEffect } from "react";
import axios from "axios";
import ComplaintsTable from "../components/custom/ComplaintsTable";
import ComplaintDetailsModal from "../components/custom/ComplaintDetailsModal";
import FilterBar from "../components/custom/FilterBar";

const ManageComplaints = () => {
	const [complaints, setComplaints] = useState([]);
	const [selectedComplaint, setSelectedComplaint] = useState(null);
	const [filter, setFilter] = useState("All");

	useEffect(() => {
		const fetchComplaints = async () => {
			try {
				const response = await axios.get(
					"http://localhost:5000/api/complaint/getComplaint",
				);
				setComplaints(response.data);
			} catch (error) {
				console.error("Error fetching complaints:", error);
			}
		};

		fetchComplaints();
	}, []);

	const updateComplaint = async (id, updatedData) => {
		try {
			const response = await axios.put(
				`http://localhost:5000/api/complaint/complaints/${id}`,
				updatedData,
			);
			const updatedComplaint = response.data;
			setComplaints((prevComplaints) =>
				prevComplaints.map((complaint) =>
					complaint._id === id ? updatedComplaint : complaint,
				),
			);
		} catch (error) {
			console.error("Error updating complaint:", error);
		}
	};

	const filteredComplaints = complaints.filter(
		(complaint) => filter === "All" || complaint.status === filter,
	);

	return (
		<div className="p-6 bg-gray-50 min-h-screen">
			<h1 className="text-3xl font-semibold mb-6 text-black">Manage Complaints</h1>
			<FilterBar filter={filter} setFilter={setFilter} />
			<ComplaintsTable
				complaints={filteredComplaints}
				onViewComplaint={(complaint) => setSelectedComplaint(complaint)}
			/>
			{selectedComplaint && (
				<ComplaintDetailsModal
					complaint={selectedComplaint}
					onClose={() => setSelectedComplaint(null)}
					onUpdate={(reply) => {
						updateComplaint(selectedComplaint._id, { status: "Resolved", reply });
						setSelectedComplaint(null);
					}}
				/>
			)}
		</div>
	);
};

export default ManageComplaints;

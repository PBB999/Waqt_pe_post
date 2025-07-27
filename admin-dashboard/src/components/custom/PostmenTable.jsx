import React, { useEffect, useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addPostman, fetchAllPostmen } from "../../redux/features/postman/postmanSlice";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

import AddNewPostmanForm from "./AddNewPostmanForm";

const PostmenTableWithAdd = () => {
	const [search, setSearch] = useState("");
	const [showForm, setShowForm] = useState(false);
	const dispatch = useDispatch();
	const postmen = useSelector((state) => state.postman.postmen);

	const navigate = useNavigate();

	useEffect(() => {
		dispatch(fetchAllPostmen());
	}, [dispatch]);

	const lastPostmanId =
		postmen.length > 0
			? Math.max(...postmen.map((postman) => parseInt(postman.postmanId, 10)))
			: 0;

	const nextPostmanId = lastPostmanId + 1;

	const handleFormSubmit = (newPostman) => {
		dispatch(addPostman(newPostman));
		setShowForm(false);
	};

	const handleViewDetails = (postmanId) => {
		navigate(`/postman-management/${postmanId}`);
	};

	const filteredPostmen = postmen.filter((postman) =>
		postman.name.toLowerCase().includes(search.toLowerCase()),
	);

	return (
		<Card className="p-6 bg-white rounded-lg shadow-lg">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-semibold text-gray-800">Postmen Management</h1>
				<Button
					onClick={() => setShowForm(true)}
					className="bg-green-700 text-white hover:bg-green-800 flex items-center space-x-2"
				>
					<FaUserPlus />
					<span>Add New Postman</span>
				</Button>
			</div>

			{showForm ? (
				<AddNewPostmanForm onSubmit={handleFormSubmit} nextPostmanId={nextPostmanId} />
			) : (
				<>
					<div className="mb-6">
						<Input
							type="text"
							placeholder="Search Postmen"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className="w-full"
						/>
					</div>

					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Postman ID</TableHead>
								<TableHead>Name</TableHead>
								<TableHead>Mobile No.</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Action</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filteredPostmen.map((postman) => (
								<TableRow key={postman.id}>
									<TableCell>{postman.postmanId}</TableCell>
									<TableCell>{postman.name}</TableCell>
									<TableCell>{postman.phone}</TableCell>
									<TableCell>{postman.status}</TableCell>
									<TableCell>
										<Button
											onClick={() => handleViewDetails(postman.postmanId)}
											className="bg-red-800 text-white hover:bg-red-700"
										>
											View Details
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</>
			)}
		</Card>
	);
};

export default PostmenTableWithAdd;

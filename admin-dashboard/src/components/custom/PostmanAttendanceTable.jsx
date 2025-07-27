import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addAttendance } from "../../redux/features/attendance/attendanceSlice";
import { fetchAllPostmen } from "../../redux/features/postman/postmanSlice";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

const PostmanAttendanceTable = () => {
	const [search, setSearch] = useState("");
	const [attendance, setAttendance] = useState({});
	const dispatch = useDispatch();
	const postmen = useSelector((state) => state.postman.postmen);

	useEffect(() => {
		dispatch(fetchAllPostmen());
	}, [dispatch]);

	useEffect(() => {
		const defaultAttendance = postmen.reduce((acc, postman) => {
			acc[postman.postmanId] = true;
			return acc;
		}, {});
		setAttendance(defaultAttendance);
	}, [postmen]);

	const handleAttendanceChange = (postmanId, isPresent) => {
		setAttendance((prev) => ({
			...prev,
			[postmanId]: isPresent,
		}));
	};

	const handleSubmitAttendance = () => {
		const attendanceData = postmen.map((postman) => ({
			postmanId: postman.postmanId,
			date: new Date().toISOString(),
			present: attendance[postman.postmanId],
		}));
		attendanceData.forEach((data) => dispatch(addAttendance(data)));
	};

	const filteredPostmen = postmen.filter((postman) =>
		postman.name.toLowerCase().includes(search.toLowerCase()),
	);

	return (
		<Card className="p-6 bg-white rounded-lg shadow-lg">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-semibold text-gray-800">Postman Attendance</h1>
				<div className="flex items-center gap-2">
					<Input
						type="text"
						placeholder="Search Postmen"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="border rounded-lg px-3 py-2"
					/>
					<FaSearch className="text-gray-500" />
				</div>
			</div>

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Postman ID</TableHead>
						<TableHead>Name</TableHead>
						<TableHead>Mobile No.</TableHead>
						<TableHead>Status</TableHead>
						<TableHead>Attendance</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{filteredPostmen.map((postman) => (
						<TableRow key={postman.postmanId}>
							<TableCell>{postman.postmanId}</TableCell>
							<TableCell>{postman.name}</TableCell>
							<TableCell>{postman.phone}</TableCell>
							<TableCell>{postman.status}</TableCell>
							<TableCell>
								<select
									value={attendance[postman.postmanId]?.toString() || "true"}
									onChange={(e) =>
										handleAttendanceChange(
											postman.postmanId,
											e.target.value === "true",
										)
									}
									className="border rounded-lg px-2 py-1"
								>
									<option value="true">Present</option>
									<option value="false">Absent</option>
								</select>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>

			<div className="mt-6 flex justify-end">
				<Button
					onClick={handleSubmitAttendance}
					className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
				>
					Submit Attendance
				</Button>
			</div>
		</Card>
	);
};

export default PostmanAttendanceTable;

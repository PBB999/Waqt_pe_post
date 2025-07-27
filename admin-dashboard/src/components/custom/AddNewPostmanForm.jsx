import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPostman } from "../../redux/features/postman/postmanSlice";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FaUserPlus } from "react-icons/fa";

const AddNewPostmanForm = () => {
	const dispatch = useDispatch();
	const postmen = useSelector((state) => state.postman.postmen);
	const authState = useSelector((state) => state.auth);

	const [postman, setPostman] = useState({
		postmanId: "",
		name: "",
		phone: "",
		password: "",
		status: "Active",
	});

	const [pincode, setPincode] = useState("");

	useEffect(() => {
		console.log("authstate", authState);
	}, [authState]);

	const fetchPincode = async () => {
		const userToken = localStorage.getItem("userToken");

		if (userToken) {
			try {
				const storedPincode = localStorage.getItem("pinCode");
				if (storedPincode) {
					setPincode(storedPincode);
				} else {
					setPincode("123456");
					localStorage.setItem("pinCode", "123456");
				}
			} catch (error) {
				console.error("Error fetching pincode:", error);
			}
		}
	};

	useEffect(() => {
		const nextId = postmen.length > 0 ? postmen.length + 1 : 1;
		setPostman((prev) => ({ ...prev, postmanId: `PM00${nextId}` }));
		fetchPincode();
	}, [postmen]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setPostman((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(addPostman({ ...postman, pincode }));
		setPostman({
			postmanId: "",
			name: "",
			phone: "",
			password: "",
			status: "Active",
		});
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6 p-4 bg-white rounded-lg">
			<h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center space-x-2">
				<FaUserPlus />
				<span>Add New Postman</span>
			</h2>

			<Input
				name="postmanId"
				placeholder="Postman ID"
				value={postman.postmanId}
				readOnly
				className="w-full bg-gray-200 cursor-not-allowed"
			/>
			<Input
				name="name"
				placeholder="Full Name"
				value={postman.name}
				onChange={handleChange}
				required
				className="w-full"
			/>
			<Input
				name="phone"
				placeholder="Phone Number"
				value={postman.phone}
				onChange={handleChange}
				required
				className="w-full"
			/>
			<Input
				name="password"
				type="password"
				placeholder="Password"
				value={postman.password}
				onChange={handleChange}
				required
				className="w-full"
			/>
			<Input
				name="pincode"
				placeholder="Pincode"
				value={pincode}
				readOnly
				className="w-full bg-gray-200 cursor-not-allowed"
			/>
			<div className="flex items-center space-x-4">
				<label className="text-gray-600">Status:</label>
				<select
					name="status"
					value={postman.status}
					onChange={handleChange}
					className="p-2 border border-gray-300 rounded-lg"
				>
					<option value="Active">Active</option>
					<option value="On Duty">On Duty</option>
					<option value="Inactive">Inactive</option>
				</select>
			</div>

			<Button
				type="submit"
				className="bg-red-800 text-white hover:bg-red-700 mt-4 w-full py-2"
			>
				Add Postman
			</Button>
		</form>
	);
};

export default AddNewPostmanForm;

import React from "react";
import Postman from "../components/custom/Postman";

const PostmanDetails = () => {
	const postman = {
		name: "Ram Mohan",
		email: "ram.mohan@example.com",
		phone: "8452137894",
		address: "1234 Ahmednagar, MAharashtra, India",
		status: "Active",
		joiningDate: "2021-06-01",
		beatID: "B12345",
	};

	return (
		<div className="p-6">
			<h1 className="text-2xl font-semibold mb-8">Postman Details</h1>
			<Postman postman={postman} />
		</div>
	);
};

export default PostmanDetails;

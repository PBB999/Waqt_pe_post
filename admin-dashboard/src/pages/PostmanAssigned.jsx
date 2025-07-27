import { Card } from "@/components/ui/card";
import React from "react";
import AssignedList from "../components/custom/AssignedList";
const PostAssigned = () => {
	return (
		<Card className="p-6 bg-gray-50 min-h-screen">
			<AssignedList />
		</Card>
	);
};

export default PostAssigned;

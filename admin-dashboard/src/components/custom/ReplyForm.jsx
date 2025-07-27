import React, { useState } from "react";

const ReplyForm = ({ complaintId }) => {
	const [reply, setReply] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleReply = async () => {
		if (!reply.trim()) {
			alert("Reply cannot be empty.");
			return;
		}

		setIsSubmitting(true);

		try {
			const response = await fetch(
				`http://localhost:5000/api/complaint/update/${complaintId}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						status: "Replied",
						reply: reply,
					}),
				},
			);

			if (response.ok) {
				const updatedComplaint = await response.json();
				console.log("Updated complaint:", updatedComplaint);
				setReply("");
				alert("Reply sent successfully!");
			} else {
				const errorData = await response.json();
				alert(`Failed to send reply: ${errorData.message}`);
			}
		} catch (error) {
			console.error("Error sending reply:", error);
			alert("An error occurred while sending the reply.");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="mt-4">
			<textarea
				value={reply}
				onChange={(e) => setReply(e.target.value)}
				placeholder="Write your reply here..."
				className="w-full p-2 border rounded"
				disabled={isSubmitting}
			/>
			<button
				className={`mt-2 px-4 py-2 text-white rounded ${
					isSubmitting ? "bg-gray-500" : "bg-green-500"
				}`}
				onClick={handleReply}
				disabled={isSubmitting}
			>
				{isSubmitting ? "Sending..." : "Send Reply"}
			</button>
		</div>
	);
};

export default ReplyForm;

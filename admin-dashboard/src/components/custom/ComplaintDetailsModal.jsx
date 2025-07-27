import React from "react";
import ReplyForm from "./ReplyForm";

const ComplaintDetailsModal = ({ complaint, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-2/3 max-w-3xl">
        <h2 className="text-2xl font-semibold mb-4 text-red-800">Complaint Details</h2>
        <p className="mb-2">
          <strong>ID:</strong> {complaint._id}
        </p>
        <p className="mb-2">
          <strong>User:</strong> {complaint.username}
        </p>
        <p className="mb-2">
          <strong>Date:</strong> {complaint.createdAt}
        </p>
        <p className="mb-4">
          <strong>Description:</strong> {complaint.description}
        </p>
        <ReplyForm complaintId={complaint._id} />
        <button
          className="mt-6 px-4 py-2 bg-red-800 text-white rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ComplaintDetailsModal;

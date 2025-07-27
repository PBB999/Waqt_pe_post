import React from "react";

const ComplaintsTable = ({ complaints, onViewComplaint }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-md">
      <table className="min-w-full bg-white border-collapse">
        <thead>
          <tr>
            <th className="py-3 px-4 bg-red-800 text-white">ID</th>
            <th className="py-3 px-4 bg-red-800 text-white">User</th>
            <th className="py-3 px-4 bg-red-800 text-white">Date</th>
            <th className="py-3 px-4 bg-red-800 text-white">Status</th>
            <th className="py-3 px-4 bg-red-800 text-white">Action</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((complaint, index) => (
            <tr
              key={complaint._id}
              className={`${
                index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
              } hover:bg-gray-200`}
            >
              <td className="py-3 px-4 border">{complaint._id}</td>
              <td className="py-3 px-4 border">{complaint.username}</td>
              <td className="py-3 px-4 border">
                {new Date(complaint.createdAt).toLocaleDateString()}
              </td>
              <td className="py-3 px-4 border">
                <span
                  className={`px-2 py-1 rounded ${
                    complaint.status === "pending"
                      ? "bg-yellow-200 text-yellow-800"
                      : complaint.status === "Resolved"
                      ? "bg-green-200 text-green-800"
                      : "bg-blue-200 text-blue-800"
                  }`}
                >
                  {complaint.status}
                </span>
              </td>
              <td className="py-3 px-4 border">
                <button
                  className="text-red-800 font-medium hover:underline"
                  onClick={() => onViewComplaint(complaint)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComplaintsTable;

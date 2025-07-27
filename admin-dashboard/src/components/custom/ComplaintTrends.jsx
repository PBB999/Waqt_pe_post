import React from "react";

const ComplaintTrends = () => {
  return (
    <div className="bg-white shadow rounded p-5">
      <h3 className="text-lg font-bold mb-4">Complaint Trends</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <h4 className="text-2xl text-green-500 font-bold">120</h4>
          <p className="text-gray-500">Resolved</p>
        </div>
        <div className="text-center">
          <h4 className="text-2xl text-red-500 font-bold">45</h4>
          <p className="text-gray-500">Unresolved</p>
        </div>
      </div>
    </div>
  );
};

export default ComplaintTrends;

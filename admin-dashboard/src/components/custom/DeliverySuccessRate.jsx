import React from "react";

const DeliverySuccessRate = () => {
  return (
    <div className="bg-white shadow rounded p-5">
      <h3 className="text-lg font-bold mb-4">Delivery Success Rate</h3>
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-2xl font-bold text-blue-500">92%</h4>
          <p className="text-gray-500">Success Rate</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Last 7 Days</p>
          <p className="text-sm text-gray-500"> <span className="text-green-400 font-bold">+3% </span>improvement</p>
        </div>
      </div>
    </div>
  );
};

export default DeliverySuccessRate;

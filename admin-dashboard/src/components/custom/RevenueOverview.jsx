import React from "react";

const RevenueOverview = () => {
	return (
		<div className=" ml-3 bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg rounded-lg p-6 text-white w-full">
			<h3 className="text-2xl font-bold mb-6">Revenue Overview</h3>
			<div className="flex justify-between items-center">
				<div className="text-center">
					<h4 className="text-4xl font-extrabold">₹ 21,250</h4>
					<p className="text-lg font-medium mt-2">Daily</p>
				</div>
				<div className="text-center">
					<h4 className="text-4xl font-extrabold">₹ 28,750</h4>
					<p className="text-lg font-medium mt-2">Weekly</p>
				</div>
				<div className="text-center">
					<h4 className="text-4xl font-extrabold">₹ 237,500</h4>
					<p className="text-lg font-medium mt-2">Monthly</p>
				</div>
			</div>
		</div>
	);
};

export default RevenueOverview;

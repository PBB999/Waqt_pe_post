import React from "react";

const PostOfficeCoverage = () => {
	return (
		<div className="l-3 bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg rounded-lg p-6 text-white mr-3">
			<h3 className="text-2xl font-bold mb-6">Post Office Coverage Overview</h3>
			<div className="flex justify-between items-center">
				<div className="text-center">
					<h4 className="text-4xl font-extrabold">1,55,000+</h4>
					<p className="text-lg font-medium mt-2">Total Offices</p>
				</div>
				<div className="text-center">
					<h4 className="text-4xl font-extrabold">25,000</h4>
					<p className="text-lg font-medium mt-2">Urban Offices</p>
				</div>
				<div className="text-center">
					<h4 className="text-4xl font-extrabold">1,30,000+</h4>
					<p className="text-lg font-medium mt-2">Rural Offices</p>
				</div>
			</div>
			<div className="mt-6 text-center">
				<p className="text-lg font-light">
					Covering over 90% of India's population across diverse regions.
				</p>
			</div>
		</div>
	);
};

export default PostOfficeCoverage;

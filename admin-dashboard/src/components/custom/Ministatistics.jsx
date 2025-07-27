import React from "react";

export default function MiniStatistic(props) {
	const { startContent, endContent, name, growth, value, growthColor } = props;

	return (
		<div className="bg-white  p-3 lg:p-6 rounded-xl shadow-md lg:shadow-md  w-full mx-auto border">
			<div className="lg:flex items-center justify-between">
				{startContent && <div className="mr-4">{startContent}</div>}
				<div className="flex-grow">
					<p className="text-sm font-medium text-gray-600 ">{name}</p>
					<p className="text-lg lg:text-3xl font-bold text-gray-900 ">{value}</p>
					{growth && (
						<div className="flex items-center mt-1">
							<p className={`text-sm font-bold ${growthColor} mr-2`}>{growth}</p>
							<p className="text-xs text-gray-600 font-normal">since last month</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

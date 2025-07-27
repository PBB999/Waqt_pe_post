import React from "react";
import { Link } from "react-router-dom";

const Notification = ({ isVisible, notifications = [] }) => {
	return (
		<div
			className={`absolute top-25 right-5 w-80 bg-white shadow-md rounded-md p-3 border ${
				isVisible ? "block" : "hidden"
			}`}
		>
			<h4 className="font-bold mb-3 text-lg">Notifications</h4>
			{notifications.length === 0 ? (
				<p>No new notifications</p>
			) : (
				<ul className="space-y-3">
					{notifications.map((notification, index) => {
						const borderColor =
							notification.type === "red"
								? "border-red-500"
								: notification.type === "yellow"
								? "border-yellow-500"
								: "border-green-500";
						const textColor =
							notification.type === "red"
								? "text-red-600"
								: notification.type === "yellow"
								? "text-yellow-600"
								: "text-green-600";
						const backgroundColor =
							notification.type === "red"
								? "bg-red-50"
								: notification.type === "yellow"
								? "bg-yellow-50"
								: "bg-green-50";

						return (
							<li
								key={index}
								className={`p-3 ${backgroundColor} border-l-4 ${borderColor} rounded-md`}
							>
								<p className={`font-semibold ${textColor}`}>{notification.title}</p>
								<p className="text-xs text-gray-600">{notification.message}</p>
							</li>
						);
					})}
				</ul>
			)}
			<div className="mt-3 text-right">
				<Link
					to="/notifications"
					className="text-sm font-medium text-blue-600 hover:underline"
				>
					See More
				</Link>
			</div>
		</div>
	);
};

export default Notification;

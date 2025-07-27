import React from "react";
import { Card } from "@/components/ui/card";

const FinancialInsights = () => {
	const financialMetrics = {
		revenuePerDelivery: 5000,
		deliveryCosts: 20000,
		unpaidDeliveries: 15,
	};

	return (
		<div className="p-3 bg-white rounded-lg shadow-sm mt-6">
			<h3 className="text-xs font-semibold text-gray-700 mb-3">Financial Insights</h3>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
				<Card className="p-3 bg-blue-50 rounded-lg shadow-sm">
					<p className="text-xs font-semibold text-blue-700">Revenue per Delivery</p>
					<p className="text-lg font-bold text-blue-900">
						Rs{financialMetrics.revenuePerDelivery}
					</p>
				</Card>
				<Card className="p-3 bg-yellow-50 rounded-lg shadow-sm">
					<p className="text-xs font-semibold text-yellow-700">Delivery Costs</p>
					<p className="text-lg font-bold text-yellow-900">
						Rs{financialMetrics.deliveryCosts}
					</p>
				</Card>
				<Card className="p-3 bg-red-50 rounded-lg shadow-sm">
					<p className="text-xs font-semibold text-red-700">Unpaid Deliveries</p>
					<p className="text-lg font-bold text-red-900">
						{financialMetrics.unpaidDeliveries}
					</p>
				</Card>
			</div>
		</div>
	);
};

export default FinancialInsights;

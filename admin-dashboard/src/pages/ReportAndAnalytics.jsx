import React from "react";
import DeliveryMetrics from "../components/custom/DeliveryMetrics";
import PostmanMetrics from "../components/custom/PostmanMetrics";
import QRcode from "../components/custom/QRcode";
import FinancialInsights from "../components/custom/FinancialInsights";
import CustomReports from "../components/custom/CustomReports";
import { Card } from "../components/ui/card";

const ReportAndAnalytics = () => {
	return (
		<Card className="p-6 bg-white min-h-screen">
			<h1 className="text-3xl font-semibold text-gray-800 mb-6">Reports and Analytics</h1>
			<DeliveryMetrics />
			<PostmanMetrics />
			<QRcode />
			<FinancialInsights />
			<CustomReports />
		</Card>
	);
};

export default ReportAndAnalytics;

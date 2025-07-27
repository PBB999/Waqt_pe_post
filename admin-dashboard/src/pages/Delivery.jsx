import React from "react";
import DeliveryTable from "../components/custom/DeliveryTable";
import DeliveryActionButtons from "../components/custom/DeliveryActionButtons";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DeliveryDensityHeatmap from "./DeliveryDensityHeatmap";

const DeliveryManagement = () => {
	return (
		<Card className="p-6 bg-gray-50 min-h-screen">
			<DeliveryActionButtons />
			<DeliveryTable />
			<DeliveryDensityHeatmap />
		</Card>
	);
};

export default DeliveryManagement;

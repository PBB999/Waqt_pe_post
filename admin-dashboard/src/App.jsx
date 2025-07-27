import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Delivery from "./pages/Delivery";
import Layout from "./Layout/Layout";
import DeliveryDensityHeatmap from "./pages/DeliveryDensityHeatmap";
import ManagePostmen from "./pages/ManagePostmen";
import Schedules from "./pages/Schedules";
import ManageComplaints from "./pages/ManageComplaints";
import Assign from "./pages/Assign";
import DeliveryList from "./pages/DeliveryList";
import PostAssigned from "./pages/PostmanAssigned";
import Home from "./pages/Home";
import ReportAndAnalytics from "./pages/ReportAndAnalytics";
import QRManagement from "./pages/QRManagement";
import ProtectedRoute from "./routes/ProtectedRoute";
function App() {
  return (
		<Routes>
			<Route path="/auth/login" element={<Login />} />
			<Route index element={<Home />} />
			<Route path="/" element={<ProtectedRoute />}>
				<Route path="/" element={<Layout />}>
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/delivery" element={<Delivery />} />
					<Route path="/postman-management" element={<ManagePostmen />} />
					<Route path="/schedules" element={<Schedules />} />
					<Route path="/complaints" element={<ManageComplaints />} />
					<Route path="/deliverydensity" element={<DeliveryDensityHeatmap />} />
					<Route path="/report-analytics" element={<ReportAndAnalytics />} />
					<Route path="/assign-delivery" element={<DeliveryList />} />
					<Route path="/deliveries-assigned" element={<PostAssigned />} />
					<Route path="/assign" element={<Assign />} />
					<Route path="/qr-management" element={<QRManagement />} />
					<Route path="/track" element={<QRManagement />} />
				</Route>
			</Route>
		</Routes>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { NavigationMenu, NavigationMenuItem } from "@/components/ui/navigation-menu";
import { DashboardIcon, PlusIcon } from "@radix-ui/react-icons";
import { BellIcon } from "lucide-react";
import ProfileImage from "@/assets/postlogo.jpg";
import Notification from "@/components/custom/Notification";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserDetailsQuery } from "../services/auth/authService";
import { setCredentials } from "../redux/features/auth/authSlice";

function Layout() {
	const { userInfo } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const [isNotificationVisible, setNotificationVisible] = useState(false);
	const navigate = useNavigate();

	const { data, isFetching } = useGetUserDetailsQuery("userDetails", {
		pollingInterval: 900000,
	});

	useEffect(() => {
		if (data) dispatch(setCredentials(data));
	}, [data, dispatch]);

	return (
		<SidebarProvider>
			<AppSidebar />
			<main className="w-full min-h-screen max-h-full overflow-hidden lg:p-3 bg-gray-100">
				<NavigationMenu className="w-full mt-2 lg:mb-5 grid grid-cols-1 lg:grid-cols-3 justify-items-stretch list-none bg-white p-3 rounded-3xl shadow-md">
					<NavigationMenuItem className="flex items-center col-span-1 lg:col-span-2">
						<div className="mr-3 rounded-full bg-white p-1 hover:bg-red-700 hover:text-white">
							<SidebarTrigger className={"hover:bg-red-700 hover:text-white"} />
						</div>
						<div className="flex items-center gap-3">
							<div className="h-full bg-red-700 text-white p-3 rounded-full">
								<DashboardIcon />
							</div>
							<p className="font-bold text-lg">
								<span className="font-normal">Dashboard</span>
							</p>
						</div>
					</NavigationMenuItem>
					<NavigationMenuItem className="items-center justify-end gap-4 col-span-1 hidden lg:flex">
						<div className="flex gap-3 items-center">
							<img
								src={ProfileImage}
								alt="Profile"
								width={45}
								className="rounded-full"
							/>
							<div
								className="rounded-full border-2 p-3 cursor-pointer"
								onClick={() => setNotificationVisible(!isNotificationVisible)}
								title="Notifications"
							>
								<BellIcon height={18} width={18} />
							</div>
						</div>
					</NavigationMenuItem>
				</NavigationMenu>
				<Notification isVisible={isNotificationVisible} />
				<Outlet />
			</main>
		</SidebarProvider>
	);
}

export default Layout;

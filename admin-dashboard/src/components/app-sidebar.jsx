import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuItem
} from "@/components/ui/sidebar";
import { DashboardIcon } from "@radix-ui/react-icons";
import { Calendar, Inbox, LogOutIcon, PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { AiOutlineMessage } from "react-icons/ai";
import { MdDeviceHub, MdEditDocument, MdOutlineAnalytics } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../redux/features/auth/authSlice";

const items = [
	{
		id: 0,
		title: "Dashboard",
		url: "/dashboard",
		icon: DashboardIcon,
	},
	{
		id: 1,
		title: "Delivery",
		url: "/delivery",
		icon: MdEditDocument,
	},
	{
		id: 2,
		title: "Schedule",
		url: "/schedules",
		icon: Calendar,
	},
	{
		id: 3,
		title: "Assign Delivery",
		url: "/assign-delivery",
		icon: Inbox,
	},
	{
		id: 4,
		title: "QR Management",
		url: "/qr-management",
		icon: MdDeviceHub,
	},
	{
		id: 5,
		title: "Manage Postmen",
		url: "/postman-management",
		icon: PlusIcon,
	},
	{
		id: 6,
		title: "Reports & Analytics",
		url: "/report-analytics",
		icon: MdOutlineAnalytics,
	},
	{
		id: 8,
		title: "Manage Complaint",
		url: "/complaints",
		icon: AiOutlineMessage,
	},
];

export function AppSidebar() {
	const dispatch = useDispatch();
	const [current, setCurrent] = useState(0);
	const location = useLocation();

	useEffect(() => {
		const activeItem = items.find((item) => item.url === location.pathname);
		if (activeItem) {
			setCurrent(activeItem.id);
		}
	}, [location.pathname]);

	return (
		<Sidebar className="bg-gray-100">
			<SidebarContent className="flex flex-col justify-between h-full border">
				<SidebarGroup>
					<SidebarGroupLabel className="font-semibold text-3xl my-5 mb-8 ml-5 text-gray-900">
						<Link to={"/"}>Admin Panel</Link>
					</SidebarGroupLabel>
					<SidebarGroupContent className="p-2">
						<SidebarMenu>
							{items.map((item) => (
								<Link to={item.url}>
									<SidebarMenuItem
										key={item.id}
										className={`flex items-center rounded-lg px-4 py-2 ${
											current === item.id
												? "bg-red-800 hover:bg-red-800 text-white font-semibold"
												: "bg-transparent hover:bg-red-800 hover:text-white"
										} transition`}
										onClick={() => setCurrent(item.id)}
									>
										<item.icon className="mr-3 h-5 w-5" />
										<span className="text-lg">{item.title}</span>
									</SidebarMenuItem>
								</Link>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
				<SidebarGroup>
					<SidebarMenu>
						<SidebarMenuItem
							className="flex items-center gap-4 p-3 rounded-lg hover:bg-red-600 hover:text-white cursor-pointer"
							onClick={() => dispatch(logout())}
						>
							<LogOutIcon className="text-2xl" />
							<span className="font-medium">Logout</span>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}

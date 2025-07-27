import React, { useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Alert } from "../components/ui/alert";
import { TriangleAlert } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/features/auth/authActions";
import postImage from "../assets/postlogo.jpg";

const LoginSchema = z.object({
	email: z.string().email({ message: "Invalid email address" }),
	password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

export default function Login() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const state = useSelector((state) => state.auth);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	useEffect(() => {
		if (state.userToken) {
			navigate("/dashboard");
			reset();
		}
	}, [navigate, state]);

	const onSubmit = (data) => {
		dispatch(loginUser({ email: data.email, password: data.password }));
	};

	return (
		<div className="w-full m-0 p-0 h-screen flex justify-center items-center bg-red-700 ">
			<Card className="w-full max-w-lg p-8 bg-white rounded-lg shadow-2xl py-14 border ">
				<div className="flex justify-center mb-6">
					<img src={postImage} alt="Post" className="h-32 w-auto" />
				</div>

				<div>
					<CardHeader className="text-center">
						<CardTitle className="text-4xl font-bold text-gray-800">Login</CardTitle>
						<CardDescription className=" text-gray-600">
							Enter your email and password to access your account.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
							<div>
								<Label htmlFor="email" className="block text-gray-700">
									Email
								</Label>
								<Input
									id="email"
									type="email"
									placeholder="m@example.com"
									{...register("email")}
									className="mt-2 block w-full"
								/>
								{errors.email && (
									<Alert
										variant="destructive"
										className="flex items-center mt-2 space-x-2 text-red-500"
									>
										<TriangleAlert className="h-4 w-4" />
										<span>{errors.email.message}</span>
									</Alert>
								)}
							</div>

							<div>
								<Label htmlFor="password" className="block text-gray-700">
									Password
								</Label>
								<Input
									id="password"
									type="password"
									placeholder="Enter your password"
									{...register("password")}
									className="mt-2 block w-full"
								/>
								{errors.password && (
									<Alert
										variant="destructive"
										className="flex items-center mt-2 space-x-2 text-red-500"
									>
										<TriangleAlert className="h-4 w-4" />
										<span>{errors.password.message}</span>
									</Alert>
								)}
							</div>

							<div className="flex justify-center">
								<Button
									type="submit"
									className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
								>
									Login
								</Button>
							</div>
						</form>
					</CardContent>
				</div>
			</Card>
		</div>
	);
}

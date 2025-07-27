import React, { useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const App = () => {
	const [sidebarActive, setSidebarActive] = useState(false);
	const [extraInfoVisible, setExtraInfoVisible] = useState(false);
	const navigate = useNavigate();

	const toggleSidebar = () => {
		setSidebarActive(!sidebarActive);
	};

	const toggleExtraInfo = () => {
		setExtraInfoVisible(!extraInfoVisible);
	};

	return (
		<div className="container-outer">
			<nav className="navbar" id="navbar">
				<div className="logo">
					<img
						src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/India_Post_Logo.svg/1280px-India_Post_Logo.svg.png"
						alt="Logo"
					/>
				</div>
				<div className="hamburger" onClick={toggleSidebar}>
					&#9776;
				</div>
				<div className="links">
					<ul>
						<li>
							<a href="#">Home</a>
						</li>
						<li>
							<a href="#services">Services</a>
						</li>
						<li>
							<a href="#about-us">About</a>
						</li>
					</ul>
				</div>
				<div className="auth-buttons">
					<div className="btn-login" onClick={() => navigate("/auth/login")}>
						Login/Signup
					</div>
				</div>
			</nav>
			<div className={`sidebar ${sidebarActive ? "active" : ""}`} id="sidebar">
				<div className="close-btn" onClick={toggleSidebar}>
					×
				</div>
				<ul>
					<li>
						<a href="#">Home</a>
					</li>
					<li>
						<a href="#services">Services</a>
					</li>
					<li>
						<a href="#about-us">About</a>
					</li>
					<li>
						<a href="#login" className="sidebar-btn-login">
							Login
						</a>
					</li>
				</ul>
				<div className="auth-buttons">
					<a href="#login" className="btn-login">
						Login/Signup
					</a>
				</div>
			</div>
			<div className="container">
				<div className="text">
					<h1>Waqt Pe Post</h1>
					<p>
						Waqt Pe Post offers flexible delivery time slots, real-time tracking, and
						dynamic updates for rescheduling deliveries, all aimed at making your Indian
						Post experience more convenient.
					</p>
					<button type="button">Download App</button>
				</div>
				<div className="photo">
					<img src="postman.jpg" alt="Postman" />
				</div>
			</div>
			<section id="about-us">
				<div className="about-container">
					<div className="about-image">
						<img
							src="https://cdni.iconscout.com/illustration/premium/thumb/postman-with-parcel-order-from-home-illustration-download-in-svg-png-gif-file-formats--delivery-man-box-courier-pack-e-commerce-shopping-illustrations-2261406.png?f=webp"
							alt="About Us"
						/>
					</div>
					<div className="about-content">
						<h2>About Us</h2>
						<p id="about-paragraph">
							We provide reliable and fast delivery services connecting local stores
							with customers. With a mission to make delivery convenient and
							efficient, we ensure your orders are handled with care and reach you in
							time. Our services support businesses and individuals, promoting local
							commerce while prioritizing customer satisfaction.
						</p>
						<button id="learn-more-btn" onClick={toggleExtraInfo}>
							{extraInfoVisible ? "Show Less" : "Learn More"}
						</button>
						{extraInfoVisible && (
							<div id="extra-info">
								<p>
									Our team is dedicated to bridging the gap between customers and
									stores through seamless logistics. With a focus on innovation
									and customer satisfaction, we strive to set a benchmark in the
									delivery industry.
								</p>
							</div>
						)}
					</div>
				</div>
			</section>
			<section id="services">
				<div className="services-container">
					<h2>Our Services</h2>
					<p>
						Explore a range of reliable and efficient delivery services offered by the
						Indian Postal Service.
					</p>
					<div className="services-scroll">
						<div className="service-card">
							<img src="post_delivery.jpg" alt="Parcel Delivery" />
							<h3>Parcel Delivery</h3>
							<p>Deliver parcels to your loved ones across the country safely.</p>
						</div>
						<div className="service-card">
							<img src="speed-post-by-India-post.png" alt="Speed Post" />
							<h3>Speed Post</h3>
							<p>Fast and reliable express delivery for time-sensitive items.</p>
						</div>
						<div className="service-card">
							<img src="image.png" alt="Real-Time Tracking" />
							<h3>Real-Time Tracking</h3>
							<p>Track your shipment in real-time for complete peace of mind.</p>
						</div>
						<div className="service-card">
							<img src="Parcel insurence.jpg" alt="Postal Insurance" />
							<h3>Postal Insurance</h3>
							<p>
								Protect your shipments with affordable and secure insurance plans.
							</p>
						</div>
						<div className="service-card">
							<img src="Reschedule.jpg" alt="Reschedule Delivery" />
							<h3>Reschedule Delivery</h3>
							<p>
								Easily reschedule your delivery to a time and date that suits you
								best
							</p>
						</div>
						<div className="service-card">
							<img
								src="India Post Registered Post Tracking.webp"
								alt="Registered Post"
							/>
							<h3>Registered Post</h3>
							<p>Send important documents with added tracking and security.</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default App;

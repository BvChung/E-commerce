import { useState } from "react";
import { Suspense } from "react";
import { Outlet, useLocation, ScrollRestoration, Link } from "react-router-dom";
import Nav from "../nav/Nav";
import CheckoutNav from "../nav/CheckoutNav";
import Footer from "../footer/Footer";
import { ToastContainer, Flip } from "react-toastify";
import Spinner from "../loading/Spinner";

export default function Layout() {
	const location = useLocation();
	const [activeSidebar, setActiveSidebar] = useState<boolean>(false);

	const footerLocations = ["/products", "/orders", "/cart"];
	const displayFooter =
		location.pathname === "/" ||
		footerLocations.some((el) => location.pathname.includes(el));

	return (
		<div
			className={`drawer ${
				activeSidebar ? "h-screen" : "h-full"
			} min-h-screen min-w-full relative`}
			data-theme="lofi"
		>
			<input
				onChange={(e) => {
					if (e.target.checked) {
						setActiveSidebar(true);
					}

					if (!e.target.checked) {
						setActiveSidebar(false);
					}
				}}
				id="app-drawer"
				type="checkbox"
				className="drawer-toggle"
			/>
			<div className="drawer-content flex flex-col justify-between h-full w-full fade">
				{/* <!-- Navbar --> */}
				{!location.pathname.startsWith("/checkout") ? <Nav /> : <CheckoutNav />}

				{/* <!-- Page content here --> */}

				<div className="flex flex-col justify-between h-full mt-16">
					<Suspense fallback={<Spinner minHeight="min-h-screen" />}>
						<Outlet />
					</Suspense>
				</div>

				{displayFooter && <Footer />}

				<ToastContainer
					limit={3}
					autoClose={1500}
					transition={Flip}
					theme={"light"}
					position="top-center"
				/>
			</div>
			<div className="drawer-side">
				<label htmlFor="app-drawer" className="drawer-overlay"></label>
				<div className="menu p-4 overflow-y-auto w-80 bg-base-100">
					<div className="flex items-center mb-2 px-4">
						<Link to="/" className="mr-4">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								className="w-7 h-7"
							>
								<path d="M19.006 3.705a.75.75 0 00-.512-1.41L6 6.838V3a.75.75 0 00-.75-.75h-1.5A.75.75 0 003 3v4.93l-1.006.365a.75.75 0 00.512 1.41l16.5-6z" />
								<path
									fillRule="evenodd"
									d="M3.019 11.115L18 5.667V9.09l4.006 1.456a.75.75 0 11-.512 1.41l-.494-.18v8.475h.75a.75.75 0 010 1.5H2.25a.75.75 0 010-1.5H3v-9.129l.019-.006zM18 20.25v-9.565l1.5.545v9.02H18zm-9-6a.75.75 0 00-.75.75v4.5c0 .414.336.75.75.75h3a.75.75 0 00.75-.75V15a.75.75 0 00-.75-.75H9z"
									clipRule="evenodd"
								/>
							</svg>
						</Link>

						<Link to="/signin" className="w-fit btn btn-sm rounded-full">
							Sign in or create account
						</Link>
					</div>
					<ul className="menu menu-compact flex flex-col">
						<li></li>
						<li className="menu-title">
							<span>Shop</span>
						</li>
						<li>
							<Link to="/products" className="flex items-center gap-4">
								<span className="flex-none">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={2}
										stroke="currentColor"
										className="h-6 w-6"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
										/>
									</svg>
								</span>
								<span className="flex-1 text-sm font-medium text-gray-800">
									Shop
								</span>
							</Link>
						</li>
						<li>
							<Link to="/cart" className="flex items-center gap-4">
								<span className="flex-none">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-6 w-6"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										strokeWidth={2}
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
										/>
									</svg>
								</span>
								<span className="flex-1 text-sm font-medium text-gray-800">
									My Cart
								</span>
							</Link>
						</li>
					</ul>

					<ul className="menu menu-compact flex flex-col">
						<li></li>
						<li className="menu-title">
							<span>Account</span>
						</li>
						<li>
							<Link to="/account" className="flex items-center gap-4">
								<span className="flex-none">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={2}
										stroke="currentColor"
										className="w-6 h-6"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
										/>
									</svg>
								</span>
								<span className="flex-1 text-sm font-medium text-gray-800">
									Manage Account
								</span>
							</Link>
						</li>

						<li>
							<Link to="/orders" className="flex items-center gap-4">
								<span className="flex-none">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-6 w-6"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										strokeWidth={2}
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
										/>
									</svg>
								</span>
								<span className="flex-1 text-sm font-medium text-gray-800">
									Orders
								</span>
							</Link>
						</li>
					</ul>
				</div>
			</div>

			<ScrollRestoration />
		</div>
	);
}

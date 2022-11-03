import { useState } from "react";
import { Outlet, useLocation, ScrollRestoration, Link } from "react-router-dom";
import Nav from "../nav/Nav";
import CheckoutNav from "../nav/CheckoutNav";
import MainFooter from "../footer/MainFooter";
import SubFooter from "../footer/SubFooter";
import { useThemeContext } from "../../hooks/context/useThemeContext";
import { ToastContainer, Flip } from "react-toastify";

export default function Layout() {
	const { theme } = useThemeContext();
	const location = useLocation();
	const [activeSidebar, setActiveSidebar] = useState<boolean>(false);

	return (
		<div
			className={`drawer ${activeSidebar ? "h-screen" : "h-full"} ${
				theme && "dark"
			} min-h-screen min-w-full relative`}
			data-theme={theme ? "pastel" : "lofi"}
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

				<div className="flex flex-col justify-between h-full mt-14">
					<Outlet />
					{location.pathname === "/" ? <MainFooter /> : <SubFooter />}
				</div>

				{/* <div className="flex flex-col justify-between h-full w-full fade">
					<Outlet />
					{location.pathname === "/" ? <MainFooter /> : <SubFooter />}
				</div> */}
				<ToastContainer
					limit={5}
					autoClose={1500}
					transition={Flip}
					theme={theme ? "dark" : "light"}
				/>
				{/* {location.pathname === "/" && <Footer />} */}
			</div>
			<div className="drawer-side">
				<label htmlFor="app-drawer" className="drawer-overlay"></label>
				<div className="menu p-4 overflow-y-auto w-80 bg-base-100">
					{/* <!-- Sidebar content here --> */}
					<div className="z-20 bg-base-200 bg-opacity-90 backdrop-blur sticky top-0 items-center gap-2 px-4 py-2 hidden lg:flex">
						<div className="flex w-full"></div>
					</div>
					<ul className="menu menu-compact flex flex-col">
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
								<span className="flex-1 text-gray-700">Products</span>
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
								<span className="flex-1 text-gray-700">Cart</span>
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
								<span className="flex-1 text-gray-700">Orders</span>
							</Link>
						</li>
					</ul>
					<ul className="menu menu-compact flex flex-col">
						<li>
							<a>Item 1</a>
						</li>
						<li>
							<a>Item 2</a>
						</li>
						<li>
							<a>Item 3</a>
						</li>
					</ul>
				</div>
			</div>

			<ScrollRestoration />
		</div>
	);
}

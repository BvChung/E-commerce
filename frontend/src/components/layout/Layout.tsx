import { useState, useCallback, useEffect } from "react";
import type { Location, useMatches } from "react-router-dom";
import { Outlet, useLocation, ScrollRestoration } from "react-router-dom";
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
					console.log(e.target.checked);
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

import { Outlet, useLocation } from "react-router-dom";
import Nav from "../nav/Nav";
import CheckoutNav from "../nav/CheckoutNav";
import Footer from "../footer/Footer";
import { useThemeContext } from "../../hooks/context/useThemeContext";
import { ToastContainer, Slide } from "react-toastify";

export default function Layout() {
	const { theme } = useThemeContext();
	const location = useLocation();

	return (
		<div className="drawer" data-theme={theme ? "night" : "winter"}>
			<input id="app-drawer" type="checkbox" className="drawer-toggle" />
			<div className="drawer-content flex flex-col">
				{/* <!-- Navbar --> */}
				{!location.pathname.startsWith("/checkout") ? <Nav /> : <CheckoutNav />}

				{/* <!-- Page content here --> */}
				<div className="h-screen w-screen overflow-auto">
					<Outlet />
				</div>
				<ToastContainer
					limit={1}
					autoClose={1500}
					transition={Slide}
					theme={theme ? "dark" : "light"}
				/>
				{location.pathname === "/" && <Footer />}
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
		</div>
	);
}

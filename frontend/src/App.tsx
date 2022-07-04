import Nav from "./components/nav/Nav";
import Login from "./components/account/Login";
import Register from "./components/account/Register";
import "./App.css";
import Landing from "./components/landingPage/LandingPage";
import ProductPage from "./components/products/ProductPage";
import ProtectedRoutes from "./components/protected/ProtectedRoutes";
import Footer from "./components/footer/Footer";
import { Routes, Route, Outlet } from "react-router-dom";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
	return (
		<div className="h-screen w-screen overflow-auto" data-theme="light">
			<Nav />
			<Routes>
				<Route path="/" element={<Outlet />}>
					{/* Public routes */}
					<Route index element={<Landing />} />

					<Route path="login" element={<Login />} />

					<Route path="register" element={<Register />} />

					<Route path="products" element={<Outlet />}>
						<Route index element={<ProductPage />} />
						<Route path=":id" element={<p>product id</p>} />
					</Route>

					<Route path="cart" element={<p>cart</p>} />

					{/* Private Routes */}
					<Route element={<ProtectedRoutes />}>
						<Route path="checkout" element={<Outlet />}>
							<Route path="information" element={<p>info</p>} />
							<Route path="payment" element={<p>payment</p>} />
						</Route>

						<Route path="admin" element={<Outlet />}>
							<Route index element={<div>Links</div>} />
							<Route path="products" element={<p>info</p>} />
							<Route path=":id" element={<p>product id</p>} />
						</Route>

						<Route path="account" element={<p>account</p>} />
					</Route>

					<Route path="*" element={<p>Not Found</p>} />
				</Route>
			</Routes>
			<Footer />

			<ToastContainer limit={1} autoClose={1500} transition={Slide} />
		</div>
	);
}

export default App;

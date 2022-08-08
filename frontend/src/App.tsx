import Nav from "./components/nav/Nav";
import Login from "./components/account/Login";
import Register from "./components/account/Register";
import "./App.css";
import Layout from "./components/layout/Layout";
import Landing from "./components/landingPage/LandingPage";
import ProductPage from "./components/products/ProductPage";
import ProductInfo from "./components/products/ProductInfo";
import ProductCreation from "./components/products/ProductCreation";
import OrdersPage from "./components/orders/OrdersPage";
import Cart from "./components/cart/Cart";
import ProtectedRoutes from "./components/protected/ProtectedRoutes";
import Unauthorized from "./components/protected/Unauthorized";
import Footer from "./components/footer/Footer";
import { Routes, Route, Outlet } from "react-router-dom";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { accessRoles } from "./helper/accessRoles";
import PersistLogin from "./components/protected/PersistLogin";
import { useThemeContext } from "./hooks/context/useThemeContext";

function App() {
	const { theme } = useThemeContext();

	return (
		<div
			className="h-screen w-screen overflow-auto"
			data-theme={theme ? "night" : "winter"}
		>
			<Nav />
			<Routes>
				<Route path="/" element={<Layout />}>
					{/* Public routes */}
					<Route index element={<Landing />} />

					<Route path="login" element={<Login />} />

					<Route path="register" element={<Register />} />

					<Route path="products" element={<Outlet />}>
						<Route index element={<ProductPage />} />
						<Route path=":id" element={<ProductInfo />} />
						<Route path="creation" element={<ProductCreation />} />
					</Route>

					<Route path="cart" element={<Cart />} />

					<Route path="unauthorized" element={<Unauthorized />} />

					{/* Private Routes */}
					<Route element={<PersistLogin />}>
						<Route
							element={
								<ProtectedRoutes
									authRoles={[accessRoles.Admin, accessRoles.Consumer]}
								/>
							}
						>
							<Route path="checkout" element={<Outlet />}>
								<Route path="information" element={<p>info</p>} />
								<Route path="payment" element={<p>payment</p>} />
							</Route>

							<Route path="orders" element={<OrdersPage />} />

							<Route path="account" element={<p>account</p>} />
						</Route>

						<Route
							element={<ProtectedRoutes authRoles={[accessRoles.Admin]} />}
						>
							<Route path="admin" element={<Outlet />}>
								<Route index element={<div>Admin</div>} />
								<Route path="products" element={<p>info</p>} />
								<Route path=":id" element={<p>product id</p>} />
							</Route>
						</Route>
					</Route>
				</Route>

				<Route path="*" element={<p>Not Found</p>} />
			</Routes>
			<Footer />

			<ToastContainer limit={1} autoClose={1500} transition={Slide} />
		</div>
	);
}

export default App;

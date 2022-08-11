import Login from "./components/account/Login";
import Register from "./components/account/Register";
import "./App.css";
import Layout from "./components/layout/Layout";
import Landing from "./components/landingPage/LandingPage";
import ProductPage from "./components/products/ProductPage";
import ProductInfo from "./components/products/ProductInfo";
import ProductCreation from "./components/products/ProductCreation";
import PaySelect from "./components/checkout/PaySelect";
import Shipping from "./components/checkout/Shipping";
import OrdersPage from "./components/orders/OrderPage";
import Cart from "./components/cart/Cart";
import ProtectedRoutes from "./components/protected/ProtectedRoutes";
import Unauthorized from "./components/protected/Unauthorized";
import { Routes, Route, Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { accessRoles } from "./helper/accessRoles";
import PersistLogin from "./components/protected/PersistLogin";

function App() {
	return (
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

				<Route path="orders" element={<OrdersPage />} />

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
							<Route path="payselect" element={<PaySelect />} />
							<Route path="shipping" element={<Shipping />} />
						</Route>

						{/* <Route path="orders" element={<OrdersPage />} /> */}

						<Route path="account" element={<p>account</p>} />
					</Route>

					<Route element={<ProtectedRoutes authRoles={[accessRoles.Admin]} />}>
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
	);
}

export default App;

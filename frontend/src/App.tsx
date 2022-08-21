import "./App.css";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import AccountPage from "./components/account/AccountPage";
import Layout from "./components/layout/Layout";
import Landing from "./components/landingPage/LandingPage";
import ProductPage from "./components/products/ProductPage";
import ProductInfo from "./components/products/ProductInfo";
import ProductCreation from "./components/products/ProductCreation";
import Payment from "./components/checkout/Payment";
import Shipping from "./components/checkout/Shipping";
import ConfirmOrder from "./components/checkout/ConfirmOrder";
import OrdersPage from "./components/orders/OrderPage";
import Cart from "./components/cart/Cart";
import EditName from "./components/account/EditName";
import EditEmail from "./components/account/EditEmail";
import EditPassword from "./components/account/EditPassword";
import ProtectedRoutes from "./components/protected/ProtectedRoutes";
import Unauthorized from "./components/protected/Unauthorized";
import { Routes, Route, Outlet } from "react-router-dom";
import { accessRoles } from "./helper/accessRoles";
import "react-toastify/dist/ReactToastify.css";
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
							<Route path="payment" element={<Payment />} />
							<Route path="shipping" element={<Shipping />} />
							<Route path="confirmation" element={<ConfirmOrder />} />
						</Route>

						{/* <Route path="orders" element={<OrdersPage />} /> */}

						<Route path="account" element={<Outlet />}>
							<Route index element={<div>Not Found</div>} />
							<Route path="info" element={<AccountPage />} />
							<Route path="name" element={<EditName />} />
							<Route path="email" element={<EditEmail />} />
							<Route path="password" element={<EditPassword />} />
						</Route>
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

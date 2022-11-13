import "./App.css";
import {
	createBrowserRouter,
	RouterProvider,
	Route,
	Outlet,
	createRoutesFromElements,
} from "react-router-dom";
import SignIn from "./components/user/SignIn";
import Register from "./components/user/Register";
import AccountPage from "./components/account/AccountPage";
import Admin from "./components/admin/Admin";
import AdminSignIn from "./components/admin/AdminSignIn";
import Layout from "./components/layout/Layout";
import LandingPage from "./components/landingPage/LandingPage";
import ProductPage from "./components/products/ProductPage";
import InventoryPage from "./components/admin/inventory/InventoryPage";
import ProductInfo from "./components/products/ProductInfo";
import CreateProducts from "./components/admin/create/CreateProducts";
import UpdateProducts from "./components/admin/inventory/UpdateProducts";
import ManagementPage from "./components/admin/management/ManagementPage";
import Payment from "./components/checkout/Payment";
import Shipping from "./components/checkout/Shipping";
import ReviewOrder from "./components/checkout/ReviewOrder";
import OrderPage from "./components/orders/OrderPage";
import OrderInfo from "./components/orders/OrderInfo";
import Cart from "./components/cart/Cart";
import EditName from "./components/account/EditName";
import EditEmail from "./components/account/EditEmail";
import EditPassword from "./components/account/EditPassword";
import RequireAuth from "./components/protected/RequireAuth";
import AdminAuth from "./components/protected/AdminAuth";
import Unauthorized from "./components/protected/Unauthorized";
import { accessRoles } from "./helper/accessRoles";
import PersistLogin from "./components/protected/PersistLogin";
import "react-toastify/dist/ReactToastify.css";

const appRouter = createBrowserRouter(
	createRoutesFromElements(
		<Route element={<Layout />}>
			{/* Public routes */}
			<Route element={<PersistLogin />}>
				<Route path="/" element={<LandingPage />} />
				<Route path="signin" element={<SignIn />} />
				<Route path="adminsignin" element={<AdminSignIn />} />
				<Route path="register" element={<Register />} />
				<Route path="products" element={<Outlet />}>
					<Route index element={<ProductPage />} />
					<Route path=":id" element={<ProductInfo />} />
				</Route>
				<Route path="cart" element={<Cart />} />
				<Route path="unauthorized" element={<Unauthorized />} />

				{/* Private Routes */}
				<Route element={<RequireAuth />}>
					<Route path="checkout" element={<Outlet />}>
						<Route path="payment" element={<Payment />} />
						<Route path="shipping" element={<Shipping />} />
						<Route path="confirmation" element={<ReviewOrder />} />
					</Route>

					<Route path="orders" element={<Outlet />}>
						<Route index element={<OrderPage />} />
						<Route path=":id" element={<OrderInfo />} />
					</Route>

					<Route path="account" element={<Outlet />}>
						<Route index element={<AccountPage />} />
						{/* <Route path="info" element={<AccountPage />} /> */}
						<Route path="name" element={<EditName />} />
						<Route path="email" element={<EditEmail />} />
						<Route path="password" element={<EditPassword />} />
					</Route>
				</Route>

				<Route
					element={
						<AdminAuth authRoles={[accessRoles.Admin, accessRoles.Manager]} />
					}
				>
					<Route path="admin" element={<Outlet />}>
						<Route index element={<Admin />} />
						<Route path="create" element={<CreateProducts />} />
						<Route path="inventory" element={<Outlet />}>
							<Route index element={<InventoryPage />} />
							<Route path=":id" element={<UpdateProducts />} />
						</Route>

						<Route path="manage" element={<ManagementPage />} />
					</Route>
				</Route>
			</Route>

			<Route path="*" element={<p>Not Found</p>} />
		</Route>
	)
);

export default function App() {
	return (
		<RouterProvider router={appRouter} fallbackElement={<p>Loading...</p>} />
	);
}

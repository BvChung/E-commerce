import { lazy, Suspense } from "react";
import "./App.css";
import {
	createBrowserRouter,
	RouterProvider,
	Route,
	Outlet,
	createRoutesFromElements,
} from "react-router-dom";
import Layout from "./components/layout/Layout";
import LandingPage from "./components/landingPage/LandingPage";
import ProductPage from "./components/products/ProductPage";
import OrderPage from "./components/orders/OrderPage";
import Cart from "./components/cart/Cart";
import Admin from "./components/admin/Admin";
import PersistLogin from "./components/protected/PersistLogin";
import RequireAuth from "./components/protected/RequireAuth";
import AdminAuth from "./components/protected/AdminAuth";
import { accessRoles } from "./helper/accessRoles";
import "react-toastify/dist/ReactToastify.css";

// import ProductInfo from "./components/products/ProductInfo";
// const OrderPage = lazy(() => import("./components/orders/OrderPage"));
const ProductInfo = lazy(() => import("./components/products/ProductInfo"));
const OrderInfo = lazy(() => import("./components/orders/OrderInfo"));
const Payment = lazy(() => import("./components/checkout/Payment"));
const Shipping = lazy(() => import("./components/checkout/Shipping"));
const ReviewOrder = lazy(() => import("./components/checkout/ReviewOrder"));
const SignIn = lazy(() => import("./components/user/SignIn"));
const Register = lazy(() => import("./components/user/Register"));
const AccountPage = lazy(() => import("./components/checkout/Shipping"));
const EditName = lazy(() => import("./components/account/EditName"));
const EditEmail = lazy(() => import("./components/account/EditEmail"));
const EditPassword = lazy(() => import("./components/account/EditPassword"));
const AdminSignIn = lazy(() => import("./components/admin/AdminSignIn"));
const ManagementPage = lazy(
	() => import("./components/admin/management/ManagementPage")
);
const InventoryPage = lazy(
	() => import("./components/admin/inventory/InventoryPage")
);
const CreateProduct = lazy(
	() => import("./components/admin/create/CreateProduct")
);
const UpdateProduct = lazy(
	() => import("./components/admin/inventory/UpdateProduct")
);
const Unauthorized = lazy(() => import("./components/protected/Unauthorized"));

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
						<Route path="create" element={<CreateProduct />} />
						<Route path="inventory" element={<Outlet />}>
							<Route index element={<InventoryPage />} />
							<Route path=":id" element={<UpdateProduct />} />
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
		<Suspense fallback={<div>Loading...</div>}>
			<RouterProvider router={appRouter} />
		</Suspense>
	);
}

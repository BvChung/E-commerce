import React from "react";
import Nav from "./components/nav/Nav";
import "./App.css";
import Home from "./components/home/Home";
import { Routes, Route, Outlet } from "react-router-dom";

function App() {
	return (
		<div className="App ">
			<Nav />
			<Routes>
				<Route path="/" element={<Outlet />}>
					<Route index element={<Home />} />

					<Route path="cart" element={<p>cart</p>} />

					<Route path="products" element={<Outlet />}>
						<Route index element={<div>home products</div>} />
						<Route path=":id" element={<p>product id</p>} />
					</Route>

					<Route path="checkout" element={<Outlet />}>
						<Route path="information" element={<p>info</p>} />
						<Route path="payment" element={<p>payment</p>} />
					</Route>
				</Route>

				<Route path="/login" element={<p>login</p>} />
				<Route path="/register" element={<p>register</p>} />

				{/* <Route path="/products" element={<Outlet />}>
					<Route path=":id" element={<p>product id</p>} />
					<Route path=":id/a" element={<p>product 123</p>} />
				</Route> */}
				<Route path="*" element={<p>Not Found</p>} />
			</Routes>
		</div>
	);
}

export default App;

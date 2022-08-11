import React from "react";
import { Outlet } from "react-router-dom";

export default function Checkout() {
	return (
		<div>
			<h1>Checkout</h1>
			<Outlet />
		</div>
	);
}

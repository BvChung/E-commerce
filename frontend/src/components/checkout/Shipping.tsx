import React from "react";
import { Link } from "react-router-dom";

export default function Shipping() {
	return (
		<div>
			<h1>Shipping</h1>
			<ul className="steps">
				<li className="step step-primary uppercase text-sm">Sign in</li>
				<li className="step step-primary uppercase text-sm">Payment</li>
				<li className="step uppercase text-sm">Shipping</li>
				<li className="step uppercase text-sm">Place order</li>
			</ul>
			<Link to="/checkout/payselect" className="btn btn-primary">
				Continue
			</Link>
		</div>
	);
}

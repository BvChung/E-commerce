import React from "react";
import { Link } from "react-router-dom";

export default function ConfirmOrder() {
	return (
		<div>
			ConfirmOrder
			<div>
				<Link to="/checkout/payment" className="btn btn-primary">
					Return
				</Link>
			</div>
		</div>
	);
}

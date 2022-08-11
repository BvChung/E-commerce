import React from "react";
import { Link } from "react-router-dom";
import { useOrderContext } from "../../hooks/context/useOrderContext";

export default function PaySelect() {
	const { myOrder, handlePayment } = useOrderContext();
	console.log(myOrder);

	return (
		<div className="flex flex-col">
			<h1>PaySelect</h1>
			<ul className="steps">
				<li className="step step-primary uppercase text-xs">Sign in</li>
				<li className="step step-primary uppercase text-xs">Shipping</li>
				<li className="step step-primary uppercase text-xs">Payment</li>
				<li className="step uppercase text-xs">Place order</li>
			</ul>
			<div>
				<div className="form-control w-full max-w-sm">
					<label className="label">
						<span className="label-text">Card Number</span>
					</label>
					<input
						type="text"
						placeholder="Enter card number"
						className="input input-sm input-bordered w-full max-w-sm "
						name="cardNumber"
						value={myOrder.paymentDetails.cardNumber}
						onChange={handlePayment}
						required
					/>
				</div>

				<div className="form-control w-full max-w-xs">
					<label className="label">
						<span className="label-text">Payment Type</span>
					</label>
					<select
						name="paymentType"
						value={myOrder.paymentDetails.paymentType}
						onChange={handlePayment}
						className="select select-sm select-bordered"
						required
					>
						<option disabled value="">
							Payment type
						</option>
						<option value="Credit">Credit</option>
						<option value="Debit">Debit</option>
					</select>
				</div>
			</div>
			<div>
				<Link to="/checkout/shipping" className="btn btn-primary">
					Return
				</Link>
			</div>
		</div>
	);
}

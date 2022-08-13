import React from "react";
import { Link } from "react-router-dom";
import { useOrderContext } from "../../hooks/context/useOrderContext";
import { useCartContext } from "../../hooks/context/useCartContext";

export default function PaySelect() {
	const { myOrder, handlePayment } = useOrderContext();
	console.log(myOrder.paymentInfo);

	return (
		<div>
			<div className="flex flex-col items-center">
				<h1>PaySelect</h1>
				<ul className="steps">
					<li className="step step-primary uppercase text-sm">Sign in</li>
					<li className="step step-primary uppercase text-sm">Shipping</li>
					<li className="step step-primary uppercase text-sm">Payment</li>
					<li className="step uppercase text-xs">Place order</li>
				</ul>
				<div className="flex flex-col">
					<div className="form-control w-full max-w-xs">
						<label className="label">
							<span className="label-text">Payment Type</span>
						</label>
						<select
							name="paymentType"
							value={myOrder.paymentInfo.paymentType}
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
					<div className="form-control w-full max-w-sm">
						<label className="label">
							<span className="label-text">Card Number</span>
						</label>
						<input
							type="text"
							placeholder=""
							className="input input-sm input-bordered w-full max-w-sm "
							name="cardNumber"
							value={myOrder.paymentInfo.cardNumber}
							onChange={handlePayment}
							required
						/>
					</div>

					<div className="form-control w-full max-w-sm">
						<label className="label">
							<span className="label-text">Name on card</span>
						</label>
						<input
							type="text"
							placeholder=""
							className="input input-sm input-bordered w-full max-w-sm "
							name="cardHolder"
							value={myOrder.paymentInfo.cardHolder}
							onChange={handlePayment}
							required
						/>
					</div>

					<div className="form-control w-full max-w-sm">
						<label className="label">
							<span className="label-text">Expiration date</span>
						</label>
						<div className="flex gap-4">
							<select
								name="expiryDateMonth"
								value={myOrder.paymentInfo.expiryDateMonth}
								onChange={handlePayment}
								className="select select-sm select-bordered"
								required
							>
								<option disabled value="">
									Month
								</option>
								<option value="01">01</option>
								<option value="02">02</option>
								<option value="03">03</option>
								<option value="04">04</option>
								<option value="05">05</option>
								<option value="06">06</option>
								<option value="07">07</option>
								<option value="08">08</option>
								<option value="09">09</option>
								<option value="10">10</option>
								<option value="11">11</option>
								<option value="12">12</option>
							</select>
							/
							<select
								name="expiryDateYear"
								value={myOrder.paymentInfo.expiryDateYear}
								onChange={handlePayment}
								className="select select-sm select-bordered"
								required
							>
								<option disabled value="">
									Year
								</option>
								<option value="22">22</option>
								<option value="23">23</option>
								<option value="24">24</option>
								<option value="25">25</option>
								<option value="26">26</option>
							</select>
						</div>
					</div>

					<div className="form-control w-full max-w-sm">
						<label className="label">
							<span className="label-text">Security code</span>
						</label>
						<input
							type="text"
							placeholder=""
							className="input input-sm input-bordered w-full max-w-sm "
							name="securityCode"
							value={myOrder.paymentInfo.securityCode}
							onChange={handlePayment}
							required
						/>
					</div>
				</div>
				<div>
					<Link to="/checkout/shipping" className="btn btn-primary">
						Return
					</Link>
				</div>
			</div>
			<div></div>
		</div>
	);
}

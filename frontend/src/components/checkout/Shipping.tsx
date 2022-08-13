import React from "react";
import { Link } from "react-router-dom";
import { useOrderContext } from "../../hooks/context/useOrderContext";
import { useCartContext } from "../../hooks/context/useCartContext";
import { useGetCartItems } from "../../hooks/cart/useGetCartItems";

export default function Shipping() {
	const { myOrder, handleShipping } = useOrderContext();
	const { myCart } = useCartContext();
	console.log(myOrder.shippingInfo);

	const numCartItems = myCart.reduce((prev, curr) => prev + curr.quantity, 0);
	const cartSubtotal = myCart.reduce(
		(prev, curr) => prev + curr.price * curr.quantity,
		0
	);

	return (
		<div className="flex">
			<div className="flex flex-col items-center justify-center">
				<h1>Shipping</h1>
				<ul className="steps">
					<li className="step step-primary uppercase text-sm">Sign in</li>
					<li className="step step-primary uppercase text-sm">Payment</li>
					<li className="step uppercase text-sm">Shipping</li>
					<li className="step uppercase text-sm">Place order</li>
				</ul>
				<div className="grid grid-cols-2 gap-x-12 gap-y-2">
					<div className="form-control w-full max-w-sm">
						<label className="label">
							<span className="label-text">First name*</span>
						</label>
						<input
							type="text"
							placeholder=""
							className="input input-sm input-bordered w-full max-w-sm "
							name="firstName"
							value={myOrder.shippingInfo.firstName}
							onChange={handleShipping}
							required
						/>
					</div>
					<div className="form-control w-full max-w-sm">
						<label className="label">
							<span className="label-text">Last name</span>
						</label>
						<input
							type="text"
							placeholder=""
							className="input input-sm input-bordered w-full max-w-sm "
							name="lastName"
							value={myOrder.shippingInfo.lastName}
							onChange={handleShipping}
							required
						/>
					</div>
					<div className="form-control w-full max-w-sm">
						<label className="label">
							<span className="label-text">Address*</span>
						</label>
						<input
							type="text"
							placeholder=""
							className="input input-sm input-bordered w-full max-w-sm "
							name="address"
							value={myOrder.shippingInfo.address}
							onChange={handleShipping}
							required
						/>
					</div>
					<div className="form-control w-full max-w-sm">
						<label className="label">
							<span className="label-text">Apt, suite, etc (optional)</span>
						</label>
						<input
							type="text"
							placeholder=""
							className="input input-sm input-bordered w-full max-w-sm "
							name="aptSuiteEtc"
							value={myOrder.shippingInfo.aptSuiteEtc}
							onChange={handleShipping}
							required
						/>
					</div>
					<div className="form-control w-full max-w-sm">
						<label className="label">
							<span className="label-text">State*</span>
						</label>
						<input
							type="text"
							placeholder=""
							className="input input-sm input-bordered w-full max-w-sm "
							name="state"
							value={myOrder.shippingInfo.state}
							onChange={handleShipping}
							required
						/>
					</div>
					<div className="form-control w-full max-w-sm">
						<label className="label">
							<span className="label-text">City*</span>
						</label>
						<input
							type="text"
							placeholder=""
							className="input input-sm input-bordered w-full max-w-sm "
							name="city"
							value={myOrder.shippingInfo.city}
							onChange={handleShipping}
							required
						/>
					</div>
					<div className="form-control w-full max-w-sm">
						<label className="label">
							<span className="label-text">Postal code*</span>
						</label>
						<input
							type="text"
							placeholder=""
							className="input input-sm input-bordered w-full max-w-sm "
							name="postalCode"
							value={myOrder.shippingInfo.postalCode}
							onChange={handleShipping}
							required
						/>
					</div>
					<div className="form-control w-full max-w-sm">
						<label className="label">
							<span className="label-text">Phone*</span>
						</label>
						<input
							type="text"
							placeholder=""
							className="input input-sm input-bordered w-full max-w-sm "
							name="phone"
							value={myOrder.shippingInfo.phone}
							onChange={handleShipping}
							required
						/>
					</div>
					<div className="form-control w-full max-w-sm">
						<label className="label">
							<span className="label-text">Email*</span>
						</label>
						<input
							type="email"
							placeholder=""
							className="input input-sm input-bordered w-full max-w-sm "
							name="email"
							value={myOrder.shippingInfo.email}
							onChange={handleShipping}
							required
						/>
					</div>
				</div>
				<Link to="/checkout/payselect" className="btn btn-primary">
					Continue
				</Link>
			</div>
			<div className="flex flex-col">
				<p>Subtotal {cartSubtotal}</p>
				<p>Number items {numCartItems}</p>
			</div>
		</div>
	);
}

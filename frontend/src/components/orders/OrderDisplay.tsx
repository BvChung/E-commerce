import React from "react";
import { OrderInfo } from "../../interfaces/orderInterface";

export default function OrderDisplay({
	_id,
	purchasedItems,
	shippingInfo,
	paymentInfo,
}: OrderInfo) {
	return (
		<div className="card w-96 bg-base-100 shadow-xl">
			<figure>
				<img src="https://placeimg.com/400/225/arch" alt="Shoes" />
			</figure>
			<div className="card-body">
				<h2 className="card-title">My order</h2>
				<p>
					{shippingInfo.firstName} {shippingInfo.lastName}
				</p>
				<p>{shippingInfo.address}</p>
				<div className="card-actions justify-end">
					<button
						onClick={() => {
							console.log(_id);
						}}
						className="btn "
					>
						Buy Now
					</button>
				</div>
			</div>
		</div>
	);
}

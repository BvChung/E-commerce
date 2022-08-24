import React from "react";
import { OrderInfo } from "../../interfaces/orderInterface";
import { Link } from "react-router-dom";

export default function OrderDisplay({
	_id,
	createdAt,
	purchasedItems,
	shippingInfo,
	paymentInfo,
}: OrderInfo) {
	console.log(purchasedItems);

	const datePurchased = new Date(createdAt!).toDateString().split(" ");
	// console.log(datePurchased);

	return (
		<div className="border-2 mb-4">
			<div>
				Date purchased: {datePurchased[1]} {datePurchased[2]} {datePurchased[3]}
			</div>
			<div>
				{purchasedItems.map((item) => {
					return (
						<div key={item._id}>
							<Link to={`/products/${item._id}`}>
								<figure>
									<img
										src={item.image}
										alt="product"
										className="h-52 w-52"
									></img>
								</figure>
							</Link>
							<div>{item.name}</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

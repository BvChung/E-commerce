import React from "react";

interface OrdersProps {
	_id: string;
	user: string;
	customerName: string;
	purchasedItems: {
		productId: string;
		name: string;
		quantity: number;
		image: string;
		price: number;
	}[];
	shippingAddress: {
		address: string;
		city: string;
		country: string;
		postalCode: string;
	};
	paymentDetails: {
		paymentType: string;
		cardNumber: string;
		totalCost: number;
		datePurchased: string;
	};
}

export default function Orders({
	_id,
	user,
	customerName,
	purchasedItems,
	shippingAddress,
	paymentDetails,
}: OrdersProps) {
	return (
		<div className="card w-96 bg-base-100 shadow-xl">
			<figure>
				<img src="https://placeimg.com/400/225/arch" alt="Shoes" />
			</figure>
			<div className="card-body">
				<h2 className="card-title">{user}</h2>
				<p>{customerName}</p>
				<p>{shippingAddress.address}</p>
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

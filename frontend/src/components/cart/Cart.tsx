import { useState } from "react";

interface Cart {
	_id: string;
	quantity: number;
}

export default function Cart() {
	const [myCart, setMyCart] = useState<Cart[]>(
		JSON.parse(localStorage.getItem("cart")! || "[]")
	);
	console.log(myCart);

	return (
		<div className="flex flex-col gap-2">
			<h1 className="card-title">Cart</h1>
			{myCart.map((item: Cart) => {
				return (
					<div key={item._id}>
						<div>{item._id}</div>
						<div>{item.quantity}</div>
					</div>
				);
			})}
			<button className="btn btn-error">Checkout</button>
			<button
				onClick={() => {
					localStorage.removeItem("cart");
					setMyCart([]);
				}}
				className="btn btn-error"
			>
				Clear
			</button>
		</div>
	);
}

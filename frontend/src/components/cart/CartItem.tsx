import { useEffect, useState } from "react";
import { CartItemInfo } from "../../interfaces/cartInterface";
import { useCartContext } from "../../hooks/context/useCartContext";

export default function CartItem({
	_id,
	name,
	category,
	image,
	price,
	quantity,
}: CartItemInfo) {
	const { updateItemQuantity, removeCartItem } = useCartContext();

	const [itemQuantity, setItemQuantity] = useState(quantity);

	useEffect(() => {
		updateItemQuantity({ _id, price, quantity: itemQuantity });
	}, [itemQuantity]);

	return (
		<div className="flex flex-col transition-all fade">
			<div>
				<figure>
					<img src={image} alt="Product"></img>
				</figure>
			</div>
			<div>
				<p>{category}</p>
				<p>{name}</p>
				<p>{price}</p>
				<p>{quantity}</p>
				<div className="form-control w-fit max-w-xs">
					<label className="label">
						<span className="label-text">Quantity</span>
					</label>
					<select
						name="itemQuantity"
						value={itemQuantity}
						onChange={(e) => setItemQuantity(+e.target.value)}
						className="select select-bordered"
						required
					>
						{/* <option disabled value="">
						{itemQuantity}
					</option> */}
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
						<option value="5">5</option>
						<option value="6">6</option>
						<option value="7">7</option>
						<option value="8">8</option>
						<option value="9">9</option>
					</select>
				</div>
				<button
					onClick={() => {
						removeCartItem({ _id, price, quantity });
					}}
					className="btn btn-accent"
				>
					Remove Item
				</button>
			</div>
		</div>
	);
}

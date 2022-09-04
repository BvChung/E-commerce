import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartItemInfo } from "../../interfaces/cartInterface";
import { useCartContext } from "../../hooks/context/useCartContext";

export default function CartItem({
	_id,
	name,
	category,
	image,
	price,
}: CartItemInfo) {
	const { updateCartQuantity, removeCartItem, findCartItem } = useCartContext();
	const foundItem = findCartItem(_id);

	const [itemQuantity, setItemQuantity] = useState(foundItem?.quantity);

	useEffect(() => {
		updateCartQuantity({ _id, quantity: itemQuantity! });
	}, [itemQuantity]);

	return (
		<div className="flex items-center w-full h-44 border-b-[1px] last:border-b-0">
			<Link to={`/products/${_id}`}>
				<figure>
					<img src={image} alt="Product" className=" h-32 w-32"></img>
				</figure>
			</Link>

			<div className="flex flex-col flex-1 justify-center h-full px-6 py-4">
				<div className="flex items-center justify-between h-3/4">
					<p className="font-medium text-md">{name}</p>
					<p className="font-semibold text-lg">
						${(foundItem?.price! * foundItem?.quantity!).toFixed(2)}
					</p>
				</div>
				<div className="flex justify-end items-center h-1/4 gap-4">
					<button
						onClick={() => {
							removeCartItem(_id);
						}}
						className="btn btn-primary btn-outline h-10"
					>
						Remove Item
					</button>

					<div className="form-control w-fit ">
						{/* <label className="label">
							<span className="label-text">Quantity</span>
						</label> */}
						<select
							name="itemQuantity"
							value={itemQuantity}
							onChange={(e) => setItemQuantity(+e.target.value)}
							className="select select-bordered min-h-0 h-10"
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
				</div>
			</div>
		</div>
	);
}

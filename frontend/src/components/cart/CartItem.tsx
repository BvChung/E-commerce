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
					<img
						src={image}
						alt="Product"
						className="h-28 w-28 md:h-32 md:w-32"
					></img>
				</figure>
			</Link>

			<div className="flex flex-col flex-1 justify-center h-full px-2 md:px-6 py-4">
				<div className="flex flex-col md:flex-row items-end md:items-center justify-center md:justify-between h-3/4">
					<Link to={`/products/${_id}`}>
						<span className="hover:text-gray-600 font-medium text-base">
							{name}
						</span>
					</Link>
					<p className="font-semibold text-base md:text-lg">
						${(foundItem?.price! * foundItem?.quantity!).toFixed(2)}
					</p>
				</div>
				<div className="flex justify-end items-center h-1/4 gap-2 md:gap-4">
					<button
						onClick={() => {
							removeCartItem(_id);
						}}
						className="btn btn-accent rounded-full px-5 btn-outline h-8 md:h-10"
					>
						<span className="text-xs md:text-sm">Remove</span>
					</button>

					<div className="relative form-control w-fit">
						<label className="hidden absolute md:inline-block label bottom-9">
							<span className="label-text font-medium">Quantity</span>
						</label>
						<select
							name="itemQuantity"
							value={itemQuantity}
							onChange={(e) => setItemQuantity(+e.target.value)}
							className="select select-bordered text-xs md:text-sm min-h-0 h-8 md:h-10"
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

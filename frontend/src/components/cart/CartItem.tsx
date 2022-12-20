import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartItemInfo } from "../../interfaces/cartInterface";
import { useCartContext } from "../../hooks/context/useCartContext";
import { cldConfig } from "../../config/cloudinaryConfig";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { AdvancedImage, lazyload } from "@cloudinary/react";

export default function CartItem({ _id, name, imageCloudId }: CartItemInfo) {
	const { updateCartQuantity, removeCartItem, findCartItem } = useCartContext();
	const foundItem = findCartItem(_id);

	const [itemQuantity, setItemQuantity] = useState(foundItem?.quantity);

	const productImg = cldConfig
		.image(imageCloudId)
		.format("auto")
		.quality("auto")
		.resize(thumbnail().width(250).height(250));

	useEffect(() => {
		updateCartQuantity({ _id, quantity: itemQuantity! });
	}, [itemQuantity]);

	return (
		<div className="flex items-center w-full h-44 py-6 border-b border-gray-300 last:border-b-0">
			<Link to={`/products/${_id}`}>
				<AdvancedImage
					cldImg={productImg}
					plugins={[lazyload()]}
					className="rounded-md h-32 w-32 object-cover"
					alt="Product"
				/>
			</Link>

			<div className="flex flex-col flex-1 justify-center h-full px-2 md:px-6">
				<div className="flex flex-col gap-2 sm:gap-0 md:flex-row items-end md:items-center justify-center md:justify-between h-3/4">
					<Link to={`/products/${_id}`}>
						<span className="hover:link font-medium text-sm md:text-base">
							{name}
						</span>
					</Link>
					<p className="font-bold text-sm md:text-base">
						${(foundItem?.price! * foundItem?.quantity!).toFixed(2)}
					</p>
				</div>

				<div className="flex justify-end items-center h-1/4 gap-2 md:gap-5">
					<button
						onClick={() => {
							removeCartItem(_id);
						}}
						className="hover:link"
					>
						<span className="text-xs">Remove</span>
					</button>

					<div className="relative form-control w-fit">
						<label className="hidden absolute md:inline-block label bottom-7">
							<span className="label-text text-xs font-medium">Quantity</span>
						</label>
						<select
							name="itemQuantity"
							value={itemQuantity}
							onChange={(e) => setItemQuantity(+e.target.value)}
							className="select rounded-lg select-bordered text-xs md:text-sm min-h-0 h-8 md:h-9"
							required
						>
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

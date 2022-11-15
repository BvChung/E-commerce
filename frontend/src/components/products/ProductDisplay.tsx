import { Link } from "react-router-dom";
import { ProductInfo } from "../../interfaces/productInterface";
import { toast } from "react-toastify";
import { useCartContext } from "../../hooks/context/useCartContext";

export default function ProductDisplay({
	_id,
	name,
	price,
	category,
	image,
}: ProductInfo) {
	const { addCartItem, findCartItem } = useCartContext();
	const foundItem = findCartItem(_id);

	return (
		<div className="w-full fade transition-all">
			<Link
				to={_id}
				className="card w-[20rem] rounded-md h-fit bg-base-100 border-[1px] shadow-sm"
			>
				<div className="overflow-hidden">
					<img
						src={image}
						alt="Product"
						className="h-[250px] w-full relative object-cover hover:scale-105 transition-transform duration-500"
						loading="lazy"
					/>
				</div>

				<div className="card-body p-6">
					<div className="card-actions">
						<div className="badge badge-sm badge-outline">{category}</div>
					</div>
					<h2 className="font-medium text-lg">{name}</h2>
					<span className="font-semibold text-lg">${price.toFixed(2)}</span>
				</div>
			</Link>
		</div>
	);
}

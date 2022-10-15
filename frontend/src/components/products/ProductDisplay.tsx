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
			<div className="card w-[20rem] rounded-md h-fit bg-base-100 border-[1px] shadow-sm">
				<Link to={_id}>
					<figure>
						<img
							src={image}
							alt="Product"
							className="h-[250px] w-full relative object-cover hover:scale-105 transition-transform duration-500"
						/>
					</figure>
				</Link>
				{/* {foundItem?.quantity !== 9 ? (
					<button
						onClick={() => {
							addCartItem({ _id, price, quantity: 1 });
							toast.success(`${name} has been added to your cart.`);
						}}
						className="flex items-center justify-center btn rounded-none w-fit h-10 absolute top-[13.1rem] right-0 z-10"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-6 h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M12 6v12m6-6H6"
							/>
						</svg>
						<span>Add</span>
					</button>
				) : (
					<button className="btn btn-md btn-primary btn-disabled text-gray-100 bg-gray-800 bg-opacity-60 rounded-none w-fit h-10 absolute top-[13.1rem] right-0 z-50">
						{foundItem?.quantity} items max
					</button>
				)} */}
				<Link to={_id} className="card-body p-6">
					<div className="card-actions">
						<div className="badge badge-sm badge-outline">{category}</div>
					</div>
					<h2 className="font-medium text-lg">{name}</h2>
					<span className="font-semibold text-lg">${price.toFixed(2)}</span>
				</Link>
			</div>
		</div>
	);
}

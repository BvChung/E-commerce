import { Link } from "react-router-dom";
import { ProductInfo } from "../../interfaces/productInterface";
import { toast } from "react-toastify";
import { useCartContext } from "../../hooks/context/useCartContext";

export default function ProductDisplayItem({
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
			<div className="card w-[20rem] h-fit bg-base-100 border-[1px] shadow-sm hover:shadow-md transition-shadow">
				<Link to={_id}>
					<figure>
						<img
							src={image}
							alt="Product"
							className="h-[250px] w-full relative"
						/>
					</figure>
				</Link>
				{foundItem?.quantity !== 9 ? (
					<button
						onClick={() => {
							addCartItem({ _id, price, quantity: 1 });
							toast.success(`${name} has been added to your cart.`);
						}}
						className="flex items-center justify-center btn rounded-full w-fit h-10 absolute top-[13.1rem] right-0 z-10"
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
						Add
					</button>
				) : (
					<button className="btn btn-md btn-primary btn-disabled text-gray-100 bg-gray-800 bg-opacity-60 rounded-full w-fit h-10 absolute top-[13.1rem] right-0 z-50">
						{foundItem?.quantity} items max
					</button>
				)}
				<Link to={_id} className="card-body p-6">
					<div className="card-actions">
						<div className="badge badge-outline">{category}</div>
					</div>
					<h2 className="card-title">{name}</h2>
					<div className="stat-value text-xl">${price.toFixed(2)}</div>
				</Link>
			</div>
		</div>
	);
}

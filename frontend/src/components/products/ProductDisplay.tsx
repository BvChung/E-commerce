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
		<div className="grid items-center justify-center">
			<div className="card w-[22rem] bg-base-100 border-[1px] shadow-sm hover:shadow-lg transition-shadow">
				<Link to={_id}>
					<figure>
						<img src={image} alt="Product" className="h-[255px] w-[22rem] " />
					</figure>
				</Link>
				<div className="card-body justify-evenly">
					<div className="card-actions">
						<div className="badge badge-outline">{category}</div>
					</div>
					<h2 className="card-title">
						{name}
						<div className="badge badge-secondary">NEW</div>
					</h2>
					<div className="stat-value text-xl">${price}</div>
					{foundItem?.quantity !== 9 ? (
						<button
							onClick={() => {
								addCartItem({ _id, price, quantity: 1 });
								toast.success(`${name} has been added to your cart.`);
							}}
							className="btn btn-md rounded-lg btn-primary"
						>
							Add to cart
						</button>
					) : (
						<button className="btn btn-md rounded-lg btn-primary btn-disabled">
							{foundItem?.quantity} items max
						</button>
					)}
				</div>
			</div>
		</div>
	);
}

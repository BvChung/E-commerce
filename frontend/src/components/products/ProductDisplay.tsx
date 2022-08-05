import { Link } from "react-router-dom";
import { ProductDetails } from "../../interfaces/productInterface";
import { addCart } from "../../hooks/cart/useAddItem";
import { toast } from "react-toastify";

export default function ProductDisplay({
	_id,
	name,
	description,
	price,
	category,
	image,
}: ProductDetails) {
	return (
		<div className="grid items-center justify-center">
			<div className="card w-96 bg-base-100 border-[1px] shadow-sm hover:shadow-xl transition-shadow">
				<Link to={_id}>
					<figure>
						<img src={image} alt="Product" className="h-[255px] w-96 " />
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
					<button
						onClick={() => {
							// console.log(_id);
							toast.success(`${name} has been added to your cart.`);
							addCart({ _id, quantity: 1 });
						}}
						className="btn btn-md btn-primary"
					>
						Add to cart
					</button>
				</div>
			</div>
		</div>
	);
}

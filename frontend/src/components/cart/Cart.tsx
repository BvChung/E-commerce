import { useCartContext } from "../../hooks/context/useCartContext";
import { CartInfo } from "../../interfaces/cartInterface";
import { useGetCartItems } from "../../hooks/cart/useGetCartItems";

export default function Cart() {
	const { myCart, clearMyCart } = useCartContext();
	const { data: displayMyCart, isSuccess } = useGetCartItems(myCart);
	// console.log(displayMyCart);

	return (
		<div className="flex flex-col gap-2">
			<h1 className="card-title">Cart</h1>
			{isSuccess &&
				displayMyCart.map((item: CartInfo) => {
					return (
						<div className="grid grid-cols-2" key={item._id}>
							<div>
								<figure>
									<img src={item.image} alt="Product"></img>
								</figure>
							</div>
							<div>
								<p>{item.category}</p>
								<p>{item.name}</p>
								<p>{item.quantity}</p>
								<p>Total Cost: {item.price * item.quantity}</p>
							</div>
							<div className="form-control w-fit max-w-xs">
								<label className="label">
									<span className="label-text">Quantity</span>
								</label>
								<select
									name="category"
									// value={productFormData.category}
									// onChange={handleChange}
									className="select select-bordered"
									required
								>
									<option disabled value="">
										Assign quantity
									</option>
									<option value="1">1</option>
									<option value="2">2</option>
									<option value="3">3</option>
									<option value="4">4</option>
									<option value="5">5</option>
									<option value="6">6</option>
								</select>
							</div>
						</div>
					);
				})}
			<button className="btn btn-error">Checkout</button>
			<button onClick={clearMyCart} className="btn btn-error">
				Clear
			</button>
		</div>
	);
}

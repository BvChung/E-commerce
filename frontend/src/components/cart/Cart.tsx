import { useCartContext } from "../../hooks/context/useCartContext";
import { CartInfo } from "../../interfaces/cartInterface";
import { useGetCartItems } from "../../hooks/cart/useGetCartItems";
import CartItem from "./CartItem";

export default function Cart() {
	const { myCart, clearMyCart } = useCartContext();
	const {
		data: displayMyCart,
		isSuccess,
		isLoading,
		isFetching,
	} = useGetCartItems(myCart);
	// console.log(displayMyCart);

	const numCartItems = myCart.reduce((prev, curr) => prev + curr.quantity, 0);
	const cartSubtotal = displayMyCart?.reduce(
		(prev, curr) => prev + curr.price * curr.quantity,
		0
	);
	return (
		<div className="grid grid-cols-2 gap-2">
			{isFetching && <div className="stat-title">Loading...</div>}
			<div>
				{isSuccess &&
					displayMyCart.map((item: CartInfo) => {
						return (
							<CartItem
								key={item._id}
								_id={item._id}
								name={item.name}
								category={item.category}
								description={item.description}
								image={item.image}
								imageCloudId={item.imageCloudId}
								price={item.price}
								quantity={item.quantity}
							/>
						);
					})}
			</div>
			<div className="stats shadow flex flex-col items-center justify-center gap-2">
				<div className="stat flex flex-col items-center justify-center">
					<div className="stat-title">Subtotal ({numCartItems} items)</div>
					<div className="stat-value">${cartSubtotal}</div>
				</div>
				<button className="btn btn-error">Checkout</button>
				<button onClick={clearMyCart} className="btn btn-error">
					Clear
				</button>
			</div>
		</div>
	);
}

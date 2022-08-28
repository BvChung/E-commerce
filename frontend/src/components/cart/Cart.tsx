import { Link } from "react-router-dom";
import { useCartContext } from "../../hooks/context/useCartContext";
import { CartItemInfo } from "../../interfaces/cartInterface";
import { useGetCartItems } from "../../hooks/cart/useGetCartItems";
import CartItem from "./CartItem";

export default function Cart() {
	const { myCart, clearMyCart, cartItemsInfo } = useCartContext();
	const {
		data: displayCartItems,
		isSuccess,
		isLoading,
		isFetching,
	} = useGetCartItems(myCart);
	console.log(displayCartItems);

	return (
		<div className="grid grid-cols-2 gap-2">
			<div className="transition-all fade ">
				{isSuccess ? (
					displayCartItems.map((item: CartItemInfo) => {
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
							/>
						);
					})
				) : (
					<div className="border border-blue-300 shadow rounded-md p-4 max-w-md w-full mx-auto">
						<div className="animate-pulse flex space-x-4 h-full w-full">
							<div className="rounded-md bg-slate-700 h-full w-24"></div>
							<div className="flex-1 space-y-6 py-1">
								<div className="h-2 bg-slate-700 rounded"></div>
								<div className="space-y-3">
									<div className="grid grid-cols-3 gap-4">
										<div className="h-2 bg-slate-700 rounded col-span-2"></div>
										<div className="h-2 bg-slate-700 rounded col-span-1"></div>
									</div>
									<div className="grid grid-cols-3 gap-4">
										<div className="h-2 bg-slate-700 rounded col-span-2"></div>
										<div className="h-2 bg-slate-700 rounded col-span-1"></div>
									</div>
									<div className="h-2 bg-slate-700 rounded"></div>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>

			<div className="stats shadow flex flex-col items-center justify-center gap-2">
				<div className="stat flex flex-col items-center justify-center">
					<div className="stat-title">
						Subtotal ({cartItemsInfo.numItems} items)
					</div>
					<div className="stat-value">${cartItemsInfo.subTotal}</div>
				</div>
				<Link
					className={`btn ${
						cartItemsInfo.numItems === 0 ? "btn-disabled" : "btn-error"
					}`}
					to={"/checkout/shipping"}
				>
					Proceed to checkout
				</Link>
				<button onClick={clearMyCart} className="btn btn-error">
					Clear
				</button>
			</div>
		</div>
	);
}

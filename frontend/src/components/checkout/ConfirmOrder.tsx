import { Link, useNavigate } from "react-router-dom";
import { useOrderContext } from "../../hooks/context/useOrderContext";
import { useCartContext } from "../../hooks/context/useCartContext";
import { OrderInfo } from "../../interfaces/orderInterface";
import { useGetCartItems } from "../../hooks/cart/useGetCartItems";
import { useCreateOrder } from "../../hooks/orders/useCreateOrder";

export default function ConfirmOrder() {
	const { myOrder, setMyOrder, clearMyOrder } = useOrderContext();
	const { myCart, cartItemsInfo, clearMyCart } = useCartContext();
	const { mutate } = useCreateOrder();
	const navigate = useNavigate();
	const {
		data: displayCartItems,
		isSuccess,
		isLoading,
		isFetching,
	} = useGetCartItems(myCart);

	return (
		<div className="flex flex-col">
			<h1>ConfirmOrder</h1>

			<ul className="steps">
				<li className="step step-primary uppercase text-sm">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={2}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
						/>
					</svg>
					Sign in
				</li>
				<li className="step step-primary uppercase text-sm">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={2}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
						/>
					</svg>
					Shipping
				</li>
				<li className="step step-primary uppercase text-sm">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={2}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
						/>
					</svg>
					Payment
				</li>
				<li className="step step-primary uppercase text-sm">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={2}
					>
						<path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
						/>
					</svg>
					Place order
				</li>
			</ul>
			<div>
				<button
					onClick={() => {
						mutate({
							...myOrder,
							purchasedItems: displayCartItems!,
							paymentInfo: {
								...myOrder.paymentInfo,
								subTotal: cartItemsInfo.subTotal,
							},
						});

						clearMyCart();
						clearMyOrder();
						navigate("/");
					}}
					className="btn btn-primary"
				>
					Place order
				</button>
			</div>
			<div>
				<Link to="/checkout/payment" className="btn btn-primary">
					Return
				</Link>
			</div>
		</div>
	);
}

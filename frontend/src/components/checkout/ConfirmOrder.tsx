import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useOrderContext } from "../../hooks/context/useOrderContext";
import { useCartContext } from "../../hooks/context/useCartContext";
import { OrderInfo } from "../../interfaces/orderInterface";
import { useGetCartItems } from "../../hooks/cart/useGetCartItems";
import { useCreateOrder } from "../../hooks/orders/useCreateOrder";
import { toast } from "react-toastify";
import CartItem from "../cart/CartItem";

export default function ConfirmOrder() {
	const { myOrder, setMyOrder, clearMyOrder } = useOrderContext();
	const { myCart, cartItemsInfo, clearMyCart } = useCartContext();
	const { mutate } = useCreateOrder(myCart);
	const navigate = useNavigate();
	const {
		data: displayCartItems,
		isSuccess,
		isLoading,
		isFetching,
	} = useGetCartItems(myCart);

	console.log(myOrder);

	useEffect(() => {
		if (!myOrder.completedPaymentForm || !myOrder.completedShippingForm) {
			navigate("/cart");
			clearMyOrder();
			toast.error("Invalid credentials");
		}
	}, []);

	const taxAmount = (cartItemsInfo.subTotal * 0.0625).toFixed(2);
	const grandTotal = (cartItemsInfo.subTotal + +taxAmount).toFixed(2);

	return (
		<div className="flex flex-col items-center justify-center mb-10">
			<div className="flex flex-col gap-2 w-full mt-8 mb-4 lg:max-w-5xl xl:max-w-6xl">
				<span className="font-semibold text-2xl">Payment</span>
				<div className="text-sm breadcrumbs">
					<ul>
						<li>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-4 h-4 mr-2 stroke-current"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
								/>
							</svg>
							Sign in
						</li>
						<li>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-4 h-4 mr-2 stroke-current"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
								/>
							</svg>
							Shipping
						</li>
						<li>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-4 h-4 mr-2 stroke-current"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
								/>
							</svg>
							Payment
						</li>
						<li>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-4 h-4 mr-2 stroke-blue-400"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
								/>
							</svg>

							<span className="text-blue-400 font-semibold">Review order</span>
						</li>
					</ul>
				</div>
				<div className="flex justify-center h-max w-full gap-4 lg:max-w-5xl xl:max-w-7xl">
					<div className="flex flex-col border-[1px] p-4 h-max rounded-lg shadow-md transition-all fade w-2/3">
						<div className="flex items-center ">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-12 h-12 stroke-green-600"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>

							<div className="flex items-center gap-2">
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
										d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
									/>
								</svg>
								<span className="font-semibold text-lg">Shipping</span>
							</div>
						</div>

						<div className="flex items-center ">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-12 h-12 stroke-green-600"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
							<div className="flex items-center gap-2">
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
										d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
									/>
								</svg>

								<span className="font-semibold text-lg">Sending to</span>
							</div>
						</div>

						<div className="flex items-center">
							<div className="flex mr-4">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-12 h-12 stroke-green-600"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								<div className="flex items-center gap-2">
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
											d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
										/>
									</svg>

									<span className="font-semibold text-lg">Paying with</span>
								</div>
							</div>
							<div className="flex flex-col">
								<div className="flex">
									<span className="text-gray-500 font-medium">Card number</span>
									<span className="font-semibold">
										Ending in{" "}
										{myOrder.paymentInfo.cardNumber.slice(
											myOrder.paymentInfo.cardNumber.length - 4,
											myOrder.paymentInfo.cardNumber.length
										)}
									</span>
								</div>
								<div>
									<span className="text-gray-500 font-medium">
										Name on card
									</span>
									<span className="font-semibold">
										{myOrder.paymentInfo.cardNumber.slice(
											myOrder.paymentInfo.cardNumber.length - 4,
											myOrder.paymentInfo.cardNumber.length
										)}
									</span>
								</div>
								<div>
									<span className="text-gray-500 font-medium">Expiration</span>
									<span className="font-semibold">
										{myOrder.paymentInfo.cardNumber.slice(
											myOrder.paymentInfo.cardNumber.length - 4,
											myOrder.paymentInfo.cardNumber.length
										)}
									</span>
								</div>
							</div>
						</div>
					</div>

					<div className="rounded-lg shadow-sm h-fit w-1/3 border-[1px] py-6 px-4 flex flex-col items-center">
						<div className="w-full flex items-center justify-between mb-6">
							<div>
								<span className="font-semibold mr-2 ">Subtotal</span>
								<span className="text-gray-700">
									({cartItemsInfo.numItems} items)
								</span>
							</div>
							<div className="text-gray-700">${cartItemsInfo.subTotal}</div>
						</div>

						<div className="w-full flex items-center justify-between mb-6">
							<div>
								<span className="font-semibold mr-2 ">Shipping</span>
							</div>
							<div className="text-gray-700">Free</div>
						</div>

						<div className="w-full flex items-center justify-between border-b-[1px] pb-6 mb-6">
							<div className="font-semibold ">Taxes</div>
							<div className="text-gray-700">${taxAmount}</div>
						</div>

						<div className="w-full flex items-center justify-between">
							<div className="font-semibold ">Grand Total</div>
							<div className="text-lg font-semibold">${grandTotal}</div>
						</div>
					</div>
				</div>
			</div>

			<div className="h-fit w-full border-[1px] rounded-lg shadow-lg lg:max-w-4xl xl:max-w-5xl px-4">
				{isSuccess &&
					displayCartItems.map((item) => {
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
					})}
			</div>

			<div>
				<button
					onClick={() => {
						mutate({
							...myOrder,
							purchasedItems: displayCartItems!
								.sort((a, b) => {
									if (a._id < b._id) {
										return -1;
									}
									if (a._id > b._id) {
										return 1;
									}
									// names must be equal
									return 0;
								})
								.map((product, i: number) => {
									if (product._id === myCart[i]._id) {
										return {
											...product,
											quantity: myCart[i].quantity,
										};
									} else {
										return { ...product };
									}
								}),
							paymentInfo: {
								...myOrder.paymentInfo,
								subTotal: +grandTotal,
							},
						});
					}}
					className="btn btn-primary"
				>
					Place order
				</button>
			</div>
			<div>
				<Link
					to="/checkout/payment"
					className="btn btn-accent btn-outline rounded-lg"
				>
					Return
				</Link>
			</div>
		</div>
	);
}

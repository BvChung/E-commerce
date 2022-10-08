import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useGetOrderInfo } from "../../hooks/orders/useGetOrderInfo";
import { useCartContext } from "../../hooks/context/useCartContext";
import { toast } from "react-toastify";

export default function OrderInfo() {
	const params = useParams();
	const { addCartItem, findCartItem } = useCartContext();
	const { data: orderInfo } = useGetOrderInfo(params.id);
	const datePurchased = new Date(orderInfo?.createdAt!)
		.toDateString()
		.split(" ");

	return (
		<div className="flex flex-col gap-[2px] items-center justify-center mb-10 px-2">
			<div className="flex items-center gap-2 w-full mt-8 mb-6 lg:max-w-4xl xl:max-w-5xl">
				<Link to={"/orders"} className="mr-2 cursor-pointer">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-5 h-5 md:w-6 md:h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
						/>
					</svg>
				</Link>
				<span className="font-semibold text-xl sm:text-2xl">Order Details</span>
			</div>

			<div className="lg:max-w-4xl xl:max-w-5xl w-full mb-4">
				<p className="font-semibold text-md mb-1">Order #{orderInfo?._id}</p>
				<div className="flex w-full justify-start gap-14">
					<div className="flex flex-col justify-center">
						<div className="text-gray-500 font-medium gap-2 flex items-center mb-1">
							Order Placed
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-5 h-5"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
								/>
							</svg>
						</div>
						<p className="text-lg font-semibold">
							{datePurchased[1]} {datePurchased[2]}, {datePurchased[3]}
						</p>
					</div>
					<div className="flex flex-col justify-center">
						<div className="text-gray-500  font-medium gap-2 flex items-center mb-1">
							Delivered
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-5 h-5"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
								/>
							</svg>
						</div>
						<p className="text-lg font-semibold text-emerald-600">
							{datePurchased[1]} {datePurchased[2]}, {datePurchased[3]}
						</p>
					</div>
				</div>
			</div>

			<div className="flex flex-1 flex-col md:flex-row justify-between w-full gap-4 lg:max-w-4xl xl:max-w-5xl border-[1px] px-4 py-6 mb-8 rounded-lg shadow-sm">
				<div className="flex flex-col gap-[2px] justify-end border-b-[1px] border-gray-900 pb-6 mb-2 md:pb-0 md:border-0 md:mb-0 md:basis-60">
					<p className="font-semibold text-lg mb-2 pb-1 border-b-[1px]">
						Order Summary
					</p>
					<div className="flex justify-between">
						<p>
							Subtotal ({orderInfo?.purchasedItems.length} item
							{orderInfo?.purchasedItems.length! > 1 && "s"})
						</p>
						<p>${orderInfo?.paymentInfo.subTotal}</p>
					</div>
					<div className="flex justify-between">
						<p>Delivery</p>
						<p>Free</p>
					</div>
					<div className="flex justify-between mb-2 pb-1 border-b-[1px]">
						<p>Tax</p>
						<p>${(orderInfo?.paymentInfo.subTotal! * 0.0625).toFixed(2)}</p>
					</div>
					<div className="flex justify-between">
						<p className="text-lg">Total</p>
						<p className="font-semibold text-lg">
							$
							{(
								orderInfo?.paymentInfo.subTotal! +
								orderInfo?.paymentInfo.subTotal! * 0.0625
							).toFixed(2)}
						</p>
					</div>
				</div>

				<div className="flex flex-col gap-[2px] border-b-[1px] border-gray-900 pb-6 mb-2 md:pb-0 md:border-0 md:mb-0 md:basis-60">
					<p className="font-semibold text-lg mb-2 pb-1 border-b-[1px]">
						Payment Method
					</p>
					<div>
						{/* {"*".repeat(orderInfo?.paymentInfo.cardNumber.length! - 4)} */}
						<span className="font-medium">
							Card ending in{" "}
							{orderInfo?.paymentInfo.cardNumber.substring(
								orderInfo?.paymentInfo.cardNumber.length - 4,
								orderInfo?.paymentInfo.cardNumber.length
							)}
						</span>
					</div>
				</div>

				<div className="flex flex-col md:basis-60">
					<p className="font-semibold text-lg mb-2 pb-1 border-b-[1px]">
						Delivery Address
					</p>
					<p>
						{orderInfo?.shippingInfo.firstName}{" "}
						{orderInfo?.shippingInfo.lastName}
					</p>
					<p>{orderInfo?.shippingInfo.address}</p>
					<p>
						{orderInfo?.shippingInfo.city}, {orderInfo?.shippingInfo.state}{" "}
						{orderInfo?.shippingInfo.zipCode}
					</p>
				</div>
			</div>

			<div className="h-fit w-full border-[1px] rounded-lg shadow-sm lg:max-w-4xl xl:max-w-5xl px-4">
				{orderInfo?.purchasedItems.map((item) => {
					return (
						<div
							key={item._id}
							className="flex py-4 border-b-[1px] last:mb-0 last:border-b-0"
						>
							<Link to={`/products/${item._id}`} className="flex items-center">
								<figure>
									<img
										src={item.image}
										alt="product"
										className="h-32 w-32"
									></img>
								</figure>
							</Link>

							<div className="flex flex-1 flex-col md:flex-row justify-between">
								<div className="flex flex-col justify-center md:basis-72 px-6">
									<div className="flex items-center justify-between w-full mb-3">
										<Link
											to={`/products/${item._id}`}
											className="hover:text-gray-600 hover:link font-semibold "
										>
											{item.name}
										</Link>
									</div>
									<div className="flex items-center">
										<button
											onClick={() => {
												addCartItem({
													_id: item._id,
													price: item.price,
													quantity: 1,
												});

												toast.success(
													`${item.name} has been added to your cart.`
												);
											}}
											className={`btn ${
												findCartItem(item._id)?.quantity! < 9
													? "btn-outline"
													: "btn-disabled"
											} hidden md:flex items-center gap-2 btn btn-outline rounded-full px-5 h-8 md:h-10`}
										>
											{findCartItem(item._id)?.quantity! < 9 && (
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth={1.5}
													stroke="currentColor"
													className="w-4 h-4"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
													/>
												</svg>
											)}
											<span className="text-xs">
												{findCartItem(item._id)?.quantity! < 9
													? "Buy again"
													: "9 items max"}
											</span>
										</button>
									</div>
								</div>
								<div className="flex flex-col px-6 gap-[2px] md:basis-72 justify-center">
									<div className="flex justify-between">
										<p>Price</p>
										<p className="font-medium">${item.price.toFixed(2)}</p>
									</div>
									<div className="flex justify-between mb-2 pb-1 border-b-[1px]">
										<p>Quantity</p>
										<p className="font-medium">{item.quantity}</p>
									</div>
									<div className="flex items-center justify-between">
										<p className="text-lg">Total</p>
										<p className="font-semibold text-base md:text-lg">
											${(item.quantity! * item.price).toFixed(2)}
										</p>
									</div>

									<div className="flex items-center w-full justify-center mt-4">
										<button
											onClick={() => {
												addCartItem({
													_id: item._id,
													price: item.price,
													quantity: 1,
												});

												toast.success(
													`${item.name} has been added to your cart.`
												);
											}}
											className={`btn ${
												findCartItem(item._id)?.quantity! < 9
													? "btn-outline"
													: "btn-disabled"
											} flex md:hidden items-center gap-2 w-full btn btn-outline rounded-full px-5 h-8 md:h-10`}
										>
											{findCartItem(item._id)?.quantity! < 9 && (
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth={1.5}
													stroke="currentColor"
													className="w-4 h-4"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
													/>
												</svg>
											)}
											<span className="text-xs">
												{findCartItem(item._id)?.quantity! < 9
													? "Buy again"
													: "9 items max"}
											</span>
										</button>
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

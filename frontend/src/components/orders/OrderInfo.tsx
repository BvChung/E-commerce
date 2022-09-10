import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useGetOrderInfo } from "../../hooks/orders/useGetOrderInfo";
import { useCartContext } from "../../hooks/context/useCartContext";
import { toast } from "react-toastify";

export default function OrderInfo() {
	const params = useParams();
	const { addCartItem, findCartItem } = useCartContext();
	const { data: orderInfo, isSuccess } = useGetOrderInfo(params.id);

	return (
		<div className="flex flex-col gap-[2px] items-center justify-center mb-10">
			<div className="flex items-center gap-2 w-full mt-8 mb-6 lg:max-w-4xl xl:max-w-5xl">
				<span className="font-semibold text-2xl">Order Details</span>
			</div>

			<div className="flex flex-1 justify-between w-full gap-4 lg:max-w-4xl xl:max-w-5xl border-[1px] py-4 px-4 mb-8 rounded-lg shadow-md">
				<div className="flex flex-col basis-60">
					<p className="font-semibold mb-2">Shipping Address</p>
					<p>
						{orderInfo?.shippingInfo.firstName}{" "}
						{orderInfo?.shippingInfo.lastName}
					</p>
					<p>{orderInfo?.shippingInfo.address}</p>
					<p>
						{orderInfo?.shippingInfo.city}, {orderInfo?.shippingInfo.state}{" "}
						{orderInfo?.shippingInfo.zipCode}
					</p>
					<p>United States</p>
				</div>

				<div className="flex flex-col gap-[2px] basis-60">
					<p className="font-semibold mb-2">Payment Method</p>
					<p>
						{"*".repeat(orderInfo?.paymentInfo.cardNumber.length! - 4)}
						{orderInfo?.paymentInfo.cardNumber.substring(
							orderInfo?.paymentInfo.cardNumber.length - 4,
							orderInfo?.paymentInfo.cardNumber.length
						)}
					</p>
				</div>

				<div className="flex flex-col gap-[2px] justify-end basis-60">
					<p className="font-semibold mb-2">Order Summary</p>
					<div className="flex justify-between">
						<p>Item(s) Subtotal:</p>
						<p className="font-medium">${orderInfo?.paymentInfo.subTotal}</p>
					</div>
					<div className="flex justify-between">
						<p>Shipping:</p>
						<p className="font-medium">Free</p>
					</div>
					<div className="flex justify-between">
						<p>Tax:</p>
						<p className="font-medium">
							${(orderInfo?.paymentInfo.subTotal! * 0.0625).toFixed(2)}
						</p>
					</div>
					<div className="flex justify-between">
						<p>Grand Total:</p>
						<p className="font-medium">
							$
							{(
								orderInfo?.paymentInfo.subTotal! +
								orderInfo?.paymentInfo.subTotal! * 0.0625
							).toFixed(2)}
						</p>
					</div>
				</div>
			</div>

			<div className="h-fit w-full border-[1px] rounded-lg shadow-lg lg:max-w-4xl xl:max-w-5xl px-4">
				{orderInfo?.purchasedItems.map((item) => {
					return (
						<div
							key={item._id}
							className="flex py-4 border-b-[1px] last:mb-0 last:border-b-0"
						>
							<Link to={`/products/${item._id}`}>
								<figure>
									<img
										src={item.image}
										alt="product"
										className="h-32 w-32"
									></img>
								</figure>
							</Link>

							<div className="flex flex-1 justify-between">
								<div className="flex flex-col justify-center basis-72 px-6">
									<div className="flex items-center justify-between w-full mb-3">
										<Link
											to={`/products/${item._id}`}
											className="hover:text-gray-600 "
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
											} rounded-lg btn-secondary flex items-center h-8 gap-2`}
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
								<div className="flex flex-col px-6 gap-[2px] basis-72 justify-center">
									<div className="flex justify-between">
										<p>Price:</p>
										<p className="font-medium">${item.price.toFixed(2)}</p>
									</div>
									<div className="flex justify-between">
										<p>Quantity:</p>
										<p className="font-medium">{item.quantity}</p>
									</div>
									<div className="flex justify-between">
										<p>Total:</p>
										<p className="font-medium">
											${(item.quantity! * item.price).toFixed(2)}
										</p>
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

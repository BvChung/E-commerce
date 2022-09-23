import { OrderInfo } from "../../interfaces/orderInterface";
import { Link } from "react-router-dom";
import { useCartContext } from "../../hooks/context/useCartContext";
import { toast } from "react-toastify";

export default function OrderItem({
	_id,
	createdAt,
	purchasedItems,
	shippingInfo,
	paymentInfo,
}: OrderInfo) {
	const { addCartItem, findCartItem } = useCartContext();
	const datePurchased = new Date(createdAt!).toDateString().split(" ");

	return (
		<div className="flex flex-col items-center w-full h-fit border-b-[1px] last:border-b-0 ">
			<div className="flex flex-col md:flex-row flex-1 justify-between w-full pt-4 px-4 pb-4 md:pb-6 border-b-[1px] bg-gray-100 first:rounded-t-lg">
				<div className="hidden items-center w-full mb-4 md:mb-0 md:flex">
					<div className="flex flex-col items-center md:items-baseline justify-center gap-[2px] basis-60">
						<p className="uppercase font-medium text-sm text-gray-600">
							Order Placed
						</p>
						<p className="text-sm text-gray-600">
							{datePurchased[1]} {datePurchased[2]}, {datePurchased[3]}
						</p>
					</div>
					<div className="flex flex-col items-center md:items-baseline gap-[2px] basis-60 w-fit">
						<p className="uppercase font-medium text-sm text-gray-600">Total</p>
						<p className="text-sm text-gray-600">
							${paymentInfo.subTotal.toFixed(2)}
						</p>
					</div>
					<div className="flex flex-col items-center md:items-baseline gap-[2px] basis-60 w-fit">
						<p className="uppercase font-medium text-sm text-gray-600">
							Shipped to
						</p>
						<p className="text-sm text-gray-600">
							{shippingInfo.firstName} {shippingInfo.lastName}
						</p>
					</div>
				</div>
				<div className="flex flex-col gap-[2px] items-start md:items-end justify-end w-full">
					<p className="font-medium text-sm text-gray-600">Order#: {_id}</p>
					<Link to={`${_id}`}>
						<p className="font-medium text-sm text-gray-600 hover:text-gray-900 hover:link">
							View order details
						</p>
					</Link>
				</div>
			</div>
			<div className="h-fit w-full px-4">
				{purchasedItems.map((item) => {
					return (
						<div key={item._id} className="flex py-4 last:mb-0">
							<Link to={`/products/${item._id}`}>
								<figure>
									<img
										src={item.image}
										alt="product"
										className="h-32 w-32"
									></img>
								</figure>
							</Link>

							<div className="flex flex-col flex-1 justify-center px-6">
								<div className="flex items-center w-full mb-3">
									<Link
										to={`/products/${item._id}`}
										className="hover:text-gray-600 hover:link"
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
										className={`btn rounded-full ${
											!findCartItem(item._id)?.quantity ||
											findCartItem(item._id)?.quantity! < 9
												? "btn-outline"
												: "btn-disabled"
										} flex items-center h-8 gap-2`}
									>
										{(!findCartItem(item._id)?.quantity ||
											findCartItem(item._id)?.quantity! < 9) && (
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
											{!findCartItem(item._id)?.quantity ||
											findCartItem(item._id)?.quantity! < 9
												? "Buy again"
												: "9 items max"}
										</span>
									</button>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

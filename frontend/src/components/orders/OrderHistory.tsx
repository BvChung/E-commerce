import { OrderInfo } from "../../interfaces/orderInterface";
import { Link } from "react-router-dom";
import OrderedItems from "./OrderedItems";

export default function OrderHistory({
	_id,
	createdAt,
	purchasedItems,
	shippingInfo,
	paymentInfo,
}: OrderInfo) {
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
			<div className="h-fit w-full px-4 md:px-6">
				{purchasedItems.map((item) => {
					return (
						<OrderedItems
							key={item._id}
							_id={item._id}
							category={item.category}
							description={item.description}
							color={item.color}
							image={item.image}
							imageCloudId={item.imageCloudId}
							name={item.name}
							price={item.price}
							quantity={item.quantity}
						/>
					);
				})}
			</div>
		</div>
	);
}

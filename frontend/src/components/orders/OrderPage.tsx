import OrderHistory from "./OrderHistory";
import { useGetOrders } from "../../hooks/orders/useGetOrders";
import { OrderInfo } from "../../interfaces/orderInterface";

export default function OrderPage() {
	const { data: orders, isSuccess, isError, isLoading } = useGetOrders();

	return (
		<div className="flex flex-col items-center justify-center my-8 mx-4 sm:mx-6 lg:mx-0">
			<div className="flex items-center gap-2 w-full mb-6 lg:max-w-5xl xl:max-w-6xl">
				<span className="font-medium text-xl sm:text-2xl">My Orders</span>
			</div>

			<div className="flex justify-center h-max w-full gap-4 lg:max-w-5xl xl:max-w-6xl">
				<div className="border-[1px] h-max rounded-lg shadow-sm transition-all fade w-full">
					{isSuccess &&
						orders.map((order: OrderInfo) => {
							return (
								<OrderHistory
									key={order._id}
									_id={order._id}
									createdAt={order.createdAt}
									purchasedItems={order.purchasedItems}
									shippingInfo={order.shippingInfo}
									paymentInfo={order.paymentInfo}
								/>
							);
						})}
				</div>
			</div>
		</div>
	);
}

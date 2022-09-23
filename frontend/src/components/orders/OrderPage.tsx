import OrderItem from "./OrderItem";
import { useGetOrders } from "../../hooks/orders/useGetOrders";
import { OrderInfo } from "../../interfaces/orderInterface";

export default function OrdersPage() {
	const { data: orders, isSuccess, isError, isLoading } = useGetOrders();

	return (
		<div className="flex flex-col items-center justify-center mb-10 mx-2">
			<div className="flex items-center gap-2 w-full mt-8 mb-6 lg:max-w-4xl xl:max-w-5xl">
				<span className="font-semibold text-xl sm:text-2xl">Orders</span>
			</div>

			<div className="flex justify-center h-max w-full gap-4 lg:max-w-4xl xl:max-w-5xl">
				<div className="border-[1px] h-max rounded-lg shadow-sm transition-all fade w-full">
					{isSuccess &&
						orders.map((order: OrderInfo) => {
							return (
								<OrderItem
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

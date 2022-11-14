import OrderedItems from "./OrderedItems";
import { useGetOrders } from "../../hooks/orders/useGetOrders";
import { useAuthContext } from "../../hooks/context/useAuthContext";
import { OrderInfo } from "../../interfaces/orderInterface";

export default function OrdersPage() {
	const { user } = useAuthContext();
	const { data: orders, isSuccess, isError, isLoading } = useGetOrders();

	return (
		<div className="flex flex-col items-center justify-center mb-10 mx-4 sm:mx-6 lg:mx-0">
			<div className="flex items-center gap-2 w-full mt-8 mb-6 lg:max-w-4xl xl:max-w-5xl">
				<span className="font-medium text-xl sm:text-2xl">My Orders</span>
			</div>

			<div className="flex justify-center h-max w-full gap-4 lg:max-w-4xl xl:max-w-5xl">
				<div className="border-[1px] h-max rounded-lg shadow-sm transition-all fade w-full mb-10">
					{isSuccess &&
						orders.map((order: OrderInfo) => {
							return (
								<OrderedItems
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

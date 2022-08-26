import OrderDisplay from "./OrderDisplay";
import { useGetOrders } from "../../hooks/orders/useGetOrders";
import { OrderInfo } from "../../interfaces/orderInterface";

export default function OrdersPage() {
	const { data: orders, isSuccess, isError, isLoading } = useGetOrders();

	return (
		<div>
			<h1>OrdersPage</h1>
			{isSuccess &&
				orders.map((order: OrderInfo) => {
					return (
						<OrderDisplay
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
	);
}

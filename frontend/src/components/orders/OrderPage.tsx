import OrderDisplay from "./OrderDisplay";
import { useGetOrders } from "../../hooks/orders/useGetOrders";
import { OrderInfo } from "../../interfaces/orderInterface";

export default function OrdersPage() {
	const { data: orders, isSuccess, isError, isLoading } = useGetOrders();
	console.log(orders);

	return (
		<div>
			<h1>OrdersPage</h1>
			{isSuccess &&
				orders.map((order: OrderInfo) => {
					return (
						<OrderDisplay
							key={order._id}
							_id={order._id}
							customerId={order.customerId}
							customerName={order.customerName}
							purchasedItems={order.purchasedItems}
							shippingAddress={order.shippingAddress}
							paymentDetails={order.paymentDetails}
						/>
					);
				})}
		</div>
	);
}

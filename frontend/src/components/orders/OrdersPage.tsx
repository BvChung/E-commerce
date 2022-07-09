import React from "react";
import Orders from "./Orders";
import { useGetOrders } from "../../hooks/orders/useGetOrders";
import { OrderInfo } from "../../interfaces/orderInterface";

export default function OrdersPage() {
	const { data: ordersData, isSuccess, isError, isLoading } = useGetOrders();
	console.log(ordersData);

	return (
		<div>
			<h1>OrdersPage</h1>
			{isSuccess &&
				ordersData.map((order: OrderInfo) => {
					return (
						<Orders
							key={order._id}
							_id={order._id}
							user={order.user}
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

import { eCommerceApiPrivate } from "./axios";

type Orders = {
	id: string;
};

export const getOrders = async () => {
	const response = await eCommerceApiPrivate.get("/api/orders");
	return response.data;
};

export const createOrder = async () => {
	const response = await eCommerceApiPrivate.post("/api/orders/");
	return response.data;
};

export const deleteOrder = async (orders: Orders) => {
	const response = await eCommerceApiPrivate.delete(`/api/orders/${orders.id}`);
	return response.data;
};

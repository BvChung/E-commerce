import { eCommerceApiPrivate } from "./axios";

type Orders = {
	id: string;
};

export const getOrders = async () => {
	const response = await eCommerceApiPrivate.get("/api/orders");
	return response.data;
};

export const updateOrders = async (orders: Orders) => {
	const response = await eCommerceApiPrivate.get(`/api/orders/${orders.id}`);
	return response.data;
};

export const deleteOrders = async (orders: Orders) => {
	const response = await eCommerceApiPrivate.get(`/api/orders/${orders.id}`);
	return response.data;
};

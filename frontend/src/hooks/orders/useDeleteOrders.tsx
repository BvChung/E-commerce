import React from "react";
import { useQuery, useMutation } from "react-query";
import { usePrivateApi } from "../auth/usePrivateApi";

interface OrdersId {
	orders: string;
}

export const useDeleteOrders = () => {
	const eCommerceApiPrivate = usePrivateApi();

	const deleteOrder = async (orders: OrdersId) => {
		const response = await eCommerceApiPrivate.delete(`/api/orders/${orders}`);
		return response.data;
	};

	// return useQuery("orders", deleteOrder);
};

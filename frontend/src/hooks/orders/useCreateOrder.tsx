import React from "react";
import { useQuery } from "react-query";
import { usePrivateApi } from "../auth/usePrivateApi";

export const useDeleteOrders = () => {
	const eCommerceApiPrivate = usePrivateApi();

	return useQuery("orders", async () => {
		const response = await eCommerceApiPrivate.post(`/api/orders`);

		return response.data;
	});
};

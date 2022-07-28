import { useQuery } from "react-query";
import { usePrivateApi } from "../auth/usePrivateApi";

export const useGetOrders = () => {
	const eCommerceApiPrivate = usePrivateApi();

	const getOrders = async () => {
		const response = await eCommerceApiPrivate.get("/api/orders");

		return response.data;
	};

	return useQuery("orders", getOrders);
};

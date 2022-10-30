import { useQuery } from "react-query";
import { usePrivateApi } from "../auth/usePrivateApi";
import { OrderInfo } from "../../interfaces/orderInterface";

export const useGetOrderInfo = (orderId: string | undefined) => {
	const eCommerceApiPrivate = usePrivateApi();

	const getOrderInfo = async (
		orderId: string | undefined
	): Promise<OrderInfo> => {
		if (typeof orderId === "undefined") {
			return Promise.reject(new Error("Invalid order id"));
		}

		console.log(orderId);

		const response = await eCommerceApiPrivate.get(`/api/orders/${orderId}`);

		return response.data;
	};

	return useQuery([`order-${orderId}`, orderId], () => getOrderInfo(orderId), {
		enabled: !!orderId,
	});
};

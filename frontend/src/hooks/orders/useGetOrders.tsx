import { useQuery } from "react-query";
import { OrderInfo } from "../../interfaces/orderInterface";
import { usePrivateApi } from "../auth/usePrivateApi";

export const useGetOrders = () => {
	const eCommerceApiPrivate = usePrivateApi();

	const getOrders = async (): Promise<OrderInfo[]> => {
		const response = await eCommerceApiPrivate.get("/api/orders");

		return response.data.sort((a: OrderInfo, b: OrderInfo) => {
			if (a.createdAt! > b.createdAt!) {
				return -1;
			}
			if (a.createdAt! < b.createdAt!) {
				return 1;
			}
			return 0;
		});
	};

	return useQuery("orders", getOrders, {
		retry: false,
	});
};

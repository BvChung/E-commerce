import { usePrivateApi } from "../auth/usePrivateApi";
import { useMutation, useQueryClient } from "react-query";
import { OrderInfo } from "../../interfaces/orderInterface";
import { CustomError } from "../../interfaces/customInterface";
import { toast } from "react-toastify";

export const useDeleteOrders = () => {
	const eCommerceApiPrivate = usePrivateApi();
	const queryClient = useQueryClient();

	const createOrder = async (order: OrderInfo) => {
		const response = await eCommerceApiPrivate.post("/api/orders/", order);
		return response.data;
	};

	return useMutation(createOrder, {
		onSuccess: (data: OrderInfo) => {
			queryClient.invalidateQueries(["orders"]);
			toast.success("Your order has been made");
		},
		onError: (error: CustomError) => {
			toast.error(error.response?.data?.message);
		},
	});
};

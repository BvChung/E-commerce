import { usePrivateApi } from "../auth/usePrivateApi";
import { useMutation, useQueryClient } from "react-query";
import { OrderInfo } from "../../interfaces/orderInterface";
import { CustomError } from "../../interfaces/customInterface";
import { toast } from "react-toastify";

export const useCreateOrder = () => {
	const eCommerceApiPrivate = usePrivateApi();
	const queryClient = useQueryClient();

	const createOrder = async (myOrder: OrderInfo): Promise<OrderInfo[]> => {
		const response = await eCommerceApiPrivate.post("/api/orders/", myOrder);

		return response.data;
	};

	return useMutation(createOrder, {
		onSuccess: (data) => {
			queryClient.invalidateQueries("orders");
			toast.success("Your order has been made.");
			console.log(data);
		},
		onError: (error: CustomError) => {
			toast.error(error.response?.data?.message);
		},
	});
};

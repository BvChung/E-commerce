import { usePrivateApi } from "../auth/usePrivateApi";
import { useMutation, useQueryClient } from "react-query";
import { OrderInfo } from "../../interfaces/orderInterface";
import { CartInfo } from "../../interfaces/cartInterface";
import { CustomError } from "../../interfaces/customInterface";
import { toast } from "react-toastify";

export const useCreateOrder = () => {
	const eCommerceApiPrivate = usePrivateApi();
	const queryClient = useQueryClient();

	const createOrder = async (myCartItems: CartInfo[]): Promise<OrderInfo[]> => {
		const response = await eCommerceApiPrivate.post(
			"/api/orders/",
			myCartItems
		);

		return response.data;
	};

	return useMutation(createOrder, {
		onSuccess: () => {
			queryClient.invalidateQueries("orders");
			toast.success("Your order has been made");
		},
		onError: (error: CustomError) => {
			toast.error(error.response?.data?.message);
		},
	});
};

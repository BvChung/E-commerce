import { usePrivateApi } from "../auth/usePrivateApi";
import { useMutation, useQueryClient } from "react-query";
import { OrderInfo } from "../../interfaces/orderInterface";
import { useNavigate } from "react-router-dom";
import { CustomError } from "../../interfaces/customInterface";
import { toast } from "react-toastify";

export const useDeleteOrders = (orderId: string) => {
	const eCommerceApiPrivate = usePrivateApi();
	const queryClient = useQueryClient();

	const deleteOrder = async () => {
		const response = await eCommerceApiPrivate.delete(`/api/orders/${orderId}`);
		return response.data;
	};

	return useMutation(deleteOrder, {
		onSuccess: (data: OrderInfo) => {
			queryClient.invalidateQueries("orders");
			toast.success(`Order number: ${data._id} has been deleted.`);
		},
		onError: (error: CustomError) => {
			toast.error(error.response?.data?.message);
		},
	});
};

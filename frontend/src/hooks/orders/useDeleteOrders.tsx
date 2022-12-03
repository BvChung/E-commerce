import { usePrivateApi } from "../auth/usePrivateApi";
import { useMutation, useQueryClient } from "react-query";
import { OrderInfo } from "../../interfaces/orderInterface";
import { useNavigate, useLocation } from "react-router-dom";
import { CustomError } from "../../interfaces/customInterface";
import { toast } from "react-toastify";

export const useDeleteOrders = (orderId: string) => {
	const eCommerceApiPrivate = usePrivateApi();
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const location = useLocation();

	const deleteOrder = async () => {
		try {
			const response = await eCommerceApiPrivate.delete(
				`/api/orders/${orderId}`
			);
			return response.data;
		} catch (error) {
			const err = error as CustomError;
			if (
				err.response?.status === 403 &&
				err.response?.data?.message === "jwt malformed"
			) {
				toast.info("Your session has expired.");
				navigate("/signin", { state: { from: location }, replace: true });
				return Promise.reject(error);
			}

			toast.error(err.response?.data?.message);
			return Promise.reject(error);
		}
	};

	return useMutation(deleteOrder, {
		onSuccess: (data: OrderInfo) => {
			queryClient.invalidateQueries("orders");
			toast.success(`Order number: ${data._id} has been deleted.`);
		},
	});
};

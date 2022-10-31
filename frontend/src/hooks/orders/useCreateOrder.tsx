import { usePrivateApi } from "../auth/usePrivateApi";
import { useMutation, useQueryClient } from "react-query";
import { OrderCreation } from "../../interfaces/orderInterface";
import { CustomError } from "../../interfaces/customInterface";
import { toast } from "react-toastify";
import { useOrderContext } from "../context/useOrderContext";
import { useCartContext } from "../context/useCartContext";
import { useNavigate } from "react-router-dom";

export const useCreateOrder = () => {
	const eCommerceApiPrivate = usePrivateApi();
	const queryClient = useQueryClient();
	const { clearMyOrder } = useOrderContext();
	const { clearMyCart } = useCartContext();
	const navigate = useNavigate();

	const createOrder = async (
		myOrder: OrderCreation
	): Promise<OrderCreation[]> => {
		const response = await eCommerceApiPrivate.post("/api/orders/", myOrder);

		return response.data;
	};

	return useMutation(createOrder, {
		onSuccess: (data) => {
			queryClient.invalidateQueries("orders");
			clearMyCart();
			clearMyOrder();
			navigate("/");
			toast.success("Your order has been made.");
			console.log(data);
		},
		onError: (error: CustomError) => {
			toast.error(error.response?.data?.message);
		},
	});
};

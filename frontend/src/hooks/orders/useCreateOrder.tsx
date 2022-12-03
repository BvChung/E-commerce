import { usePrivateApi } from "../auth/usePrivateApi";
import { useMutation, useQueryClient } from "react-query";
import { OrderCreation } from "../../interfaces/orderInterface";
import { CustomError } from "../../interfaces/customInterface";
import { toast } from "react-toastify";
import { useOrderContext } from "../context/useOrderContext";
import { useCartContext } from "../context/useCartContext";
import { useNavigate, useLocation } from "react-router-dom";

export const useCreateOrder = () => {
	const eCommerceApiPrivate = usePrivateApi();
	const queryClient = useQueryClient();
	const { clearMyOrder } = useOrderContext();
	const { clearMyCart } = useCartContext();
	const navigate = useNavigate();
	const location = useLocation();

	const createOrder = async (myOrder: OrderCreation) => {
		try {
			const response = await eCommerceApiPrivate.post("/api/orders/", myOrder);

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

	return useMutation(createOrder, {
		onSuccess: (data: OrderCreation[]) => {
			queryClient.invalidateQueries("orders");
			clearMyCart();
			clearMyOrder();
			navigate("/");
			toast.success("Your order has been made.");
			console.log(data);
		},
	});
};

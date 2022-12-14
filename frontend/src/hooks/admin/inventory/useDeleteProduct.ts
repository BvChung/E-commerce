import { usePrivateApi } from "../../auth/usePrivateApi";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate, useLocation } from "react-router-dom";
import { ProductInfo } from "../../../interfaces/productInterface";
import { CustomError } from "../../../interfaces/customInterface";
import { useCartContext } from "../../context/useCartContext";
import { toast } from "react-toastify";

export const useDeleteProduct = () => {
	const eCommerceApiPrivate = usePrivateApi();
	const queryClient = useQueryClient();
	const { removeCartItem } = useCartContext();
	const navigate = useNavigate();
	const location = useLocation();

	const deleteProduct = async (productId: string) => {
		try {
			const response = await eCommerceApiPrivate.delete(
				`/api/admin/inventory/${productId}`
			);

			return response.data;
		} catch (error) {
			const err = error as CustomError;

			if (err.response?.status === 401) {
				toast.error(err.response?.data?.message);
				navigate("/adminsignin", { state: { from: location }, replace: true });
				return Promise.reject(error);
			}

			if (
				err.response?.status === 403 &&
				err.response?.data?.message === "jwt malformed"
			) {
				toast.info("Your session has expired.");
				navigate("/adminsignin", { state: { from: location }, replace: true });
				return Promise.reject(error);
			}

			toast.error(err.response?.data?.message);
			return Promise.reject(error);
		}
	};

	return useMutation(deleteProduct, {
		onSuccess: (data: ProductInfo) => {
			queryClient.invalidateQueries("inventory");
			queryClient.invalidateQueries(`product-${data._id}`);
			queryClient.invalidateQueries("products");
			queryClient.invalidateQueries("cart");
			removeCartItem(data._id);
			toast.success(`${data.name} has been deleted.`);
		},
	});
};

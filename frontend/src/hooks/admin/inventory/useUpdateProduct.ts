import { usePrivateApi } from "../../auth/usePrivateApi";
import { useMutation, useQueryClient } from "react-query";
import {
	ProductUpdate,
	ProductInfo,
} from "../../../interfaces/productInterface";
import { useCartContext } from "../../context/useCartContext";
import { useNavigate, useLocation } from "react-router-dom";
import { CustomError } from "../../../interfaces/customInterface";
import { toast } from "react-toastify";

export const useUpdateProduct = (productId: string | undefined) => {
	const eCommerceApiPrivate = usePrivateApi();
	const queryClient = useQueryClient();
	const { updateCartPrice, findCartItem } = useCartContext();
	const navigate = useNavigate();
	const location = useLocation();

	const updateProduct = async (updatedInfo: ProductUpdate) => {
		try {
			const response = await eCommerceApiPrivate.patch(
				`/api/admin/inventory/${productId}`,
				updatedInfo
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

	return useMutation(updateProduct, {
		onSuccess: (data: ProductInfo) => {
			queryClient.invalidateQueries(`product-${data._id}`);
			queryClient.invalidateQueries("products");
			queryClient.invalidateQueries("cart");

			if (findCartItem(productId)?.price !== data.price) {
				updateCartPrice({ _id: data._id, price: data.price });
			}
			toast.success(`${data.name} has been updated.`);
		},
	});
};

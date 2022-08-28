import { usePrivateApi } from "../auth/usePrivateApi";
import { useMutation, useQueryClient } from "react-query";
import { ProductInfo } from "../../interfaces/productInterface";
import { CustomError } from "../../interfaces/customInterface";
import { useCartContext } from "../context/useCartContext";
import { toast } from "react-toastify";

export const useDeleteProduct = () => {
	const eCommerceApiPrivate = usePrivateApi();
	const queryClient = useQueryClient();
	const { removeCartItem } = useCartContext();

	const deleteProduct = async (productId: string) => {
		const response = await eCommerceApiPrivate.delete(
			`/api/products/${productId}`
		);

		return response.data;
	};

	return useMutation(deleteProduct, {
		onSuccess: (data: ProductInfo) => {
			queryClient.invalidateQueries(`product-${data._id}`);
			queryClient.invalidateQueries("products");
			queryClient.invalidateQueries("cart");
			removeCartItem(data._id);
			toast.success(`${data.name} has been deleted.`);
		},
		onError: (error: CustomError) => {
			toast.error(error.response?.data?.message);
		},
	});
};

import { usePrivateApi } from "../../auth/usePrivateApi";
import { useMutation, useQueryClient } from "react-query";
import {
	ProductUpdate,
	ProductInfo,
} from "../../../interfaces/productInterface";
import { CustomError } from "../../../interfaces/customInterface";
import { useCartContext } from "../../context/useCartContext";
import { toast } from "react-toastify";

export const useUpdateProduct = (productId: string | undefined) => {
	const eCommerceApiPrivate = usePrivateApi();
	const queryClient = useQueryClient();
	const { updateCartPrice, findCartItem } = useCartContext();

	const updateProduct = async (
		updatedInfo: ProductUpdate
	): Promise<ProductInfo> => {
		const response = await eCommerceApiPrivate.patch(
			`/api/products/${productId}`,
			updatedInfo
		);

		return response.data;
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
		onError: (error: CustomError) => {
			toast.error(error.response?.data?.message);
		},
	});
};

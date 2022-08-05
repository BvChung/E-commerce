import { usePrivateApi } from "../auth/usePrivateApi";
import { useMutation, useQueryClient } from "react-query";
import { ProductDetails } from "../../interfaces/productInterface";
import { CustomError } from "../../interfaces/customInterface";
import { toast } from "react-toastify";

export default function useUpdateProducts(productId: string) {
	const eCommerceApiPrivate = usePrivateApi();
	const queryClient = useQueryClient();

	const updateProduct = async (productInfo: ProductDetails) => {
		const response = await eCommerceApiPrivate.patch(
			`/api/products/${productId}`,
			productInfo
		);

		return response.data;
	};

	return useMutation(updateProduct, {
		onSuccess: (data: ProductDetails) => {
			queryClient.invalidateQueries(["products"]);
			toast.success(`${data.name} has been created.`);
		},
		onError: (error: CustomError) => {
			toast.error(error.response?.data?.message);
		},
	});
}

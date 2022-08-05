import { usePrivateApi } from "../auth/usePrivateApi";
import { useMutation, useQueryClient } from "react-query";
import { ProductDetails } from "../../interfaces/productInterface";
import { CustomError } from "../../interfaces/customInterface";
import { toast } from "react-toastify";

export default function useDeleteProducts(productId: string) {
	const eCommerceApiPrivate = usePrivateApi();
	const queryClient = useQueryClient();

	const deleteProduct = async () => {
		const response = await eCommerceApiPrivate.delete(
			`/api/products/${productId}`
		);

		return response.data;
	};

	return useMutation(deleteProduct, {
		onSuccess: (data: ProductDetails) => {
			queryClient.invalidateQueries("products");
			toast.success(`${data.name} has been deleted.`);
		},
		onError: (error: CustomError) => {
			toast.error(error.response?.data?.message);
		},
	});
}

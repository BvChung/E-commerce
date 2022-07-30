import { usePrivateApi } from "../auth/usePrivateApi";
import { useMutation, useQueryClient } from "react-query";
import { ProductInfo } from "../../interfaces/productInterface";
import { CustomError } from "../../interfaces/customInterface";
import { toast } from "react-toastify";

export default function useDeleteProducts() {
	const eCommerceApiPrivate = usePrivateApi();
	const queryClient = useQueryClient();

	const deleteProduct = async (productId: string | undefined) => {
		const response = await eCommerceApiPrivate.delete(
			`/api/products/${productId}`
		);

		return response.data;
	};

	return useMutation(deleteProduct, {
		onSuccess: (data: ProductInfo) => {
			queryClient.invalidateQueries(["products"]);
			toast.success(`${data.name} has been deleted.`);
		},
		onError: (error: CustomError) => {
			toast.error(error.response?.data?.message);
		},
	});
}

import { usePrivateApi } from "../auth/usePrivateApi";
import { useMutation, useQueryClient } from "react-query";
import {
	ProductInfo,
	ProductCreation,
} from "../../interfaces/productInterface";
import { CustomError } from "../../interfaces/customInterface";
import { toast } from "react-toastify";

export const useCreateProduct = () => {
	const eCommerceApiPrivate = usePrivateApi();
	const queryClient = useQueryClient();

	const createProduct = async (
		productData: ProductCreation
	): Promise<ProductInfo> => {
		const response = await eCommerceApiPrivate.post(
			"/api/products/",
			productData
		);

		return response.data;
	};

	return useMutation(createProduct, {
		onSuccess: (data: ProductInfo) => {
			queryClient.invalidateQueries("products");
			toast.success(`${data.name} has been created.`);
		},
		onError: (error: CustomError) => {
			toast.error(error.response?.data?.message);
		},
	});
};

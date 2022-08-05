import { usePrivateApi } from "../auth/usePrivateApi";
import { useMutation, useQueryClient } from "react-query";
import {
	ProductDetails,
	ProductCreation,
} from "../../interfaces/productInterface";
import { CustomError } from "../../interfaces/customInterface";
import { toast } from "react-toastify";

export const useCreateProduct = () => {
	const eCommerceApiPrivate = usePrivateApi();
	const queryClient = useQueryClient();

	const createProduct = async (productData: ProductCreation) => {
		const response = await eCommerceApiPrivate.post(
			"/api/products/",
			productData
		);

		return response.data;
	};

	return useMutation(createProduct, {
		onSuccess: (data: ProductDetails) => {
			queryClient.invalidateQueries("products");
			toast.success(`${data.name} has been created.`);
			console.log(data);
		},
		onError: (error: CustomError) => {
			toast.error(error.response?.data?.message);
		},
	});
};

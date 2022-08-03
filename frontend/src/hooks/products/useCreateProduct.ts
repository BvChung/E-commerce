import { usePrivateApi } from "../auth/usePrivateApi";
import { useMutation, useQueryClient } from "react-query";
import { ProductInfo, TestImage } from "../../interfaces/productInterface";
import { CustomError } from "../../interfaces/customInterface";
import { toast } from "react-toastify";

export const useCreateProduct = () => {
	const eCommerceApiPrivate = usePrivateApi();
	const queryClient = useQueryClient();

	const createProduct = async (productInfo: TestImage) => {
		const response = await eCommerceApiPrivate.post(
			"/api/products/",
			productInfo
		);

		return response.data;
	};

	return useMutation(createProduct, {
		onSuccess: (data: TestImage) => {
			queryClient.invalidateQueries(["products"]);
			toast.success(`Prod has been created.`);
			console.log(data);
			// toast.success(`${data.name} has been created.`);
		},
		onError: (error: CustomError) => {
			toast.error(error.response?.data?.message);
		},
	});
};

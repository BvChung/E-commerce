import { usePrivateApi } from "../auth/usePrivateApi";

export const useCreateProduct = () => {
	const eCommerceApiPrivate = usePrivateApi();

	const createProduct = async () => {
		const response = await eCommerceApiPrivate.post("/api/products/");

		return response.data;
	};
};

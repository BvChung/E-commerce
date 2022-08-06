import { eCommerceApiPublic } from "../../api/axios";
import { ProductInfo } from "../../interfaces/productInterface";
import { useQuery } from "react-query";

export const useGetProducts = () => {
	const getProducts = async (): Promise<ProductInfo[]> => {
		const response = await eCommerceApiPublic.get("/api/products");

		return response.data;
	};

	return useQuery<ProductInfo[]>("products", getProducts);
};

import { eCommerceApiPublic } from "../../api/axios";
import { ProductDetails } from "../../interfaces/productInterface";
import { useQuery } from "react-query";

// const queryClient = useQueryClient() provides access to the queryclient created in the index

export const useGetProducts = () => {
	const getProducts = async (): Promise<ProductDetails[]> => {
		const response = await eCommerceApiPublic.get("/api/products");

		return response.data;
	};

	return useQuery<ProductDetails[]>("products", getProducts);
};

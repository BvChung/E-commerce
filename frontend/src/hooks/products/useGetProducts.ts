import { eCommerceApiPublic } from "../../api/axios";
import { useQuery } from "react-query";

// const queryClient = useQueryClient() provides access to the queryclient created in the index

export const useGetProducts = () => {
	const getProducts = async () => {
		const response = await eCommerceApiPublic.get("/api/products");

		return response.data;
	};

	return useQuery(["products"], getProducts);
};

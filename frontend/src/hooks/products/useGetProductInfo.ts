import { useQuery } from "react-query";
import { Params } from "react-router-dom";
import { eCommerceApiPublic } from "../../api/axios";

// interface ProductParams {
// 	id: ;
// }

export const useGetProductInfo = (id: string | undefined) => {
	const getProductInfo = async (id: string | undefined) => {
		const response = await eCommerceApiPublic.get(`/api/products/${id}`);

		return response.data;
	};

	return useQuery("productInfo", () => getProductInfo(id));
};

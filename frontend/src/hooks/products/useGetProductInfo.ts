import { useQuery } from "react-query";
import { Params } from "react-router-dom";
import { eCommerceApiPublic } from "../../api/axios";

export const useGetProductInfo = (productId: string | undefined) => {
	const getProductInfo = async (productId: string | undefined) => {
		const response = await eCommerceApiPublic.get(`/api/products/${productId}`);

		return response.data;
	};

	return useQuery(["productInfo", productId], () => getProductInfo(productId), {
		// The query will not execute until the productId exists
		enabled: !!productId,
	});
};

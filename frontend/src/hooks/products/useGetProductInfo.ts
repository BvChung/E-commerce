import { useQuery } from "react-query";
import { ProductInfo } from "../../interfaces/productInterface";
import { eCommerceApiPublic } from "../../api/axios";

export const useGetProductInfo = (productId: string | undefined) => {
	const getProductInfo = async (
		productId: string | undefined
	): Promise<ProductInfo> => {
		if (typeof productId === "undefined") {
			return Promise.reject(new Error("Invalid product id"));
		}

		const response = await eCommerceApiPublic.get(`/api/products/${productId}`);

		return response.data;
	};

	return useQuery(
		[`product-${productId}`, productId],
		() => getProductInfo(productId),
		{
			// The query will not execute until the productId exists
			enabled: !!productId,
		}
	);
};

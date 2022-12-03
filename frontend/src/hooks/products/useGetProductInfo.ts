import { useQuery } from "react-query";
import { ProductInfo } from "../../interfaces/productInterface";
import { eCommerceApiPublic } from "../../api/axios";
import { CustomError } from "../../interfaces/customInterface";
import { toast } from "react-toastify";

export const useGetProductInfo = (productId: string) => {
	const getProductInfo = async (productId: string) => {
		try {
			const response = await eCommerceApiPublic.get(
				`/api/products/${productId}`
			);

			return response.data;
		} catch (error) {
			const err = error as CustomError;
			if (
				err.response?.data?.message.includes(
					"Cast to ObjectId failed for value"
				)
			) {
				toast.error("Product not found");
				return Promise.reject(error);
			}
		}
	};

	return useQuery<ProductInfo>(
		[`product-${productId}`, productId],
		() => getProductInfo(productId),
		{
			// The query will not execute until the productId exists
			enabled: !!productId,
		}
	);
};

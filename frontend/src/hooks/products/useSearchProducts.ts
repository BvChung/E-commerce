import { eCommerceApiPublic } from "../../api/axios";
import { ProductInfo } from "../../interfaces/productInterface";
import { useQuery } from "react-query";

export const useSearchProducts = () => {
	const searchProducts = async (): Promise<ProductInfo[]> => {
		const response = await eCommerceApiPublic.get("/api/products");

		return response.data.sort((a: ProductInfo, b: ProductInfo) => {
			if (a.name < b.name) {
				return -1;
			}
			if (a.name > b.name) {
				return 1;
			}
			// names must be equal
			return 0;
		});
	};

	return useQuery<ProductInfo[]>("searchProducts", searchProducts, {
		enabled: false,
	});
};

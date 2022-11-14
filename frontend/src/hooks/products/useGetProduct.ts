import { eCommerceApiPublic } from "../../api/axios";
import { ProductInfo } from "../../interfaces/productInterface";
import { useQuery } from "react-query";
import qs from "qs";

interface FilterProducts {
	category: string[];
	priceLow: number | string;
	priceHigh: number | string;
}

export const useGetProduct = (filter: FilterProducts) => {
	const getProducts = async (): Promise<ProductInfo[]> => {
		const response = await eCommerceApiPublic.get("/api/products", {
			params: {
				// productIds,
				// productIds: myCartItems.map((item) => item._id),
				category: filter.category,
				priceLow: filter.priceLow,
				priceHigh: filter.priceHigh,
			},
			paramsSerializer: (params) => qs.stringify(params),
		});

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

	return useQuery<ProductInfo[]>("products", getProducts);
};

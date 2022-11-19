import { eCommerceApiPublic } from "../../api/axios";
import { ProductInfo } from "../../interfaces/productInterface";
import { useQuery } from "react-query";
import qs from "qs";

interface FilterProducts {
	category: string[];
	priceLow: number | string;
	priceHigh: number | string;
}

export const useQueryProducts = (filter: FilterProducts) => {
	const getProducts = async () => {
		const response = await eCommerceApiPublic.get("/api/products/query", {
			params: {
				category: filter.category,
				priceLow: filter.priceLow,
				priceHigh: filter.priceHigh,
			},
			paramsSerializer: (params) => qs.stringify(params),
		});

		console.log(response.data);

		return response.data.sort((a: ProductInfo, b: ProductInfo) => {
			if (a.name < b.name) {
				return -1;
			}
			if (a.name > b.name) {
				return 1;
			}
			return 0;
		});
	};

	return useQuery<ProductInfo[]>(["products", filter], getProducts);
};

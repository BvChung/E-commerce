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
	const getProducts = async () => {
		// console.log(filter);
		if (filter.priceHigh !== -1 && filter.priceLow !== -1) {
		}

		const response = await eCommerceApiPublic.get("/api/products/get", {
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

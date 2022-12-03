import { eCommerceApiPublic } from "../../api/axios";
import { ProductInfo } from "../../interfaces/productInterface";
import { useQuery } from "react-query";
import qs from "qs";
import { CustomError } from "../../interfaces/customInterface";
import { toast } from "react-toastify";

interface Filters {
	category: string[];
	priceLow: number | string;
	priceHigh: number | string;
}

export const useQueryProducts = (filter: Filters) => {
	const getProducts = async () => {
		try {
			const response = await eCommerceApiPublic.get("/api/products/query", {
				params: {
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
				return 0;
			});
		} catch (error) {
			const err = error as CustomError;
			toast.error(err.response?.data?.message);
			return Promise.reject(error);
		}
	};

	return useQuery<ProductInfo[]>(["products", filter], getProducts);
};

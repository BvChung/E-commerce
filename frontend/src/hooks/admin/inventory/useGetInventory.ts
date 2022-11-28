import { eCommerceApiPublic } from "../../../api/axios";
import { usePrivateApi } from "../../auth/usePrivateApi";
import { ProductInfo } from "../../../interfaces/productInterface";
import { useQuery } from "react-query";

export const useGetInventory = () => {
	const eCommerceApiPrivate = usePrivateApi();

	const getProducts = async () => {
		try {
			const response = await eCommerceApiPrivate.get("/api/products");

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
		} catch (error) {}
	};

	return useQuery<ProductInfo[]>("products", getProducts, {
		retry: false,
	});
};

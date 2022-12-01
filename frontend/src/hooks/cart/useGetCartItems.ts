import { eCommerceApiPublic } from "../../api/axios";
import { useQuery } from "react-query";
import { ProductInfo } from "../../interfaces/productInterface";
import { CartStorageData, CartItemInfo } from "../../interfaces/cartInterface";
import qs from "qs";

export const useGetCartItems = (myCartItems: CartStorageData[]) => {
	// console.log(myCartItems);
	const productIds = myCartItems.map((item: CartStorageData) => item._id);

	const getCartItems = async () => {
		// Send productsIds through params => on backend accessed through req.query(qs.stringify(params) converts params to query)
		//Ex: http://localhost:3000/api/products/cart?productIds[0]=1&productIds[1]=2&productIds[2]=3

		const response = await eCommerceApiPublic.get("/api/products/cart", {
			params: {
				productIds,
				// productIds: myCartItems.map((item) => item._id),
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

	return useQuery<CartItemInfo[]>(["cart", productIds], () => getCartItems());
};

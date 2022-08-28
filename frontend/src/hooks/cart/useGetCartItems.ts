import { eCommerceApiPublic } from "../../api/axios";
import { useQuery } from "react-query";
import { ProductInfo } from "../../interfaces/productInterface";
import { CartStorageData, CartItemInfo } from "../../interfaces/cartInterface";
import qs from "qs";

export const useGetCartItems = (myCartItems: CartStorageData[]) => {
	const productIds = myCartItems.map((item: CartStorageData) => item._id);

	const getCartItems = async (): Promise<CartItemInfo[]> => {
		// Send productsIds through params => on backend accessed through req.query(qs.stringify(params) converts params to query)
		//Ex: http://localhost:3000/api/products/cart?productIds[0]=1&productIds[1]=2&productIds[2]=3

		const response = await eCommerceApiPublic.get("/api/products/cart", {
			params: {
				productIds,
				// productIds: myCartItems.map((item) => item._id),
			},
			paramsSerializer: (params) => qs.stringify(params),
		});

		return response.data;

		// MongoDB returns items sorted in alphabetical order by id therefore have to match by sorting myCartItems in order to assign the quantites properly.
		// const sortItems = myCartItems.sort(
		// 	(a: CartStorageData, b: CartStorageData) => {
		// 		if (a._id > b._id) {
		// 			return 1;
		// 		}
		// 		if (a._id < b._id) {
		// 			return -1;
		// 		}
		// 		return 0;
		// 	}
		// );

		// const addItemQuantity: CartItemInfo[] = response.data.map(
		// 	(product: ProductInfo, i: number) => {
		// 		if (product._id === sortItems[i]._id) {
		// 			return {
		// 				...product,
		// 				quantity: sortItems[i].quantity,
		// 			};
		// 		} else {
		// 			return { ...product };
		// 		}
		// 	}
		// );

		// return addItemQuantity;
	};

	return useQuery(["cart", productIds], () => getCartItems());
	// return useQuery(["cart", productIds], () => getCartItems(myCartItems));
};

import { eCommerceApiPublic } from "../../api/axios";
import { useQuery } from "react-query";
import { ProductInfo } from "../../interfaces/productInterface";
import { CartStorageData, CartInfo } from "../../interfaces/cartInterface";
import qs from "qs";

export const useGetCartItems = (myCartItems: CartStorageData[]) => {
	const productIds = myCartItems.map((item: CartStorageData) => item._id);
	const sortedItems = myCartItems.sort(
		(a: CartStorageData, b: CartStorageData) => {
			if (a._id > b._id) {
				return 1;
			}
			if (a._id < b._id) {
				return -1;
			}
			return 0;
		}
	);

	const getCartItems = async (productIds: string[]): Promise<CartInfo[]> => {
		const response = await eCommerceApiPublic.get("/api/products/cart", {
			params: {
				productIds,
			},
			paramsSerializer: (params) => qs.stringify(params),
		});

		const addItemQuantity: CartInfo[] = await response.data.map(
			(product: ProductInfo, i: number) => {
				if (product._id === sortedItems[i]._id) {
					return {
						...product,
						quantity: sortedItems[i].quantity,
					};
				} else {
					return { ...product };
				}
			}
		);

		return addItemQuantity;
	};

	return useQuery(["cart", productIds], () => getCartItems(productIds), {
		enabled: !!productIds,
	});
};

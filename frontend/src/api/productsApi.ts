import { eCommerceApiPrivate } from "./axios";

type Products = {
	id: string;
};

export const getProducts = async () => {
	const response = await eCommerceApiPrivate.get("/api/products");
	return response.data;
};

export const updateProducts = async (product: Products) => {
	const response = await eCommerceApiPrivate.get(`/api/products/${product.id}`);
	return response.data;
};

export const deleteProducts = async (product: Products) => {
	const response = await eCommerceApiPrivate.get(`/api/products/${product.id}`);
	return response.data;
};

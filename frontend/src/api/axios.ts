import axios from "axios";

const eCommerceApi = axios.create({
	baseURL: "http://localhost:3001",
});

type Products = {
	id: string;
};

export const getProducts = async () => {
	const response = await eCommerceApi.get("/products");
	return response.data;
};

export const updateProducts = async (product: Products) => {
	const response = await eCommerceApi.get(`/products/${product.id}`);

	return response.data;
};

export const deleteProducts = async (product: Products) => {
	const response = await eCommerceApi.get(`/products/${product.id}`);

	return response.data;
};

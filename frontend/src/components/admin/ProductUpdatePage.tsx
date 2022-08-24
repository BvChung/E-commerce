import React from "react";
import { useGetProducts } from "../../hooks/products/useGetProducts";

export default function ProductUpdatePage() {
	const { isLoading, isError, isSuccess, data: products } = useGetProducts();
	return <div>ProductUpdatePage</div>;
}

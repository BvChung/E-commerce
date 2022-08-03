import React from "react";
import { useGetProducts } from "../../hooks/products/useGetProducts";
import { ProductInfo } from "../../interfaces/productInterface";
import ProductDisplay from "./ProductDisplay";

export default function ProductPage() {
	const {
		isLoading,
		isError,
		isSuccess,
		error,
		data: products,
	} = useGetProducts();

	return (
		<div>
			<h1>Products</h1>
			{isLoading && <div className="text-9xl">Loading</div>}
			<div className="grid grid-cols-2">
				{isSuccess &&
					products.map((product: ProductInfo) => {
						return (
							<ProductDisplay
								key={product._id}
								_id={product._id}
								name={product.name}
								description={product.description}
								price={product.price}
								category={product.category}
								image={product.image}
							/>
						);
					})}
			</div>
		</div>
	);
}

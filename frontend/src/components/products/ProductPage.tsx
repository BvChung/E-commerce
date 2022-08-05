import { useGetProducts } from "../../hooks/products/useGetProducts";
import { ProductDetails } from "../../interfaces/productInterface";
import ProductDisplay from "./ProductDisplay";

export default function ProductPage() {
	const { isLoading, isError, isSuccess, data: products } = useGetProducts();

	return (
		<div>
			<h1>Products</h1>
			{isLoading && <div className="text-9xl">Loading</div>}
			<div className="grid items-center justify-center gap-8 grid-cols-1 lg:grid-cols-2">
				{isSuccess &&
					products.map((product: ProductDetails) => {
						return (
							<ProductDisplay
								key={product._id}
								_id={product._id}
								name={product.name}
								description={product.description}
								price={product.price}
								category={product.category}
								image={product.image}
								imageCloudId={product.imageCloudId}
							/>
						);
					})}
			</div>
		</div>
	);
}

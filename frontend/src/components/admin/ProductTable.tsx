import React from "react";
import { useGetProducts } from "../../hooks/products/useGetProducts";
import TableRow from "./TableRow";

export default function ProductTable() {
	const { isLoading, isError, isSuccess, data: products } = useGetProducts();
	return (
		<div>
			<h1>ProductUpdatePage</h1>
			<table className="table table-compact w-full">
				<thead>
					<tr>
						<th>Name</th>
						<th>Category</th>
						<th>Price</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{isSuccess &&
						products.map((product) => {
							return (
								<TableRow
									key={product._id}
									_id={product._id}
									category={product.category}
									description={product.description}
									image={product.image}
									imageCloudId={product.imageCloudId}
									name={product.name}
									price={product.price}
								/>
							);
						})}
				</tbody>
			</table>
		</div>
	);
}

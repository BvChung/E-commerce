import { useState } from "react";
import { useGetProducts } from "../../hooks/products/useGetProducts";
import { ProductInfo } from "../../interfaces/productInterface";
import ProductDisplayItem from "./ProductDisplayItem";

interface Filter {
	sofa: string;
	table: string;
	chair: string;
	desk: string;
	drawer: string;
	shelf: string;
	[key: string]: any;
}
interface test {
	category: string;

	[key: string]: any;
}

export default function ProductPage() {
	const { isLoading, isError, isSuccess, data: products } = useGetProducts();
	const [filterProducts, setFilterProducts] = useState<Filter>({
		sofa: "Sofa",
		table: "Table",
		chair: "",
		desk: "",
		drawer: "",
		shelf: "",
	});

	const test = {
		sofa: "Sofa",
		table: "Table",
	};
	const t = ["Sofa", "Table"];
	for (const key in test) {
		console.log(key);
	}
	//console.log(test["sofa"]);
	//Object.entries(test).map(([key, value]) => console.log(key, value));

	return (
		<div className="flex">
			<div className="flex flex-col shadow-md rounded-lg h-fit w-80 border-[1px] p-4">
				<div className="flex gap-2">
					<div className="w-24">Sofa</div>
					<input type="checkbox" className="checkbox checkbox-md" />
				</div>
				<div className="flex gap-2">
					<p>Table</p>
					<input type="checkbox" className="checkbox checkbox-md" />
				</div>
				<div className="flex gap-2">
					<p>Chair</p>
					<input type="checkbox" className="checkbox checkbox-md" />
				</div>
				<div className="flex gap-2">
					<p>Desk</p>
					<input type="checkbox" className="checkbox checkbox-md" />
				</div>
				<div className="flex gap-2">
					<p>Drawer</p>
					<input type="checkbox" className="checkbox checkbox-md" />
				</div>
				<div className="flex gap-2">
					<p>Shelf</p>
					<input type="checkbox" className="checkbox checkbox-md" />
				</div>
			</div>

			{isLoading && <div className="text-9xl">Loading</div>}
			<div className="grid items-center justify-center gap-8 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
				{isSuccess &&
					products
						.filter((product) => {
							// for (const [key, value] of Object.entries(test)) {
							// 	if (value === product.category) {
							// 		return product.category === value;
							// 	}
							// }
							return product;
						})
						.map((product: ProductInfo) => {
							return (
								<ProductDisplayItem
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

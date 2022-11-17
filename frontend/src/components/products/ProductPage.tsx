import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGetProduct } from "../../hooks/products/useGetProduct";
import { ProductInfo } from "../../interfaces/productInterface";
import ProductDisplay from "./ProductDisplay";
import FiltersModal from "./modal/FiltersModal";
import Filters from "./Filters";
import { useSearchParams } from "react-router-dom";

interface FilterProducts {
	category: string[];
	priceLow: number | string;
	priceHigh: number | string;
}

export default function ProductPage() {
	const ref = useRef<HTMLInputElement>(null);

	const navigate = useNavigate();
	let [searchParams, setSearchParams] = useSearchParams();
	const [filter, setFilter] = useState<FilterProducts>({
		category: [],
		priceLow: 0,
		priceHigh: 0,
	});

	function handleChange(
		e: React.ChangeEvent<HTMLInputElement>,
		category: string
	) {
		// Add category to query array when checked
		// Remove category from query array when unchecked

		if (e.target.checked) {
			setFilter((prev) => {
				return {
					...prev,
					category: [...prev.category, category],
				};
			});
		} else {
			setFilter((prev) => {
				return {
					...prev,
					category: prev.category.filter((el) => el !== category),
				};
			});
		}
	}

	useEffect(() => {
		//
		if (filter.priceLow && filter.priceHigh) {
			setSearchParams((prev) => {
				return {
					...prev,
					filters: filter.category.map((el) => el.toLowerCase()),
					pl: filter.priceLow,
					ph: filter.priceHigh,
				};
			});
		} else if (!filter.priceLow && !filter.priceHigh) {
			setSearchParams((prev) => {
				return {
					...prev,
					filters: filter.category.map((el) => el.toLowerCase()),
				};
			});
		}
	}, [filter]);

	const {
		isLoading,
		isError,
		isSuccess,
		data: products,
	} = useGetProduct(filter);

	const displayProducts =
		isSuccess && products.length !== 0 ? (
			<div className="grid gap-10 w-full products justify-center mt-6">
				{products.map((product: ProductInfo) => {
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
		) : (
			isSuccess && (
				<div className="flex flex-col items-center justify-center w-full lg:min-w-[1040px]">
					<h1 className="font-bold text-gray-800 text-3xl mb-6">
						We couldn't find a match
					</h1>
					<p className="text-base mb-8">
						Let's reset your filters and try again
					</p>
					<button
						onClick={() => {
							navigate(0);
						}}
						className="btn h-11 rounded-full"
					>
						Clear filters
					</button>
				</div>
			)
		);

	return (
		<div className="flex justify-center my-8 w-full h-full">
			<div className="flex flex-col justify-center w-full h-full lg:max-w-6xl xl:max-w-7xl mx-4 sm:mx-6 lg:mx-0">
				<div className="flex gap-2 justify-start w-full lg:max-w-3xl xl:max-w-4xl">
					<FiltersModal handleChange={handleChange} setFilter={setFilter} />
				</div>

				<div className="flex justify-center w-full h-full">
					{/* <div className="mr-8 hidden lg:block max-w-[14rem]">
						<p className="text-sm mb-1">Filters</p>

						<Filters
							handleChange={handleChange}
							setFilter={setFilter}
							filter={filter}
						/>
					</div> */}

					{displayProducts}
				</div>
			</div>
		</div>
	);
}

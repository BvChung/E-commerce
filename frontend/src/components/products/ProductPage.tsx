import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryProducts } from "../../hooks/products/useQueryProducts";
import { ProductInfo } from "../../interfaces/productInterface";
import DisplayItem from "./DisplayItem";
import FiltersModal from "./modal/FiltersModal";
import { useSearchParams } from "react-router-dom";
import Spinner from "../loading/Spinner";

interface FilterProducts {
	category: string[];
	priceLow: number | string;
	priceHigh: number | string;
}

export default function ProductPage() {
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

	const { isLoading, isSuccess, data: products } = useQueryProducts(filter);

	const displayProducts =
		isSuccess && products.length !== 0 ? (
			<div className="grid gap-10 w-full products justify-center mt-6">
				{products.map((product: ProductInfo) => {
					return (
						<DisplayItem
							key={product._id}
							_id={product._id}
							name={product.name}
							description={product.description}
							color={product.color}
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
				<div className="flex flex-col items-center justify-center w-full lg:min-w-[1040px] mb-9">
					<h1 className="font-bold text-gray-800 text-3xl mb-6">
						We couldn't find a match
					</h1>
					<p className="text-base mb-6">
						Let's reset your filters and try again
					</p>
					<button
						onClick={() => {
							navigate(0);
						}}
						className="btn btn-secondary h-11 rounded-full"
					>
						Clear filters
					</button>
				</div>
			)
		);

	return (
		<>
			<div className="flex justify-center my-8 w-full h-full">
				<div className="flex flex-col justify-center w-full h-full lg:max-w-6xl xl:max-w-7xl mx-4 sm:mx-6 lg:mx-0">
					<div className="flex gap-2 justify-start w-full lg:max-w-3xl xl:max-w-4xl">
						<FiltersModal handleChange={handleChange} setFilter={setFilter} />
					</div>

					{!isLoading ? (
						<div className="flex justify-center w-full h-full">
							{displayProducts}
						</div>
					) : (
						<Spinner />
					)}
				</div>
			</div>
		</>
	);
}

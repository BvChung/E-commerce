import { useState, useEffect } from "react";
import { useGetProducts } from "../../hooks/products/useGetProducts";
import { ProductInfo } from "../../interfaces/productInterface";
import ProductDisplayItem from "./ProductDisplayItem";

interface Filter {
	category: string;
}

interface FilterCategory {
	type: string;
	name: string;
}
interface FilterPrice {
	under100: boolean;
	btwn100_500: boolean;
	btwn500_1000: boolean;
	above1000: boolean;
}

export default function ProductPage() {
	const { isLoading, isError, isSuccess, data: products } = useGetProducts();

	const [filterCategory, setFilterCategory] = useState<FilterCategory[]>([]);

	function handleChange(
		e: React.ChangeEvent<HTMLInputElement>,
		category: string
	) {
		if (e.target.checked) {
			setFilterCategory((prev) => {
				return [...prev, { type: "category", name: category }];
			});
		} else {
			setFilterCategory((prev) => {
				return prev.filter((el) => el.name !== category);
			});
		}
	}

	const [filterPrice, setFilterPrice] = useState<FilterPrice>({
		under100: false,
		btwn100_500: false,
		btwn500_1000: false,
		above1000: false,
	});

	// const ex = products?.filter((product) =>
	// 	filterCategory.some((filterEl) => product[filterEl.type] === filterEl.name)
	// );
	// console.log(ex);
	return (
		<div className="flex flex-col justify-center items-center lg:items-start lg:flex-row lg:justify-center my-8 md:my-10 ">
			<div className="lg:hidden collapse collapse-arrow border border-base-300 bg-base-100 h-fit w-48 rounded-lg max-h-96">
				<input type="checkbox" className="peer" />
				<div className="collapse-title bg- bg-primary text-primary-content peer-checked:font-medium peer-checked:bg-secondary peer-checked:text-secondary-content">
					Category
				</div>
				<div className="h-fit collapse-content bg-opacity-50 bg-primary text-primary-content peer-checked:bg-secondary">
					<div className="flex flex-col gap-2 h-fit">
						<div className="flex gap-3">
							<input
								onChange={(e) => {
									handleChange(e, "Sofa");
								}}
								type="checkbox"
								className="checkbox checkbox-md"
							/>
							<div className="">Sofa</div>
						</div>
						<div className="flex gap-3">
							<input
								onChange={(e) => {
									handleChange(e, "Table");
								}}
								type="checkbox"
								className="checkbox checkbox-md"
							/>
							<p>Table</p>
						</div>
						<div className="flex gap-3">
							<input
								onChange={(e) => {
									handleChange(e, "Chair");
								}}
								type="checkbox"
								className="checkbox checkbox-md"
							/>
							<p>Chair</p>
						</div>
						<div className="flex gap-3">
							<input
								onChange={(e) => {
									handleChange(e, "Desk");
								}}
								type="checkbox"
								className="checkbox checkbox-md"
							/>
							<p>Desk</p>
						</div>
						<div className="flex gap-3">
							<input
								onChange={(e) => {
									handleChange(e, "Drawer");
								}}
								type="checkbox"
								className="checkbox checkbox-md"
							/>
							<p>Drawer</p>
						</div>
						<div className="flex gap-3">
							<input
								onChange={(e) => {
									handleChange(e, "Shelf");
								}}
								type="checkbox"
								className="checkbox checkbox-md"
							/>
							<p>Shelf</p>
						</div>
					</div>
				</div>
			</div>
			<div className="mr-8 hidden lg:block">
				<p className="text-sm mb-1">Filters</p>
				<div className="collapse collapse-arrow shadow-sm border border-base-300 bg-base-100 h-fit w-52 rounded-lg max-h-96 mb-6">
					<input type="checkbox" className="peer" />
					<div className="collapse-title peer-checked:font-medium peer-checked:text-secondary-content">
						Category
					</div>
					<div className="h-fit collapse-content">
						<div className="flex flex-col gap-2 h-fit text-sm">
							<div className="flex items-center gap-3">
								<input
									onChange={(e) => {
										handleChange(e, "Sofa");
									}}
									type="checkbox"
									className="checkbox checkbox-md checkbox-secondary"
								/>
								<div className="">Sofa</div>
							</div>
							<div className="flex items-center gap-3">
								<input
									onChange={(e) => {
										handleChange(e, "Table");
									}}
									type="checkbox"
									className="checkbox checkbox-md checkbox-secondary"
								/>
								<p>Table</p>
							</div>
							<div className="flex items-center gap-3">
								<input
									onChange={(e) => {
										handleChange(e, "Chair");
									}}
									type="checkbox"
									className="checkbox checkbox-md checkbox-secondary"
								/>
								<p>Chair</p>
							</div>
							<div className="flex items-center gap-3">
								<input
									onChange={(e) => {
										handleChange(e, "Desk");
									}}
									type="checkbox"
									className="checkbox checkbox-md checkbox-secondary"
								/>
								<p>Desk</p>
							</div>
							<div className="flex items-center gap-3">
								<input
									onChange={(e) => {
										handleChange(e, "Drawer");
									}}
									type="checkbox"
									className="checkbox checkbox-md checkbox-secondary"
								/>
								<p>Drawer</p>
							</div>
							<div className="flex items-center gap-3">
								<input
									onChange={(e) => {
										handleChange(e, "Shelf");
									}}
									type="checkbox"
									className="checkbox checkbox-md checkbox-secondary"
								/>
								<p>Shelf</p>
							</div>
						</div>
					</div>
				</div>

				<div className="collapse collapse-arrow border border-base-300 bg-base-100 h-fit w-52 rounded-lg max-h-96">
					<input type="checkbox" className="peer" />
					<div className="collapse-title peer-checked:font-medium peer-checked:text-secondary-content">
						Price Range
					</div>
					<div className="h-fit collapse-content">
						<div className="flex flex-col gap-2 h-fit text-sm">
							<div className="flex items-center gap-3">
								<input
									type="radio"
									name="filterPrice"
									onChange={(e) => {
										if (e.target.checked) {
											setFilterPrice({
												under100: true,
												btwn100_500: false,
												btwn500_1000: false,
												above1000: false,
											});
										}
									}}
									className="radio radio-secondary"
								/>
								<p>Under $100</p>
							</div>
							<div className="flex items-center gap-3">
								<input
									type="radio"
									name="filterPrice"
									onChange={(e) => {
										if (e.target.checked) {
											setFilterPrice({
												under100: false,
												btwn100_500: true,
												btwn500_1000: false,
												above1000: false,
											});
										}
									}}
									className="radio radio-secondary"
								/>

								<p>$100 to $500</p>
							</div>
							<div className="flex items-center gap-3">
								<input
									type="radio"
									name="filterPrice"
									onChange={(e) => {
										if (e.target.checked) {
											setFilterPrice({
												under100: false,
												btwn100_500: false,
												btwn500_1000: true,
												above1000: false,
											});
										}
									}}
									className="radio radio-secondary"
								/>
								<p>$500 to $1000</p>
							</div>
							<div className="flex items-center gap-3">
								<input
									type="radio"
									name="filterPrice"
									onChange={(e) => {
										if (e.target.checked) {
											setFilterPrice({
												under100: false,
												btwn100_500: false,
												btwn500_1000: false,
												above1000: true,
											});
										}
									}}
									className="radio radio-secondary"
								/>
								<p>$1000 and above</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 items-center justify-center">
				{isSuccess &&
					products
						.filter((product) => {
							if (filterCategory.length > 0) {
								return filterCategory.some(
									(filterEl) => product[filterEl.type] === filterEl.name
								);
							} else {
								return product;
							}
						})
						.filter((product) => {
							if (filterPrice.under100) {
								return product.price < 100;
							} else if (filterPrice.btwn100_500) {
								return product.price >= 100 && product.price < 500;
							} else if (filterPrice.btwn500_1000) {
								return product.price >= 500 && product.price < 1000;
							} else if (filterPrice.above1000) {
								return product.price >= 1000;
							} else {
								return product;
							}
						})
						.map((product: ProductInfo, i, arr) => {
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

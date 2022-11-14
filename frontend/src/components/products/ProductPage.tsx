import { useState, useEffect } from "react";
import { useGetProducts } from "../../hooks/products/useGetProducts";
import { ProductInfo } from "../../interfaces/productInterface";
import ProductDisplay from "./ProductDisplay";
import { useSearchParams } from "react-router-dom";

interface FilterC {
	type: string;
	name: string;
}
interface FilterP {
	under100: boolean;
	btwn100_500: boolean;
	btwn500_1000: boolean;
	above1000: boolean;
}

interface FilterPrice {
	priceLow: number | string;
	priceHigh: number | string;
}

interface FilterProducts {
	category: string[];
	priceLow: number | string;
	priceHigh: number | string;
}

export default function ProductPage() {
	const { isLoading, isError, isSuccess, data: products } = useGetProducts();

	const [filterC, setFilterC] = useState<FilterC[]>([]);
	let [searchParams, setSearchParams] = useSearchParams();
	const [filterCategory, setFilterCategory] = useState<string[]>([]);
	const [filter, setFilter] = useState<FilterProducts>({
		category: [],
		priceLow: -1,
		priceHigh: -1,
	});

	const [filterPrice, setFilterPrice] = useState<FilterPrice>({
		priceLow: 0,
		priceHigh: 0,
	});
	console.log(filter);

	function handleChange(
		e: React.ChangeEvent<HTMLInputElement>,
		category: string
	) {
		if (e.target.checked) {
			setFilterC((prev) => {
				return [...prev, { type: "category", name: category }];
			});

			setFilterCategory((prev) => {
				return [...prev, category];
			});

			setFilter((prev) => {
				return {
					...prev,
					category: [...prev.category, category],
				};
			});
		} else {
			setFilterC((prev) => {
				return prev.filter((el) => el.name !== category);
			});

			setFilterCategory((prev) => {
				return prev.filter((el) => el !== category);
			});

			setFilter((prev) => {
				return {
					...prev,
					category: prev.category.filter((el) => el !== category),
				};
			});
		}
	}

	const [filterP, setFilterP] = useState<FilterP>({
		under100: false,
		btwn100_500: false,
		btwn500_1000: false,
		above1000: false,
	});

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		let formData = new FormData(event.currentTarget);
		let newUser = formData.get("user") as string;
		console.log(newUser);
		if (!newUser) return;
		setSearchParams({ user: [newUser, newUser, newUser], time: newUser });
	}

	useEffect(() => {
		if (filter.priceLow !== -1 && filter.priceHigh !== -1) {
			setSearchParams((prev) => {
				return {
					...prev,
					filters: filter.category,
					pl: filter.priceLow,
					ph: filter.priceHigh,
				};
			});
		} else if (filter.priceLow === -1 && filter.priceHigh === -1) {
			setSearchParams((prev) => {
				return {
					...prev,
					filters: filter.category,
				};
			});
		}
	}, [filter]);
	console.log(searchParams.getAll("filters"));

	// useEffect(() => {
	// 	setSearchParams((prev) => {
	// 		return {
	// 			...prev,
	// 			pl: filterPrice.priceLow,
	// 			ph: filterPrice.priceHigh,
	// 		};
	// 	});
	// }, [filterPrice]);

	// const ex = products?.filter((product) =>
	// 	filterC.some((filterEl) => product[filterEl.type] === filterEl.name)
	// );
	// console.log(ex);
	return (
		<div className="flex flex-col justify-center items-center lg:items-start lg:flex-row lg:justify-center my-8 md:my-10 ">
			{/* <form onSubmit={handleSubmit}>
				<label>
					<input type="text" name="user" />
				</label>
				<button type="submit">Search</button>
			</form> */}

			{/* <div className="dropdown dropdown-end">
				<label tabIndex={0} className="btn btn-ghost btn-circle avatar">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.8}
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
						/>
					</svg>
				</label>
				<ul
					tabIndex={0}
					className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
				>
					<li>
						<div>
							<div className="flex items-center gap-2">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-6 h-6"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
									/>
								</svg>

								<span>Sign Up or Sign in</span>
							</div>
						</div>
					</li>
				</ul>
			</div> */}

			<div className="mr-8 hidden lg:block">
				<p className="text-sm mb-1">Filters</p>
				<div className="collapse collapse-arrow border border-base-300 border-b-0 bg-base-100 h-fit w-52 max-h-96">
					<input type="checkbox" className="peer" />
					<div className="collapse-title font-medium peer-checked:font-semibold">
						Category
					</div>
					<div className="h-fit collapse-content">
						<div className="flex flex-col gap-2 h-fit text-sm">
							<div className="flex items-center gap-3">
								<input
									onChange={(e) => {
										handleChange(e, "Sofa");
									}}
									id="sofa"
									autoComplete="off"
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
									autoComplete="off"
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
									autoComplete="off"
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
									autoComplete="off"
									type="checkbox"
									className="checkbox checkbox-md checkbox-secondary"
								/>
								<p>Desk</p>
							</div>
							<div className="flex items-center gap-3">
								<input
									onChange={(e) => {
										console.log(e.target.checked);
										handleChange(e, "Drawer");
									}}
									autoComplete="off"
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
									autoComplete="off"
									type="checkbox"
									className="checkbox checkbox-md checkbox-secondary"
								/>
								<p>Shelf</p>
							</div>
						</div>
					</div>
				</div>

				<div className="collapse collapse-arrow border border-base-300 bg-base-100 h-fit w-52 max-h-96">
					<input type="checkbox" className="peer" />
					<div className="collapse-title font-medium peer-checked:font-semibold">
						Price Range
					</div>
					<div className="h-fit collapse-content">
						<div className="flex flex-col gap-2 h-fit text-sm">
							<div className="flex items-center gap-3">
								<input
									type="radio"
									name="filterP"
									onChange={(e) => {
										if (e.target.checked) {
											setFilterPrice({
												priceLow: "min",
												priceHigh: 100,
											});

											setFilter((prev) => {
												return {
													...prev,
													priceLow: "min",
													priceHigh: 100,
												};
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
									name="filterP"
									onChange={(e) => {
										if (e.target.checked) {
											setFilterPrice({
												priceLow: 100,
												priceHigh: 500,
											});
											setFilter((prev) => {
												return {
													...prev,
													priceLow: 100,
													priceHigh: 500,
												};
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
									name="filterP"
									onChange={(e) => {
										if (e.target.checked) {
											setFilter((prev) => {
												return {
													...prev,
													priceLow: 500,
													priceHigh: 1000,
												};
											});

											setFilterPrice({
												priceLow: 500,
												priceHigh: 1000,
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
									name="filterP"
									onChange={(e) => {
										if (e.target.checked) {
											setFilter((prev) => {
												return {
													...prev,
													priceLow: 1000,
													priceHigh: "max",
												};
											});

											setFilterPrice({
												priceLow: 1000,
												priceHigh: "max",
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
							if (filterC.length > 0) {
								return filterC.some(
									(filterEl) => product[filterEl.type] === filterEl.name
								);
							} else {
								return product;
							}
						})
						.filter((product) => {
							if (filterP.under100) {
								return product.price < 100;
							} else if (filterP.btwn100_500) {
								return product.price >= 100 && product.price < 500;
							} else if (filterP.btwn500_1000) {
								return product.price >= 500 && product.price < 1000;
							} else if (filterP.above1000) {
								return product.price >= 1000;
							} else {
								return product;
							}
						})
						.map((product: ProductInfo, i, arr) => {
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

import { useState, useMemo } from "react";
import { useGetProducts } from "../../hooks/products/useGetProducts";
import TableRow from "./TableRow";
import { useDeleteProduct } from "../../hooks/admin/useDeleteProduct";
import { ProductInfo, SortProducts } from "../../interfaces/productInterface";

export default function ProductTable() {
	const { isLoading, isError, isSuccess, data: products } = useGetProducts();
	const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
	const [itemId, setItemId] = useState<string>("");
	const { mutate } = useDeleteProduct();

	const [sortTable, setSortTable] = useState<SortProducts>({
		field: "",
		name: {
			sortDescending: false,
		},
		category: { sortDescending: false },
		price: { sortDescending: false },
	});

	const [searchText, setSearchText] = useState<string>("");

	// const sortedProducts = useMemo(() => {
	// 	if (!isSuccess) return;

	// 	return products.sort((a: ProductInfo, b: ProductInfo) => {
	// 		if (sortTable.field === "") return 0;

	// 		if (sortTable[sortTable.field].sortDescending) {
	// 			const itemA =
	// 				sortTable.field !== "price"
	// 					? a[sortTable.field].toLowerCase()
	// 					: a[sortTable.field];
	// 			const itemB =
	// 				sortTable.field !== "price"
	// 					? b[sortTable.field].toLowerCase()
	// 					: b[sortTable.field];

	// 			if (itemA < itemB) {
	// 				return 1;
	// 			}
	// 			if (itemA > itemB) {
	// 				return -1;
	// 			}
	// 			// names must be equal
	// 			return 0;
	// 		} else {
	// 			const itemA =
	// 				sortTable.field !== "price"
	// 					? a[sortTable.field].toLowerCase()
	// 					: a[sortTable.field];
	// 			const itemB =
	// 				sortTable.field !== "price"
	// 					? b[sortTable.field].toLowerCase()
	// 					: b[sortTable.field];

	// 			if (itemA < itemB) {
	// 				return -1;
	// 			}
	// 			if (itemA > itemB) {
	// 				return 1;
	// 			}
	// 			// names must be equal
	// 			return 0;
	// 		}
	// 	});
	// }, [sortTable, products]);

	function displayRows() {
		if (!isSuccess) return;

		return products
			.filter((product) => {
				return product.name.toLowerCase().includes(searchText.toLowerCase());
			})
			.sort((a: ProductInfo, b: ProductInfo) => {
				if (sortTable.field === "") return 0;

				if (sortTable[sortTable.field].sortDescending) {
					const itemA =
						sortTable.field !== "price"
							? a[sortTable.field].toLowerCase()
							: a[sortTable.field];
					const itemB =
						sortTable.field !== "price"
							? b[sortTable.field].toLowerCase()
							: b[sortTable.field];

					if (itemA < itemB) {
						return 1;
					}
					if (itemA > itemB) {
						return -1;
					}
					// names must be equal
					return 0;
				} else {
					const itemA =
						sortTable.field !== "price"
							? a[sortTable.field].toLowerCase()
							: a[sortTable.field];
					const itemB =
						sortTable.field !== "price"
							? b[sortTable.field].toLowerCase()
							: b[sortTable.field];

					if (itemA < itemB) {
						return -1;
					}
					if (itemA > itemB) {
						return 1;
					}
					// names must be equal
					return 0;
				}
			})
			.map((product) => {
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
						setItemId={setItemId}
						setDeleteConfirmation={setDeleteConfirmation}
					/>
				);
			});
	}

	return (
		<div className="w-full mx-4">
			<h1>ProductUpdatePage</h1>
			<div className="flex justify-end">
				<div className="form-control w-fit ">
					<label className="input-group">
						<span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-5 h-5"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
								/>
							</svg>
						</span>
						<input
							type="text"
							placeholder="Search for product name"
							value={searchText}
							onChange={(e) => setSearchText(e.target.value)}
							className="input input-bordered"
						/>
					</label>
				</div>
			</div>
			<div className="w-full border-[1px] rounded-lg">
				<table className="table table-compact  w-full">
					<thead className="px-4">
						<tr>
							<th className="p-4">
								<div className="flex items-center gap-2">
									<p>Name</p>
									<div
										className="tooltip tooltip-bottom normal-case font-normal z-10"
										data-tip={
											sortTable.name.sortDescending
												? "Sort ascending"
												: "Sort descending"
										}
									>
										<button
											onClick={() => {
												setSortTable((prev) => {
													return {
														...prev,
														field: "name",
														name: {
															sortDescending: !prev.name.sortDescending,
														},
													};
												});
											}}
											className="btn-ghost p-2 h-fit w-fit rounded-full active:bg-gray-400 dark:active:bg-gray-700"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth={1.5}
												stroke="currentColor"
												className="w-5 h-5"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
												/>
											</svg>
										</button>
									</div>
								</div>
							</th>
							<th>
								<div className="flex items-center gap-2">
									<p>Category</p>
									<div
										className="tooltip tooltip-bottom normal-case font-normal z-10"
										data-tip={
											sortTable.category.sortDescending
												? "Sort ascending"
												: "Sort descending"
										}
									>
										<button
											onClick={() => {
												setSortTable((prev) => {
													return {
														...prev,
														field: "category",
														category: {
															sortDescending: !prev.category.sortDescending,
														},
													};
												});
											}}
											className="btn-ghost p-2 h-fit w-fit rounded-full active:bg-gray-400 dark:active:bg-gray-700"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth={1.5}
												stroke="currentColor"
												className="w-5 h-5"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
												/>
											</svg>
										</button>
									</div>
								</div>
							</th>
							<th>
								<div className="flex items-center gap-2">
									<p>Price</p>
									<div
										className="tooltip tooltip-bottom normal-case font-normal z-10"
										data-tip={
											sortTable.price.sortDescending
												? "Sort ascending"
												: "Sort descending"
										}
									>
										<button
											onClick={() => {
												setSortTable((prev) => {
													return {
														...prev,
														field: "price",
														price: {
															sortDescending: !prev.price.sortDescending,
														},
													};
												});
											}}
											className="btn-ghost p-2 h-fit w-fit rounded-full active:bg-gray-400 dark:active:bg-gray-700"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth={1.5}
												stroke="currentColor"
												className="w-5 h-5"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
												/>
											</svg>
										</button>
									</div>
								</div>
							</th>
							<th></th>
						</tr>
					</thead>
					<tbody>{displayRows()}</tbody>
				</table>
			</div>

			<div className={`modal ${deleteConfirmation && "modal-open"} `}>
				<div className="modal-box relative">
					<button
						onClick={() => {
							setDeleteConfirmation(false);
							setItemId("");
						}}
						className="btn btn-sm btn-circle absolute right-2 top-2"
					>
						✕
					</button>

					<h3 className="text-lg font-bold">Confirm deletion</h3>
					<p className="py-4">Are you sure you want to delete this item?</p>
					<div className="modal-action justify-end gap-4">
						<button
							onClick={() => {
								setDeleteConfirmation(false);
								setItemId("");
							}}
							className="btn btn-accent normal-case"
						>
							Cancel
						</button>

						<button
							onClick={() => {
								setDeleteConfirmation(false);
								mutate(itemId);
								setItemId("");
							}}
							className="btn btn-primary normal-case"
						>
							Delete
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

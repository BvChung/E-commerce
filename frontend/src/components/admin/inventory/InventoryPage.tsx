import { useState } from "react";
import { Link } from "react-router-dom";
import InventoryRow from "./InventoryRow";
import { useGetInventory } from "../../../hooks/admin/inventory/useGetInventory";
import {
	ProductInfo,
	SortProducts,
} from "../../../interfaces/productInterface";
import Spinner from "../../loading/Spinner";
import { useAuthContext } from "../../../hooks/context/useAuthContext";

export default function ProductTable() {
	const { isLoading, isSuccess, data: products } = useGetInventory();
	const { user } = useAuthContext();
	const [sortTable, setSortTable] = useState<SortProducts>({
		field: "",
		name: {
			sortDescending: false,
		},
		category: { sortDescending: false },
		price: { sortDescending: false },
	});
	const [findGuestProduct, setFindGuestProduct] = useState<boolean>(false);
	const [searchText, setSearchText] = useState<string>("");

	function displayRows() {
		if (!isSuccess) return;

		return products
			.filter((product) => {
				if (findGuestProduct) {
					return product.createdBy === "6321829716505e77a630034b";
				} else {
					return product.name.toLowerCase().includes(searchText.toLowerCase());
				}
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
					return 0;
				}
			})
			.map((product) => {
				return (
					<InventoryRow
						key={product._id}
						_id={product._id}
						category={product.category}
						description={product.description}
						color={product.color}
						image={product.image}
						imageCloudId={product.imageCloudId}
						name={product.name}
						price={product.price}
						createdBy={product.createdBy}
					/>
				);
			});
	}

	return (
		<div className="flex flex-col items-center h-full mb-10 mx-4 sm:mx-6 lg:mx-0">
			<div className="flex items-center gap-2 w-full mt-8 mb-8 pb-2 border-b-[1px] lg:max-w-5xl xl:max-w-6xl">
				<Link
					to={"/admin"}
					className="mr-2 cursor-pointer"
					aria-label="Return to admin page"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={2}
						stroke="currentColor"
						className="w-5 h-5"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
						/>
					</svg>
				</Link>
				<span className="font-medium text-xl sm:text-2xl">Inventory</span>
			</div>

			<div className="flex items-center justify-between w-full mb-4 lg:max-w-5xl xl:max-w-6xl">
				<button
					onClick={() => {
						setFindGuestProduct((prev) => !prev);
					}}
					className="btn btn-outline btn-info h-11 w-40 rounded-full"
				>
					<span className="text-sm">Product Demo</span>
				</button>

				<div className="form-control w-fit">
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
							placeholder="Search for product"
							value={searchText}
							onChange={(e) => setSearchText(e.target.value)}
							className="input input-bordered input-md"
						/>
					</label>
				</div>
			</div>

			{!isLoading ? (
				<div className="w-full lg:max-w-5xl xl:max-w-6xl border-[1px] rounded-lg mb-10 ">
					<table className="table table-compact w-full">
						<thead className="px-4">
							<tr>
								<th className="p-4 ">
									<div className="flex items-center gap-2">
										<span>Name</span>
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
												aria-label={
													sortTable.name.sortDescending
														? "Sort name ascending"
														: "Sort name descending"
												}
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
									<div className="hidden md:flex items-center gap-2">
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
												aria-label={
													sortTable.category.sortDescending
														? "Sort category ascending"
														: "Sort category descending"
												}
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
									<div className="hidden md:flex items-center gap-2">
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
												aria-label={
													sortTable.price.sortDescending
														? "Sort price ascending"
														: "Sort price descending"
												}
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
			) : (
				<Spinner minHeight="min-h-screen" />
			)}
		</div>
	);
}

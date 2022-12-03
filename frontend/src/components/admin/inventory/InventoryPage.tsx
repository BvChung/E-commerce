import { useState } from "react";
import { Link } from "react-router-dom";
import InventoryRow from "./InventoryRow";
import { useAuthContext } from "../../../hooks/context/useAuthContext";
import { useGetInventory } from "../../../hooks/admin/inventory/useGetInventory";
import { useDeleteProduct } from "../../../hooks/admin/inventory/useDeleteProduct";
import {
	ProductInfo,
	SortProducts,
} from "../../../interfaces/productInterface";
import Spinner from "../../loading/Spinner";
import { toast } from "react-toastify";

export default function ProductTable() {
	const { user } = useAuthContext();
	const { isLoading, isSuccess, data: products } = useGetInventory();
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
						setItemId={setItemId}
						setDeleteConfirmation={setDeleteConfirmation}
					/>
				);
			});
	}

	function deleteItem() {
		if (user.email === process.env.REACT_APP_GUEST_EMAIL) {
			return toast.error("Guest account cannot delete products.");
		}

		setDeleteConfirmation(false);
		mutate(itemId);
		setItemId("");
	}

	return (
		<div className="flex flex-col items-center h-full mb-10 mx-4 sm:mx-6 lg:mx-0">
			<div className="flex items-center gap-2 w-full mt-8 mb-8 pb-2 border-b-[1px] lg:max-w-5xl xl:max-w-6xl">
				<Link to={"/admin"} className="mr-2 cursor-pointer">
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

			<div className="flex justify-end w-full mb-4 lg:max-w-5xl xl:max-w-6xl">
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
							placeholder="Search for product"
							value={searchText}
							onChange={(e) => setSearchText(e.target.value)}
							className="input input-bordered input-sm md:input-md"
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
							className="btn px-6 rounded-full btn-outline btn-accent h-11 normal-case"
						>
							Cancel
						</button>

						<button
							onClick={deleteItem}
							className="btn px-6 rounded-full h-11 btn-secondary normal-case"
						>
							Delete
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

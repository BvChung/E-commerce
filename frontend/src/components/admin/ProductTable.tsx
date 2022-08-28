import { useState } from "react";
import { useGetProducts } from "../../hooks/products/useGetProducts";
import TableRow from "./TableRow";
import { useDeleteProduct } from "../../hooks/products/useDeleteProduct";
import { ProductInfo } from "../../interfaces/productInterface";

export default function ProductTable() {
	const {
		isLoading,
		isError,
		isSuccess,
		data: products,
		refetch,
	} = useGetProducts();
	const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
	const [itemId, setItemId] = useState<string>("");
	const { mutate } = useDeleteProduct();

	const [sortByName, setSortByName] = useState<boolean>(false);
	const [sortByCategory, setSortByCategory] = useState<boolean>(false);
	const [sortByPrice, setSortByPrice] = useState<boolean>(false);

	return (
		<div>
			<h1>ProductUpdatePage</h1>
			<table className="table table-compact w-full">
				<thead>
					<tr>
						<th className="flex items-center gap-2">
							<p>Name</p>
							<button
								onClick={() => {
									setSortByName((prev) => !prev);
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
						</th>
						<th>Category</th>
						<th>Price</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{isSuccess &&
						products
							.sort((a: ProductInfo, b: ProductInfo) => {
								if (sortByName) {
									if (a.name.toLowerCase() < b.name.toLowerCase()) {
										return -1;
									}
									if (a.name > b.name) {
										return 1;
									}
									// names must be equal
									// return 0;
								} else {
									if (a.name < b.name) {
										return 1;
									}
									if (a.name > b.name) {
										return -1;
									}
									// names must be equal
									// return 0;
								}

								if (sortByCategory) {
									if (a.name < b.name) {
										return -1;
									}
									if (a.name > b.name) {
										return 1;
									}
									// names must be equal
									return 0;
								} else {
									if (a.name < b.name) {
										return 1;
									}
									if (a.name > b.name) {
										return -1;
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
							})}
				</tbody>
			</table>

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

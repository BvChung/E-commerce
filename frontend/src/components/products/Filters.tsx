import React from "react";
import { useNavigate } from "react-router-dom";

interface FilterProducts {
	category: string[];
	priceLow: number | string;
	priceHigh: number | string;
}

interface Filters {
	handleChange(e: React.ChangeEvent<HTMLInputElement>, category: string): void;
	setFilter: React.Dispatch<React.SetStateAction<FilterProducts>>;
	filter: FilterProducts;
}

export default function Filters({ handleChange, setFilter, filter }: Filters) {
	const navigate = useNavigate();
	const displayClearBtn =
		filter.category.length > 0 ||
		(filter.priceHigh !== 0 && filter.priceLow !== 0);

	return (
		<>
			<div className="collapse collapse-arrow border-t border-base-300 bg-base-100 h-fit w-56">
				<input type="checkbox" className="peer" />
				<div className="collapse-title font-semibold peer-hover:underline">
					Category
				</div>
				<div className="h-fit collapse-content">
					<div className="flex flex-col gap-2 h-fit text-sm">
						<div className="flex items-center gap-2">
							<input
								onChange={(e) => {
									handleChange(e, "Sofa");
								}}
								id="sofa"
								name="sofa"
								// autoComplete="off"
								type="checkbox"
								className="checkbox checkbox-sm checkbox-secondary rounded-md border-2 border-gray-500"
							/>
							<span>Sofa</span>
						</div>
						<div className="flex items-center gap-2">
							<input
								onChange={(e) => {
									handleChange(e, "Table");
								}}
								autoComplete="off"
								type="checkbox"
								className="checkbox checkbox-sm checkbox-secondary rounded-md border-2 border-gray-500"
							/>
							<p>Table</p>
						</div>
						<div className="flex items-center gap-2">
							<input
								onChange={(e) => {
									handleChange(e, "Chair");
								}}
								autoComplete="off"
								type="checkbox"
								className="checkbox checkbox-sm checkbox-secondary rounded-md border-2 border-gray-500"
							/>
							<p>Chair</p>
						</div>
						<div className="flex items-center gap-2">
							<input
								onChange={(e) => {
									handleChange(e, "Desk");
								}}
								autoComplete="off"
								type="checkbox"
								className="checkbox checkbox-sm checkbox-secondary rounded-md border-2 border-gray-500"
							/>
							<p>Desk</p>
						</div>
						<div className="flex items-center gap-2">
							<input
								onChange={(e) => {
									handleChange(e, "Drawer");
								}}
								autoComplete="off"
								type="checkbox"
								className="checkbox checkbox-sm checkbox-secondary rounded-md border-2 border-gray-500"
							/>
							<p>Drawer</p>
						</div>
						<div className="flex items-center gap-2">
							<input
								onChange={(e) => {
									handleChange(e, "Shelf");
								}}
								autoComplete="off"
								type="checkbox"
								className="checkbox checkbox-sm checkbox-secondary rounded-md border-2 border-gray-500"
							/>
							<p>Shelf</p>
						</div>
					</div>
				</div>
			</div>

			<div className="collapse collapse-arrow border-y border-base-300 bg-base-100 h-fit w-full">
				<input type="checkbox" className="peer" />
				<div className="collapse-title font-semibold peer-hover:underline">
					Price Range
				</div>
				<div className="h-fit collapse-content">
					<div className="flex flex-col gap-2 h-fit text-sm">
						<div className="flex items-center gap-2">
							<input
								type="radio"
								name="filterP"
								onChange={(e) => {
									if (e.target.checked) {
										setFilter((prev) => {
											return {
												...prev,
												priceLow: "min",
												priceHigh: 100,
											};
										});
									}
								}}
								className="radio radio-sm radio-secondary border-2 border-gray-500"
							/>
							<p>Under $100</p>
						</div>
						<div className="flex items-center gap-2">
							<input
								type="radio"
								name="filterP"
								onChange={(e) => {
									if (e.target.checked) {
										setFilter((prev) => {
											return {
												...prev,
												priceLow: 100,
												priceHigh: 500,
											};
										});
									}
								}}
								className="radio radio-sm radio-secondary border-2 border-gray-500"
							/>

							<p>$100 to $500</p>
						</div>
						<div className="flex items-center gap-2">
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
									}
								}}
								className="radio radio-sm radio-secondary border-2 border-gray-500"
							/>
							<p>$500 to $1000</p>
						</div>
						<div className="flex items-center gap-2">
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
									}
								}}
								className="radio radio-sm radio-secondary border-2 border-gray-500"
							/>
							<p>$1000 and above</p>
						</div>
					</div>
				</div>
			</div>

			{displayClearBtn && (
				<button
					onClick={() => {
						navigate(0);
					}}
					className="btn btn-xs rounded-full btn-outline text-xs mt-4"
				>
					Clear all
				</button>
			)}
		</>
	);
}

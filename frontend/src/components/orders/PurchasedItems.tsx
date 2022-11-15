import React from "react";
import { Link } from "react-router-dom";
import { PurchasedItems } from "../../interfaces/orderInterface";
import { toast } from "react-toastify";

export default function PurchasedItems({
	_id,
	image,
	name,
	quantity,
	price,
	addCartItem,
	findCartItem,
}: PurchasedItems) {
	return (
		// <div key={_id} className="flex py-6 last:mb-0">
		// 	<Link to={`/products/${_id}`}>
		// 		<figure>
		// 			<img
		// 				src={image}
		// 				alt="product"
		// 				className="rounded-md h-32 w-32 object-cover"
		// 			></img>
		// 		</figure>
		// 	</Link>

		// 	<div className="flex flex-col flex-1 pl-4 md:px-6">
		// 		<div className="flex">
		// 			<div className="flex flex-col justify-center w-full mb-3">
		// 				<Link
		// 					to={`/products/${_id}`}
		// 					className="hover:link font-semibold mb-1 w-fit"
		// 				>
		// 					{name}
		// 				</Link>
		// 				<span className="hidden md:flex text-xs text-gray-500 mb-1">
		// 					ITEM {_id.slice(0, 7)}
		// 				</span>
		// 				<span className="text-sm font-medium">Quantity: {quantity}</span>
		// 				<span className="md:hidden mt-1">
		// 					<span className="text-sm font-bold">
		// 						${(quantity! * price).toFixed(2)}
		// 					</span>
		// 				</span>
		// 			</div>
		// 			<div className="hidden md:flex">
		// 				<span className="text-sm font-bold">
		// 					${(quantity! * price).toFixed(2)}
		// 				</span>
		// 			</div>
		// 		</div>
		// 		<div className="flex items-center">
		// 			<button
		// 				onClick={() => {
		// 					addCartItem({
		// 						_id: _id,
		// 						price: price,
		// 						quantity: 1,
		// 					});

		// 					toast.success(`${name} has been added to your cart.`);
		// 				}}
		// 				className={`btn rounded-full ${
		// 					!findCartItem(_id)?.quantity || findCartItem(_id)?.quantity! < 9
		// 						? "btn-outline"
		// 						: "btn-disabled"
		// 				} flex items-center h-8 gap-2`}
		// 			>
		// 				{(!findCartItem(_id)?.quantity ||
		// 					findCartItem(_id)?.quantity! < 9) && (
		// 					<svg
		// 						xmlns="http://www.w3.org/2000/svg"
		// 						fill="none"
		// 						viewBox="0 0 24 24"
		// 						strokeWidth={1.5}
		// 						stroke="currentColor"
		// 						className="w-4 h-4"
		// 					>
		// 						<path
		// 							strokeLinecap="round"
		// 							strokeLinejoin="round"
		// 							d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
		// 						/>
		// 					</svg>
		// 				)}
		// 				<span className="text-xs">
		// 					{!findCartItem(_id)?.quantity || findCartItem(_id)?.quantity! < 9
		// 						? "Buy again"
		// 						: "9 items max"}
		// 				</span>
		// 			</button>
		// 		</div>
		// 	</div>
		// </div>
		<></>
	);
}

import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetProductInfo } from "../../hooks/products/useGetProductInfo";
import { useCartContext } from "../../hooks/context/useCartContext";
import { toast } from "react-toastify";

export default function ProductInfo() {
	const params = useParams();
	const navigate = useNavigate();
	const {
		myCart,
		addCartItem,
		findCartItem,
		incrementCartQuantity,
		decrementCartQuantity,
	} = useCartContext();

	const { isSuccess, data: productInfo } = useGetProductInfo(params.id);

	const foundItem = findCartItem(productInfo?._id);

	return (
		<div className="flex flex-col items-center justify-center mb-10">
			<div className="flex items-center gap-2 w-full my-8 lg:max-w-6xl xl:max-w-7xl">
				<span className="font-semibold text-2xl">Product Info</span>
			</div>
			{isSuccess && (
				<div className="flex flex-col items-center justify-center w-full lg:max-w-6xl xl:max-w-7xl">
					<div></div>
					<div className="w-full flex justify-between">
						<div>
							<img src={productInfo.image} alt="Product"></img>
						</div>
						<div className="flex flex-col w-64 p-4 border-[1px] rounded-lg shadow-md">
							<p className="font-semibold text-xl text-gray-800 mb-4">
								{productInfo.name}
							</p>
							<p className="font-semibold text-2xl text-gray-900 mb-4">
								${productInfo.price.toFixed(2)}
							</p>
							<div>
								{!foundItem ? (
									<button
										onClick={() => {
											if (!productInfo) return;

											addCartItem({
												_id: productInfo._id,
												price: productInfo.price,
												quantity: 1,
											});

											toast.success(
												`${productInfo.name} has been added to your cart.`
											);
										}}
										className="btn rounded-full"
									>
										Add to cart
									</button>
								) : (
									<div className="btn-group">
										<button
											onClick={() => {
												decrementCartQuantity(productInfo._id);
											}}
											className={`btn rounded-md ${
												foundItem?.quantity === 0 && "btn-disabled"
											} `}
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-5 w-5"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
												strokeWidth={2}
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M18 12H6"
												/>
											</svg>
										</button>
										<div className="flex bg-gray-200 font-medium dark:text-white items-center justify-center w-fit px-4">
											{foundItem.quantity !== 9
												? `${foundItem?.quantity} Added`
												: `Max ${foundItem?.quantity}`}
										</div>
										<button
											onClick={() => {
												incrementCartQuantity(productInfo._id);
											}}
											className={`btn ${
												foundItem?.quantity === 9 && "btn-disabled"
											} `}
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-5 w-5"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
												strokeWidth={2}
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M12 6v6m0 0v6m0-6h6m-6 0H6"
												/>
											</svg>
										</button>
									</div>
								)}
							</div>
						</div>
					</div>
					<div className="w-full lg:max-w-4xl xl:max-w-5xl">
						<h1 className="card-title">Product Description</h1>
						<p>{productInfo.description}</p>
					</div>
				</div>
			)}
		</div>
	);
}

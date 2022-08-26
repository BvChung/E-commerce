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
		<div>
			<h1>ProductInfo</h1>
			{isSuccess && (
				<div className="grid md:grid-cols-2">
					<img src={productInfo.image} alt="Product"></img>
					<div className="flex flex-col justify-center">
						<p>{productInfo.name}</p>
						<p>{productInfo.price}</p>
						<div className="card-body">
							<h1 className="card-title">Product Description</h1>
							<p>{productInfo.description}</p>
						</div>
					</div>

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
								className="btn"
							>
								Add to cart
							</button>
						) : (
							<div className="btn-group ">
								<button
									onClick={() => {
										decrementCartQuantity(productInfo._id);
									}}
									className={`btn ${
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
								<div className="flex bg-inherit text-white items-center justify-center w-fit px-4">
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
			)}
		</div>
	);
}

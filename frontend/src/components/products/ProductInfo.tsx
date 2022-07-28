import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetProductInfo } from "../../hooks/products/useGetProductInfo";

export default function ProductInfo() {
	const params = useParams();
	const navigate = useNavigate();

	const {
		isLoading,
		isSuccess,
		data: productInfo,
	} = useGetProductInfo(params.id);

	console.log(productInfo);

	return (
		<div>
			<h1>ProductInfo</h1>
			{isSuccess && (
				<div>
					<p>{productInfo._id}</p>
					<p>{productInfo.name}</p>
					<p>{productInfo.description}</p>
					<p>{productInfo.image}</p>
					<p>{productInfo.price}</p>
				</div>
			)}
			<button
				onClick={() => {
					navigate("/checkout/information");
				}}
				className="btn"
			>
				Add to cart
			</button>
			<button
				onClick={() => {
					navigate("/checkout/information");
				}}
				className="btn"
			>
				Buy Now
			</button>
		</div>
	);
}

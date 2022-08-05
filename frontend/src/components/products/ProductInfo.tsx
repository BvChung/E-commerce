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

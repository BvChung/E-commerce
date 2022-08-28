import React from "react";
import { ProductInfo } from "../../interfaces/productInterface";
import { Link } from "react-router-dom";

export default function SearchedProducts({
	_id,
	category,
	description,
	image,
	imageCloudId,
	name,
	price,
}: ProductInfo) {
	return (
		<Link to={`/products/${_id}`}>
			<div>{name}</div>
		</Link>
	);
}

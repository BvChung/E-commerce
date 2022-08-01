import React from "react";
import { Link } from "react-router-dom";

interface ProductProps {
	_id: string;
	name: string;
	description: string;
	price: number;
	image: string;
}

export default function ProductDisplay({
	_id,
	name,
	description,
	price,
	image,
}: ProductProps) {
	return (
		<div className="card w-96 bg-base-100 shadow-xl">
			<Link to={_id}>
				<figure>
					<img src="https://placeimg.com/400/225/arch" alt="Shoes" />
				</figure>
				<div className="card-body">
					<h2 className="card-title">{name}</h2>
					<p>{description}</p>
					<p>{price}</p>
					<div className="card-actions justify-end"></div>
				</div>
			</Link>
		</div>
	);
}

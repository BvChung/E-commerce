import React from "react";

interface ProductProps {
	_id: string;
	name: string;
	description: string;
	price: number;
	image: string;
}

export default function ProductItem({
	_id,
	name,
	description,
	price,
	image,
}: ProductProps) {
	return (
		<div className="card w-96 bg-base-100 shadow-xl">
			<figure>
				<img src="https://placeimg.com/400/225/arch" alt="Shoes" />
			</figure>
			<div className="card-body">
				<h2 className="card-title">{name}</h2>
				<p>{description}</p>
				<p>{price}</p>
				<div className="card-actions justify-end">
					<button
						onClick={() => {
							console.log(_id);
						}}
						className="btn "
					>
						Buy Now
					</button>
				</div>
			</div>
		</div>
	);
}

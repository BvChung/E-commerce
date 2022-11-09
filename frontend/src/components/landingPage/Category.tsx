import React from "react";
import { Link } from "react-router-dom";

interface CategoryProps {
	image: string;
	title: string;
}

export default function Category({ image, title }: CategoryProps) {
	return (
		<Link
			to="products"
			className="flex justify-center items-center rounded-md shadow-sm w-full"
		>
			<div className="group overflow-hidden w-full relative">
				<img
					src={image}
					alt="Product"
					className="h-[250px] w-full object-cover hover:scale-105 transition-transform duration-500"
					loading="eager"
				/>
				<div className="absolute bottom-6 left-6">
					<span
						className="relative before:content-[''] before:absolute before:block before:w-full before:h-[2px] 
before:bottom-0 before:left-0 before:bg-white
group-hover:before:scale-x-100 before:scale-x-0 before:origin-top-left
before:transition before:ease-in-out before:duration-300 text-2xl font-semibold text-white"
					>
						{title}
					</span>
				</div>
			</div>
		</Link>
	);
}

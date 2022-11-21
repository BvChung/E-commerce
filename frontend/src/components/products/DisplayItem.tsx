import { Link } from "react-router-dom";
import { ProductInfo } from "../../interfaces/productInterface";
import { cldConfig } from "../../config/cloudinaryConfig";
import { AdvancedImage, lazyload } from "@cloudinary/react";
import { fill, crop, scale, fit } from "@cloudinary/url-gen/actions/resize";

export default function DisplayItem({
	_id,
	name,
	price,
	category,
	imageCloudId,
}: ProductInfo) {
	// console.log(imageCloudId);
	const productImg = cldConfig
		.image(imageCloudId)
		.format("auto")
		.quality("auto");

	return (
		<div className="w-full fade transition-all">
			<Link
				to={_id}
				className="card w-full min-w-[18rem] md:max-w-[20rem] rounded-md h-fit bg-base-100 border-[1px] shadow-sm"
			>
				<div className="overflow-hidden">
					<AdvancedImage
						cldImg={productImg}
						plugins={[
							lazyload({ rootMargin: "10px 20px 10px 30px", threshold: 0.25 }),
						]}
						className="h-[200px] w-full relative object-cover hover:scale-105 transition-transform duration-500"
						alt="Product"
					/>
					{/* <img
						src={image}
						alt="Product"
						className="h-[200px] w-full relative object-cover hover:scale-105 transition-transform duration-500"
						loading="lazy"
					/> */}
				</div>

				<div className="card-body p-6">
					<div className="card-actions">
						<div className="badge badge-sm badge-outline">{category}</div>
					</div>
					<h2 className="font-medium text-lg">{name}</h2>
					<span className="font-semibold text-lg">${price.toFixed(2)}</span>
				</div>
			</Link>
		</div>
	);
}

import { Schema, model } from "mongoose";

interface Product {
	name: string;
	description: string;
	price: number;
	category: string;
	image: string;
	imageCloudId: string;
}

const productSchema = new Schema<Product>(
	{
		name: {
			type: String,
			required: [true, "Product name is required"],
			default: "",
		},
		description: {
			type: String,
			required: [true, "Product description is required"],
			default: "",
		},
		price: {
			type: Number,
			required: [true, "Product price is required"],
		},
		category: {
			type: String,
			required: [true, "Product category is required"],
			default: "",
		},
		image: {
			type: String,
			required: [true, "Product image is required"],
			default: "",
		},
		imageCloudId: {
			type: String,
			required: [true, "Product image is required"],
			default: "",
		},
	},
	{
		timestamps: true,
	}
);

const ProductModel = model<Product>("Product", productSchema);

export default ProductModel;

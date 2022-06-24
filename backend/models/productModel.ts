import { Schema, model } from "mongoose";

interface Product {
	productName: string;
	description: string;
	price: number;
	image: string;
	imageCloudId: string;
}

const productSchema = new Schema<Product>(
	{
		productName: {
			type: String,
			required: [true, "Product name is required"],
			default: "",
		},
		description: {
			type: String,
			required: [true, "Product description is required"],
			unique: true,
			default: "",
		},
		price: {
			type: Number,
			required: [true, "Product price is required"],
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

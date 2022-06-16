import { Schema, model } from "mongoose";

interface Product {
	productName: string;
	description: string;
	image: string;
	imageCloudId: string;
	price: string;
	quantity: number;
}

const productSchema = new Schema<Product>(
	{
		productName: {
			type: String,
			required: [true, "Name is required"],
			default: "",
		},
		description: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
			default: "",
		},
		image: {
			type: String,
			required: [true, "Password is required"],
			default: "",
		},
		imageCloudId: {
			type: String,
			default: "",
		},
		price: {
			type: String,
			required: [true, "Price is required"],
			default: "",
		},
		quantity: {
			type: Number,
			required: [true, "Quantity is required"],
		},
	},
	{
		timestamps: true,
	}
);

const ProductModel = model<Product>("Product", productSchema);

export default ProductModel;

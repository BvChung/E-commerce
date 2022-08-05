import { Types, Schema, model } from "mongoose";

interface Order {
	user: Types.ObjectId;
	customerName: string;
	purchasedItems: {
		productId: Schema.Types.ObjectId;
		name: string;
		quantity: number;
		image: string;
		imageCloudId: string;
		price: number;
	}[];
	shippingAddress: {
		address: string;
		city: string;
		country: string;
		postalCode: string;
	};
	paymentDetails: {
		paymentType: string;
		cardNumber: string;
		totalCost: number;
		datePurchased: string;
	};
}

const orderSchema = new Schema<Order>(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		customerName: {
			type: String,
			required: [true, "Name is required"],
			ref: "User",
		},
		shippingAddress: {
			address: { type: String, required: true },
			city: { type: String, required: true },
			country: { type: String, required: true },
			postalCode: { type: String, required: true },
		},
		purchasedItems: [
			{
				productId: {
					type: Schema.Types.ObjectId,
					required: true,
					ref: "Product",
				},
				name: { type: String, required: true, ref: "Product" },
				quantity: { type: Number, required: true },
				image: { type: String, required: true, ref: "Product" },
				imageCloudId: { type: String, required: true, ref: "Product" },
				price: { type: Number, required: true, ref: "Product" },
			},
		],
		paymentDetails: {
			paymentType: { type: String, required: true },
			cardNumber: { type: String, required: true },
			totalCost: { type: Number, required: true },
			datePurchased: { type: String, required: true },
		},
	},
	{
		timestamps: true,
	}
);

const OrderModel = model<Order>("Order", orderSchema);

export default OrderModel;

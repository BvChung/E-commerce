import { Types, Schema, model } from "mongoose";

interface Order {
	purchasedItems: {
		productId: Schema.Types.ObjectId;
		name: string;
		description: string;
		category: string;
		price: number;
		quantity: number;
		image: string;
		imageCloudId: string;
	}[];
	shippingInfo: {
		firstName: string;
		lastName: string;
		address: string;
		aptSuiteEtc: string;
		state: string;
		city: string;
		postalCode: string;
		phone: string;
		email: string;
	};
	paymentInfo: {
		paymentType: string;
		cardNumber: string;
		cardHolder: string;
		expiryDateMonth: string;
		expiryDateYear: string;
		securityCode: string;
		totalCost: number;
		datePurchased: string;
	};
}

const orderSchema = new Schema<Order>(
	{
		shippingInfo: {
			firstName: { type: String, required: true },
			lastName: { type: String, required: true },
			address: { type: String, required: true },
			aptSuiteEtc: { type: String, required: true },
			state: { type: String, required: true },
			city: { type: String, required: true },
			postalCode: { type: String, required: true },
			phone: { type: String, required: true },
			email: { type: String, required: true },
		},
		purchasedItems: [
			{
				productId: {
					type: Schema.Types.ObjectId,
					required: true,
					ref: "Product",
				},
				name: { type: String, required: true, ref: "Product" },
				description: { type: String, required: true, ref: "Product" },
				category: { type: String, required: true, ref: "Product" },
				price: { type: Number, required: true, ref: "Product" },
				quantity: { type: Number, required: true },
				image: { type: String, required: true, ref: "Product" },
				imageCloudId: { type: String, required: true, ref: "Product" },
			},
		],
		paymentInfo: {
			paymentType: { type: String, required: true },
			cardNumber: { type: String, required: true },
			cardHolder: { type: String, required: true },
			expiryDateMonth: { type: String, required: true },
			expiryDateYear: { type: String, required: true },
			securityCode: { type: String, required: true },
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

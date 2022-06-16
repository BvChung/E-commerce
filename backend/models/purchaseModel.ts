import { Types, Schema, model } from "mongoose";

interface Purchase {
	user: Types.ObjectId;
	customerName: string;
	purchasedItems: Object;
	shippingDetails: string;
	datePurchased: string;
}

const purchaseSchema = new Schema<Purchase>(
	{
		user: {
			type: Schema.Types.ObjectId,
		},
		customerName: {
			type: String,
			required: [true, "Name is required"],
			ref: "User",
		},
		shippingDetails: {
			type: String,
		},
		purchasedItems: {
			type: [Object],
		},
		datePurchased: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

const PurchaseModel = model<Purchase>("Purchase", purchaseSchema);

export default PurchaseModel;

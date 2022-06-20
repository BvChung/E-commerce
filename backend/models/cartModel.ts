import { Types, Schema, model } from "mongoose";

interface Cart {
	user: Types.ObjectId;
	purchasedItems: [
		{
			id: Schema.Types.ObjectId;
			name: string;
			quantity: number;
			image: string;
			price: number;
		}
	];
}

const cartSchema = new Schema<Cart>(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		purchasedItems: [
			{
				id: {
					type: String,
					required: true,
				},
				// id: {
				// 	type: Schema.Types.ObjectId,
				// 	required: true,
				// 	ref: "Product",
				// },
				name: { type: String, required: true, ref: "Product" },
				quantity: { type: Number, required: true },
				image: { type: String, required: true, ref: "Product" },
				price: { type: Number, required: true, ref: "Product" },
			},
		],
	},
	{
		timestamps: true,
	}
);

const CartModel = model<Cart>("Cart", cartSchema);

export default CartModel;

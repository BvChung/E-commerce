import { object, string, array, TypeOf } from "zod";

// Zod is a TypeScript schema declaration and validation library

export const orderSchema = object({
	body: object({
		shippingAddress: string({
			required_error: "Name is required.",
		}),
		purchasedItems: string({
			required_error: "Email is required.",
		}).email("Not a valid email."),
		paymentDetails: string({
			required_error: "Password is required.",
		})
			.min(6, "Password must contain at least 6 minimum characters.")
			.max(30, "Password can only contain 30 maximum characters."),
	}),
});

export type orderInput = TypeOf<typeof orderSchema>;

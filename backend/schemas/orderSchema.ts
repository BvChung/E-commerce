import { object, string, array, TypeOf, number } from "zod";

export const orderSchema = object({
	params: object({
		id: string({
			required_error: "Params id is required.",
		}),
	}),
	body: object({
		shippingAddress: object({
			address: string({
				required_error: "Address is required.",
			}),
			city: string({
				required_error: "City is required.",
			}),
			country: string({
				required_error: "Country is required.",
			}),
			postalCode: string({
				required_error: "Postal code is required.",
			}),
		}),
		purchasedItems: array(
			object({
				productId: string({
					required_error: "Id is required.",
				}),
				name: string({
					required_error: "Name is required.",
				}),
				quantity: number({
					required_error: "Quantity is required.",
				}),
				image: string({
					required_error: "Image is required.",
				}),
				price: number({
					required_error: "Price is required.",
				}),
			})
		),
		paymentDetails: object({
			paymentType: string({
				required_error: "Payment type is required.",
			}),
			cardNumber: string({
				required_error: "Card number is required.",
			}),
			totalCost: number({
				required_error: "Total cost is required.",
			}),
			datePurchased: string({
				required_error: "Date purchased is required.",
			}),
		}),
	}),
});

export type orderInput = TypeOf<typeof orderSchema>;

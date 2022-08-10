import { object, string, array, TypeOf, number } from "zod";

export const orderParamsSchema = object({
	params: object({
		id: string({ required_error: "Product id params is required." }),
	}),
});

export const orderBodySchema = object({
	body: object({
		customerId: string({ required_error: "Customer id is required." }),
		customerName: string({ required_error: "Customer name is required." }),
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
				description: string({
					required_error: "Description is required.",
				}),
				category: string({
					required_error: "Category is required.",
				}),
				price: number({
					required_error: "Price is required.",
				}),
				quantity: number({
					required_error: "Quantity is required.",
				}),
				image: string({
					required_error: "Image is required.",
				}),
				imageCloudId: string({
					required_error: "ImageCloudId is required.",
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

export type orderParams = TypeOf<typeof orderParamsSchema>;
export type orderBody = TypeOf<typeof orderBodySchema>;

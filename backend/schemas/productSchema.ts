import { object, string, TypeOf, number, optional, any } from "zod";

export const productBodySchema = object({
	body: object({
		name: string({
			required_error: "Product name is required.",
		}).optional(),
		description: string({
			required_error: "Description is required.",
		}).optional(),
		price: number({
			required_error: "Price is required.",
		}).optional(),
		image: string().optional(),
		imageCloudId: string().optional(),
		content: any(),
	}),
});

export const productParamsSchema = object({
	params: object({
		id: string({
			required_error: "Product id params is required.",
		}),
	}),
});

export type productBody = TypeOf<typeof productBodySchema>;
export type productParams = TypeOf<typeof productParamsSchema>;

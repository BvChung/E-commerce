import { object, string, TypeOf, number, optional } from "zod";

export const productBodySchema = object({
	body: object({
		name: string({
			required_error: "Product name is required.",
		}),
		description: string({
			required_error: "Description is required.",
		}),
		price: number({
			required_error: "Price is required.",
		}),
		image: string({
			required_error: "Image is required.",
		}),
		imageCloudId: string({
			required_error: "Image cloud id is required.",
		}),
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

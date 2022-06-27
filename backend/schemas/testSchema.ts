import { object, string, TypeOf, number } from "zod";

export const testSchema = object({
	params: object({
		id: string({
			required_error: "Params id is required.",
		}),
	}),
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
	cookies: object({
		id: string({
			required_error: "Cookie is required.",
		}),
	}),
});

export type testInput = TypeOf<typeof testSchema>;

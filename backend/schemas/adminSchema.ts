import { object, string, TypeOf, number } from "zod";

export const accountParamsSchema = object({
	params: object({
		id: string({
			required_error: "Account id params is required.",
		}),
	}),
});

export const accountUpdateBodySchema = object({
	body: object({
		role: number({
			required_error: "Account role required.",
		}),
	}),
});

export type accountParams = TypeOf<typeof accountParamsSchema>;
export type accountBody = TypeOf<typeof accountUpdateBodySchema>;

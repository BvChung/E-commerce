import { object, string, number, TypeOf } from "zod";

// Zod is a TypeScript schema declaration and validation library

export const registerSchema = object({
	body: object({
		name: string({
			required_error: "Name is required.",
		}),
		email: string({
			required_error: "Email is required.",
		}).email("Not a valid email."),
		password: string({
			required_error: "Password is required.",
		})
			.min(6, "Password must contain at least 6 minimum characters.")
			.max(30, "Password can only contain 30 maximum characters."),
		role: number().optional(),
	}),
});

export const loginSchema = object({
	body: object({
		email: string({
			required_error: "Email is required.",
		}).email("Not a valid email."),
		password: string({
			required_error: "Password is required.",
		}),
	}),
});

export type registerBody = TypeOf<typeof registerSchema>;
export type loginBody = TypeOf<typeof loginSchema>;

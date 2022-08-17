import { object, string, number, TypeOf } from "zod";

// Zod is a TypeScript schema declaration and validation library

export const registerSchema = object({
	body: object({
		firstName: string({
			required_error: "First name is required.",
		}),
		lastName: string({
			required_error: "Last name is required.",
		}),
		email: string({
			required_error: "Email is required.",
		}).email("Not a valid email."),
		password: string({
			required_error: "Password is required.",
		})
			.min(8, "Password must contain at least 8 minimum characters.")
			.max(25, "Password can only contain 30 maximum characters."),
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

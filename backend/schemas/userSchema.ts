import { object, string, TypeOf } from "zod";

export const registerUserSchema = object({
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
	}),
});

export const loginUserSchema = object({
	body: object({
		email: string({
			required_error: "Email is required.",
		}).email("Not a valid email."),
		password: string({
			required_error: "Password is required.",
		})
			.min(6, "Password must contain at least 6 minimum characters.")
			.max(30, "Password can only contain 30 maximum characters."),
	}),
});

export type registerUserInput = TypeOf<typeof registerUserSchema>;
export type loginUserInput = TypeOf<typeof loginUserSchema>;

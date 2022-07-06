import { Schema, model } from "mongoose";

interface User {
	name: string;
	email: string;
	password: string;
	refreshToken: string;
	role: number;
}

const userSchema = new Schema<User>(
	{
		name: {
			type: String,
			required: [true, "Name is required"],
			default: "",
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
			default: "",
		},
		password: {
			type: String,
			required: [true, "Password is required"],
			default: "",
		},
		refreshToken: {
			type: String,
			default: "",
		},
		role: {
			type: Number,
			default: 5050,
		},
	},
	{
		timestamps: true,
	}
);

const UserModel = model<User>("User", userSchema);

export default UserModel;

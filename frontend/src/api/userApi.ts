import { eCommerceApiPublic } from "./axios";
import {
	LoginCredentials,
	RegisterCredentials,
} from "../interfaces/userInterface";

export const loginUser = async (credentials: LoginCredentials) => {
	const response = await eCommerceApiPublic.post(
		"/api/users/login",
		credentials
	);

	console.log(response.data);
	return response.data;
};

export const registerUser = async (credentials: RegisterCredentials) => {
	const response = await eCommerceApiPublic.post(
		"/api/users/register",
		credentials
	);
	return response.data;
};

export const logoutUser = async () => {
	const response = await eCommerceApiPublic.post("/api/users/logout");
	return response.data;
};

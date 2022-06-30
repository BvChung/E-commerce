import { eCommerceApiPublic } from "./axios";
import { LoginCredentials, RegisterCredentials } from "../interfaces/user";

export const loginUser = async (credentials: LoginCredentials) => {
	const response = await eCommerceApiPublic.post("/api/login", credentials);

	console.log(response.data);
	return response.data;
};

export const registerUser = async (credentials: RegisterCredentials) => {
	const response = await eCommerceApiPublic.post("/api/register", credentials);
	return response.data;
};

export const logoutUser = async () => {
	const response = await eCommerceApiPublic.post("/api/logout");
	return response.data;
};

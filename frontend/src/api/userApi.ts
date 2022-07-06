import { eCommerceApiPublic, eCommerceApiPrivate } from "./axios";
import {
	LoginCredentials,
	RegisterCredentials,
} from "../interfaces/userInterface";
import { storage } from "../helper/tokenStorage";

export const loginUser = async (credentials: LoginCredentials) => {
	const response = await eCommerceApiPublic.post(
		"/api/users/login",
		credentials
	);

	storage.setToken(response.data.accessToken);

	return response.data;
};

export const registerUser = async (credentials: RegisterCredentials) => {
	const response = await eCommerceApiPublic.post(
		"/api/users/register",
		credentials
	);
	return response.data;
};

export const getUser = async () => {
	const response = await eCommerceApiPrivate.get("/api/users/me");

	return response.data;
};

export const logoutUser = async () => {
	const response = await eCommerceApiPublic.post("/api/users/logout");
	return response.data;
};

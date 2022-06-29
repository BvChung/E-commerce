import { eCommerceApiPublic } from "./axios";

export const loginUser = async () => {
	const response = await eCommerceApiPublic.post("/api/login");
	return response.data;
};

export const registerUser = async () => {
	const response = await eCommerceApiPublic.post("/api/register");
	return response.data;
};

export const logoutUser = async () => {
	const response = await eCommerceApiPublic.post("/api/logout");
	return response.data;
};

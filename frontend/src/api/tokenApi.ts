import { eCommerceApiPublic } from "./axios";
import { storage } from "../helper/tokenStorage";

export const refreshToken = async () => {
	const response = await eCommerceApiPublic.get("/api/refresh");

	storage.setToken(response.data);

	return JSON.stringify(response.data);
};

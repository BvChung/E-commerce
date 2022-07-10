import { storage } from "../../helper/tokenStorage";
import { eCommerceApiPublic } from "../../api/axios";

const logout = async () => {
	const response = await eCommerceApiPublic.post("/api/users/logout");

	return response.data;
};

export const useLogout = () => {};

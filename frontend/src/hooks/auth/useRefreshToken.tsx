import { eCommerceApiPublic } from "../../api/axios";
import { storage } from "../../helper/tokenStorage";
import { useAuth } from "./useAuth";

export const useRefreshToken = () => {
	const { setUser } = useAuth();

	const refreshToken = async () => {
		const response = await eCommerceApiPublic.get("/api/refresh");

		storage.setToken(response.data);

		setUser((prev) => {
			return {
				...prev!,
				accessToken: response.data,
			};
		});

		return response.data;
	};

	return refreshToken;
};

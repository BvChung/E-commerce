import { eCommerceApiPublic } from "../../api/axios";

import { storage } from "../../helper/tokenStorage";
import { useAuthContext } from "../context/useAuthContext";

export const useRefreshToken = () => {
	const { setUser } = useAuthContext();

	const refreshToken = async () => {
		try {
			const response = await eCommerceApiPublic.get("/api/refresh");

			console.log(`Token obtained : ${response.data}`);

			storage.setToken(response.data);

			setUser((prev) => {
				return {
					...prev!,
					accessToken: response.data,
				};
			});

			return response.data;
		} catch (error) {
			console.error(error);
		}
	};

	return refreshToken;
};

import { eCommerceApiPublic } from "../../api/axios";
import { storage } from "../../helper/tokenStorage";
import { useAuth } from "./useAuth";

export const useRefreshToken = () => {
	const { setUser } = useAuth();

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
			console.log("error refresh token");
			console.error(error);
		}
	};

	return refreshToken;
};

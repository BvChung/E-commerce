import { useAuthContext } from "../context/useAuthContext";
import { usePrivateApi } from "../auth/usePrivateApi";
import { storage } from "../../helper/tokenStorage";

export const useGetUser = () => {
	const { setUser } = useAuthContext();
	const eCommerceApiPrivate = usePrivateApi();

	const getUser = async (): Promise<void> => {
		const response = await eCommerceApiPrivate.get("/api/users/me");

		if (response.status === 200) {
			setUser(() => {
				return {
					...response.data,
					accessToken: storage.getToken(),
				};
			});
		}
	};

	return getUser;
};

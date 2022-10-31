import { useAuthContext } from "../context/useAuthContext";
import { usePrivateApi } from "../auth/usePrivateApi";
import { toast } from "react-toastify";
import { storage } from "../../helper/tokenStorage";

export const useLoadUser = () => {
	const { setUser } = useAuthContext();
	const eCommerceApiPrivate = usePrivateApi();

	const loadUser = async (): Promise<void> => {
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

	return loadUser;
};

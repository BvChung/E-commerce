import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { LoginCredentials, UserInfo } from "../../interfaces/authInterface";
import { useAuthContext } from "../context/useAuthContext";
import { eCommerceApiPublic } from "../../api/axios";
import { CustomError } from "../../interfaces/customInterface";
import { storage } from "../../helper/tokenStorage";

// Make req to api with login info => returns token
// Store token to local storage
// Then make req api with token => returns account information using useQuery() to store

export const useSignInUser = () => {
	const { setUser } = useAuthContext();

	const signIn = async (credentials: LoginCredentials): Promise<UserInfo> => {
		const response = await eCommerceApiPublic.post(
			"/api/users/login",
			credentials
		);

		return response.data;
	};

	return useMutation(signIn, {
		onSuccess: (data: UserInfo) => {
			toast.success(`${data.firstName} ${data.lastName} logged in.`);
			setUser(data);
			storage.setToken(data.accessToken);
		},
		onError: (error: CustomError) => {
			toast.error(error.response?.data?.message);
		},
	});
};

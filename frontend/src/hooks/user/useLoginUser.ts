import { useMutation, useQueryClient, useQuery } from "react-query";
import { toast } from "react-toastify";
import { LoginCredentials, UserInfo } from "../../interfaces/userInterface";
import { useAuth } from "../auth/useAuth";
import { getUser } from "../../api/userApi";
import { eCommerceApiPublic } from "../../api/axios";
import { CustomError } from "../../interfaces/customInterface";
import { storage } from "../../helper/tokenStorage";

// Make req to api with login info => returns token
// Store token to local storage
// Then make req api with token => returns account information using useQuery() to store

const login = async (credentials: LoginCredentials) => {
	const response = await eCommerceApiPublic.post(
		"/api/users/login",
		credentials
	);

	return response.data;
};

export const useLogin = (credentials: LoginCredentials) => {
	return useQuery(
		["user", credentials],
		async (credentials) => {
			const response = await eCommerceApiPublic.post(
				"/api/users/login",
				credentials
			);

			return response.data;
		},
		{ enabled: !!credentials, cacheTime: Infinity }
	);
};

export const useLoginUser = () => {
	const queryClient = useQueryClient();
	const { setUser } = useAuth();

	return useMutation(login, {
		onSuccess: (data: UserInfo) => {
			toast.success(`${data.name} logged in`);
			queryClient.setQueryData("login", { ...data, isLoggedIn: true });

			setUser(data);
			storage.setToken(data.accessToken);
		},
		onError: (error: CustomError) => {
			toast.error(error.response?.data?.message);
		},
	});
};

export const useGetUser = () => {
	const token = storage.getToken();

	return useQuery(["user", token], getUser, {
		enabled: !!token,
	});
};

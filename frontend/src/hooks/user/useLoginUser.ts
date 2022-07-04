import { useEffect } from "react";
import {
	useMutation,
	useQueryClient,
	UseMutationResult,
	useQuery,
} from "react-query";
import { toast } from "react-toastify";
import { UserInfo, LoginCredentials } from "../../interfaces/userInterface";
import { loginUser, getUser } from "../../api/userApi";
import { storage } from "../../helper/helperFunc";

// Make req to api with login info => returns token
// Store token to local storage
// Then make req api with token => returns account information using useQuery() to store

export const useLoginUser = () => {
	const queryClient = useQueryClient();

	return useMutation(loginUser, {
		onSuccess: (data) => {
			toast.success("User logged in");
			queryClient.setQueryData("login", { ...data, isLoggedIn: true });
		},
		onError: (error: Error) => {
			toast.error(`Error: ${error.message}`);
		},
	});
};

export const useGetUser = () => {
	const token = storage.getToken();

	return useQuery(["user", token], getUser, {
		enabled: !!token,
	});
};

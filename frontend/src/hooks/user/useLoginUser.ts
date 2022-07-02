import {
	useMutation,
	useQueryClient,
	UseMutationResult,
	useQuery,
} from "react-query";
import { toast } from "react-toastify";
import { UserInfo, LoginCredentials } from "../../interfaces/userInterface";
import { loginUser } from "../../api/userApi";

export const useLoginUser = () => {
	const queryClient = useQueryClient();

	return useMutation(loginUser, {
		onSuccess: () => {
			console.log("Logged in");
			toast.success("User logged in");
			queryClient.invalidateQueries("user");
		},
		onError: (error: Error) => {
			toast.error(`Error: ${error.message}`);
		},
	});
};

export const useLogin = (credentials: LoginCredentials) => {
	return useQuery("products", () => {
		loginUser(credentials);
	});
};

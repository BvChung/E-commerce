import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { UserInfo, RegisterCredentials } from "../../interfaces/authInterface";
import { eCommerceApiPublic } from "../../api/axios";
import { CustomError } from "../../interfaces/customInterface";

export const useRegisterUser = () => {
	const queryClient = useQueryClient();

	const register = async (
		credentials: RegisterCredentials
	): Promise<UserInfo> => {
		const response = await eCommerceApiPublic.post(
			"/api/users/register",
			credentials
		);

		return response.data;
	};

	return useMutation(register, {
		onSuccess: () => {
			toast.success("User has been registered");
			queryClient.invalidateQueries("user");
		},
		onError: (error: CustomError) => {
			toast.error(error.response?.data?.message);
		},
	});
};

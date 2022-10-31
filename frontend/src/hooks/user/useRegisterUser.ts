import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { useAuthContext } from "../context/useAuthContext";
import { storage } from "../../helper/tokenStorage";
import { UserInfo, RegisterCredentials } from "../../interfaces/authInterface";
import { eCommerceApiPublic } from "../../api/axios";
import { CustomError } from "../../interfaces/customInterface";

export const useRegisterUser = () => {
	const queryClient = useQueryClient();
	const { setUser } = useAuthContext();

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
		onSuccess: (data: UserInfo) => {
			setUser(data);
			storage.setToken(data.accessToken);

			toast.success(`${data.firstName} ${data.lastName} has been registered.`);
		},
		onError: (error: CustomError) => {
			toast.error(error.response?.data?.message);
		},
	});
};

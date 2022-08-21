import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { EditPasswordCredentials } from "../../interfaces/authInterface";
import { CustomError } from "../../interfaces/customInterface";
import { usePrivateApi } from "../auth/usePrivateApi";

export const useEditPassword = () => {
	const eCommerceApiPrivate = usePrivateApi();

	const editPassword = async (
		credentials: EditPasswordCredentials
	): Promise<void> => {
		await eCommerceApiPrivate.patch("/api/users/edit/password", credentials);

		// const response = await eCommerceApiPublic.patch(
		// 	"/api/users/edit/password",
		// 	credentials
		// );

		// return response.data;
	};

	return useMutation(editPassword, {
		onSuccess: () => {
			toast.success("Your password has been updated.");
		},
		onError: (error: CustomError) => {
			toast.error(error.response?.data?.message);
		},
	});
};

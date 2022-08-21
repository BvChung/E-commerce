import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { EditEmailCredentials } from "../../interfaces/authInterface";
import { useAuthContext } from "../context/useAuthContext";
import { CustomError } from "../../interfaces/customInterface";
import { usePrivateApi } from "../auth/usePrivateApi";

export const useEditEmail = () => {
	const { setUser } = useAuthContext();
	const eCommerceApiPrivate = usePrivateApi();

	const editEmail = async (
		credentials: EditEmailCredentials
	): Promise<EditEmailCredentials> => {
		const response = await eCommerceApiPrivate.patch(
			"/api/users/edit/email",
			credentials
		);

		return response.data;
	};

	return useMutation(editEmail, {
		onSuccess: (data: EditEmailCredentials) => {
			toast.success("Your email has been updated");

			setUser((prev) => {
				return {
					...prev,
					email: data.email,
				};
			});
		},
		onError: (error: CustomError) => {
			toast.error(error.response?.data?.message);
		},
	});
};

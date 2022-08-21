import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { EditNameCredentials } from "../../interfaces/authInterface";
import { useAuthContext } from "../context/useAuthContext";
import { CustomError } from "../../interfaces/customInterface";
import { usePrivateApi } from "../auth/usePrivateApi";

export const useEditName = () => {
	const { setUser } = useAuthContext();
	const eCommerceApiPrivate = usePrivateApi();

	const editName = async (
		credentials: EditNameCredentials
	): Promise<EditNameCredentials> => {
		const response = await eCommerceApiPrivate.patch(
			"/api/users/edit/name",
			credentials
		);

		return response.data;
	};

	return useMutation(editName, {
		onSuccess: (data: EditNameCredentials) => {
			toast.success("Your name has been updated");

			setUser((prev) => {
				return {
					...prev,
					firstName: data.firstName,
					lastName: data.lastName,
				};
			});
		},
		onError: (error: CustomError) => {
			toast.error(error.response?.data?.message);
		},
	});
};

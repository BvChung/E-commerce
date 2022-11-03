import { usePrivateApi } from "../auth/usePrivateApi";
import { useMutation, useQueryClient } from "react-query";
import { UserInfo } from "../../interfaces/authInterface";
import { CustomError } from "../../interfaces/customInterface";
import { toast } from "react-toastify";

export const useDeleteAccount = () => {
	const eCommerceApiPrivate = usePrivateApi();
	const queryClient = useQueryClient();

	const deleteAccount = async (accountId: string): Promise<UserInfo> => {
		const response = await eCommerceApiPrivate.delete(
			`/api/admin/delete/${accountId}`
		);

		return response.data;
	};

	return useMutation(deleteAccount, {
		onSuccess: (data: UserInfo) => {
			queryClient.invalidateQueries("manage");
			toast.success(`${data.firstName} has been deleted.`);
		},
		onError: (error: CustomError) => {
			toast.error(error.response?.data?.message);
		},
	});
};

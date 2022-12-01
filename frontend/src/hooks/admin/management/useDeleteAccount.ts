import { usePrivateApi } from "../../auth/usePrivateApi";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate, useLocation } from "react-router-dom";
import { UserInfo } from "../../../interfaces/authInterface";
import { CustomError } from "../../../interfaces/customInterface";
import { toast } from "react-toastify";

export const useDeleteAccount = () => {
	const eCommerceApiPrivate = usePrivateApi();
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const location = useLocation();

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
			if (
				error.response?.status === 403 &&
				error.response?.data?.message === "jwt malformed"
			) {
				toast.info("Your session has expired.");
				navigate("/adminsignin", { state: { from: location }, replace: true });
				return;
			}
			toast.error(error.response?.data?.message);
		},
	});
};

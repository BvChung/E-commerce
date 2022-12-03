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

	const deleteAccount = async (accountId: string) => {
		try {
			const response = await eCommerceApiPrivate.delete(
				`/api/admin/delete/${accountId}`
			);

			return response.data;
		} catch (error) {
			const err = error as CustomError;
			if (
				err.response?.status === 403 &&
				err.response?.data?.message === "jwt malformed"
			) {
				toast.info("Your session has expired.");
				navigate("/signin", { state: { from: location }, replace: true });
				return Promise.reject(error);
			}

			toast.error(err.response?.data?.message);
			return Promise.reject(error);
		}
	};

	return useMutation(deleteAccount, {
		onSuccess: (data: UserInfo) => {
			queryClient.invalidateQueries("manage");
			toast.success(`${data.firstName} has been deleted.`);
		},
	});
};

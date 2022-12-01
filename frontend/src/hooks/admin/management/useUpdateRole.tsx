import { usePrivateApi } from "../../auth/usePrivateApi";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate, useLocation } from "react-router-dom";
import { UserInfo } from "../../../interfaces/authInterface";
import { CustomError } from "../../../interfaces/customInterface";
import { toast } from "react-toastify";

interface UpdateManagement {
	_id: string;
	role: number;
}

export const useUpdateRole = () => {
	const eCommerceApiPrivate = usePrivateApi();
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const location = useLocation();

	const updateRole = async (
		updatedInfo: UpdateManagement
	): Promise<UserInfo> => {
		const response = await eCommerceApiPrivate.patch(
			`/api/admin/edit`,
			updatedInfo
		);

		return response.data;
	};

	return useMutation(updateRole, {
		onSuccess: (data: UserInfo) => {
			queryClient.invalidateQueries("manage");
			toast.success(`${data.firstName} has been updated.`);
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

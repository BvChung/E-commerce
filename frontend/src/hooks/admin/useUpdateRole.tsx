import { usePrivateApi } from "../auth/usePrivateApi";
import { useMutation, useQueryClient } from "react-query";
import { UserInfo } from "../../interfaces/authInterface";
import { CustomError } from "../../interfaces/customInterface";
import { useAuthContext } from "../context/useAuthContext";
import { toast } from "react-toastify";

interface UpdateManagement {
	_id: string;
	role: number;
}

export const useUpdateRole = () => {
	const eCommerceApiPrivate = usePrivateApi();
	const queryClient = useQueryClient();
	const { setUser } = useAuthContext();

	const updateRole = async (
		updatedInfo: UpdateManagement
	): Promise<UserInfo> => {
		const response = await eCommerceApiPrivate.patch(
			`/api/products/${updatedInfo._id}`,
			updatedInfo.role
		);

		return response.data;
	};

	return useMutation(updateRole, {
		onSuccess: (data: UserInfo) => {
			// setUser(data);
			toast.success(`${data.firstName} has been updated.`);
		},
		onError: (error: CustomError) => {
			toast.error(error.response?.data?.message);
		},
	});
};

import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { eCommerceApiPublic } from "../../api/axios";
import { CustomError } from "../../interfaces/customInterface";
import { useAuthContext } from "../context/useAuthContext";
import { useNavigate } from "react-router-dom";
import { storage } from "../../helper/tokenStorage";

export const useLogoutUser = () => {
	const queryClient = useQueryClient();
	const { user, logoutUser } = useAuthContext();
	const navigate = useNavigate();

	const logout = async () => {
		const response = await eCommerceApiPublic.post("/api/users/logout");

		return response.data;
	};

	return useMutation(logout, {
		onSuccess: () => {
			toast.success("User has been logged out");
			queryClient.cancelQueries("user");
			logoutUser();
			storage.clearToken();
			navigate("/");
			console.log(user);
		},
		onError: (error: CustomError) => {
			toast.error(error.response?.data?.message);
		},
	});
};

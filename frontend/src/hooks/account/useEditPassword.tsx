import { useMutation } from "react-query";
import { EditPasswordCredentials } from "../../interfaces/authInterface";
import { usePrivateApi } from "../auth/usePrivateApi";
import { useNavigate, useLocation } from "react-router-dom";
import { CustomError } from "../../interfaces/customInterface";
import { toast } from "react-toastify";

export const useEditPassword = () => {
	const eCommerceApiPrivate = usePrivateApi();
	const navigate = useNavigate();
	const location = useLocation();

	const editPassword = async (credentials: EditPasswordCredentials) => {
		try {
			await eCommerceApiPrivate.patch("/api/users/edit/password", credentials);
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

	return useMutation(editPassword, {
		onSuccess: () => {
			toast.success("Your password has been updated.");
		},
	});
};

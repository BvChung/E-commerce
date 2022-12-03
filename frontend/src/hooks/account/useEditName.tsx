import { useMutation } from "react-query";
import { EditNameCredentials } from "../../interfaces/authInterface";
import { useAuthContext } from "../context/useAuthContext";
import { usePrivateApi } from "../auth/usePrivateApi";
import { useNavigate, useLocation } from "react-router-dom";
import { CustomError } from "../../interfaces/customInterface";
import { toast } from "react-toastify";

export const useEditName = () => {
	const { setUser } = useAuthContext();
	const eCommerceApiPrivate = usePrivateApi();
	const navigate = useNavigate();
	const location = useLocation();

	const editName = async (credentials: EditNameCredentials) => {
		try {
			const response = await eCommerceApiPrivate.patch(
				"/api/users/edit/name",
				credentials
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
	});
};

import { usePrivateApi } from "../auth/usePrivateApi";
import { toast } from "react-toastify";
import { useQuery } from "react-query";
import { UserInfo } from "../../interfaces/authInterface";

export const useGetAccounts = () => {
	const eCommerceApiPrivate = usePrivateApi();

	const getAccounts = async (): Promise<UserInfo[]> => {
		const response = await eCommerceApiPrivate.get("/api/admin/manage");

		return response.data;
	};

	return useQuery("manage", getAccounts, {
		retry: false,
	});
};

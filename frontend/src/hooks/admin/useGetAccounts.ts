import { usePrivateApi } from "../auth/usePrivateApi";
import { useQuery } from "react-query";
import { AccountInfo } from "../../interfaces/adminInterface";

export const useGetAccounts = () => {
	const eCommerceApiPrivate = usePrivateApi();

	const getAccounts = async (): Promise<AccountInfo[]> => {
		const response = await eCommerceApiPrivate.get("/api/admin/manage");

		return response.data;
	};

	return useQuery("manage", getAccounts, {
		retry: false,
	});
};

import React from "react";
import { useAuth } from "../auth/useAuth";
import { usePrivateApi } from "../auth/usePrivateApi";
import { toast } from "react-toastify";

export const useGetUser = () => {
	const { setUser } = useAuth();
	const eCommerceApiPrivate = usePrivateApi();

	const getUser = async () => {
		try {
			const response = await eCommerceApiPrivate.get("/api/users/me");

			console.log(response);

			if (response.status === 200) {
				setUser((prev) => {
					return {
						...prev!,
						...response.data,
					};
				});
			}
		} catch (error) {
			toast.error("Your session has expired.");
		}
	};

	return getUser;
};

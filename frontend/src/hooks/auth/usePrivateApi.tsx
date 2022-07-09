import { useEffect } from "react";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { eCommerceApiPrivate } from "../../api/axios";
import { useRefreshToken } from "./useRefreshToken";
import { useAuth } from "./useAuth";
import { storage } from "../../helper/tokenStorage";

export const usePrivateApi = () => {
	const refreshToken = useRefreshToken();

	useEffect(() => {
		const reqIntercept = eCommerceApiPrivate.interceptors.request.use(
			(config: AxiosRequestConfig) => {
				const accessToken = storage.getToken();

				if (!config.headers!.Authorization) {
					config.headers!.Authorization = `Bearer ${accessToken}`;
				}

				return config;
			},
			(err) => Promise.reject(err)
		);

		const resIntercept = eCommerceApiPrivate.interceptors.response.use(
			(res: AxiosResponse) => res,
			async (err) => {
				const prevRequest = err?.config;

				if (err?.response?.status === 403 && !prevRequest._retry) {
					prevRequest._retry = true;
					const newAccessToken = await refreshToken();

					prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

					return eCommerceApiPrivate(prevRequest);
				}
				return Promise.reject(err);
			}
		);

		return () => {
			eCommerceApiPrivate.interceptors.request.eject(reqIntercept);
			eCommerceApiPrivate.interceptors.response.eject(resIntercept);
		};
	}, [refreshToken]);

	return eCommerceApiPrivate;
};

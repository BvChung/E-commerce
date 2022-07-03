import axios, { AxiosRequestConfig } from "axios";
import { storage } from "../helper/helperFunc";

export const eCommerceApiPublic = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	withCredentials: true,
});

export const eCommerceApiPrivate = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	headers: { "Content-Type": "application/json" },
	withCredentials: true,
});

eCommerceApiPrivate.interceptors.request.use(
	(config: AxiosRequestConfig) => {
		const accessToken = storage.getToken();
		console.log(accessToken);

		config.headers!.Authorization = `Bearer ${accessToken}`;

		return config;
	},
	(err) => Promise.reject(err)
);

// // 1) Access token expired => returns 403
// // 2) Refresh JWT http cookie => dispatches to return a new access token
// // 3) If refresh token expired => logout user
// // 4) If new access token returned => send another request
// //    *prevRequest._retry => prevents request from sending more than once
// eCommerceApiPrivate.interceptors.response.use(
// 	(response) => response,
// 	async (err) => {
// 		const prevRequest = err?.config;

// 		if (err?.response?.status === 403 && !prevRequest._retry) {
// 			prevRequest._retry = true;
// 			const newAccessToken = await store.dispatch(refreshAccessToken());

// 			prevRequest.headers[
// 				"Authorization"
// 			] = `Bearer ${newAccessToken.payload.accessToken}`;

// 			return axiosPrivate(prevRequest);
// 		}
// 		return Promise.reject(err);
// 	}
// );

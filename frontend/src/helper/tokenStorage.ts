export const storage = {
	getToken: () => {
		const accessToken = localStorage.getItem("auth_token");

		if (accessToken) {
			return JSON.parse(accessToken);
		}
	},
	setToken: (accessToken: string) =>
		localStorage.setItem("auth_token", JSON.stringify(accessToken)),
	clearToken: () => localStorage.removeItem("auth_token"),
};

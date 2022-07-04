export const storage = {
	getToken: () => {
		const token = localStorage.getItem("auth_token");
		if (token) {
			return JSON.parse(token);
		}
	},
	setToken: (token: string) =>
		localStorage.setItem("auth_token", JSON.stringify(token)),
	clearToken: () => localStorage.removeItem("auth_token"),
};

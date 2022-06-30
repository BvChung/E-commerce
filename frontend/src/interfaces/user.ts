export interface LoginCredentials {
	email: string;
	password: string;
}

export interface RegisterCredentials {
	name: string;
	email: string;
	password: string;
}

export interface UserInfo {
	name: string;
	email: string;
	password: string;
	refreshToken: string;
}

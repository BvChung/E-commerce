export interface LoginCredentials {
	email: string;
	password: string;
}

export interface RegisterCredentials {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

export interface UserInfo {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	role: number;
	accessToken: string;
}

export interface AccessToken {
	accessToken: string;
}

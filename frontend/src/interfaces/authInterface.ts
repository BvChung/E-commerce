export interface LoginCredentials {
	email: string;
	password: string;
}

export interface RegisterCredentials {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	verifyPassword: string;
}

export interface UserInfo {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	role: number;
	accessToken: string;
}

export interface EditNameCredentials {
	firstName: string;
	lastName: string;
}

export interface EditEmailCredentials {
	email: string;
}

export interface EditPasswordCredentials {
	currentPassword: string;
	newPassword: string;
	verifyNewPassword?: string;
}

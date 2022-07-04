import React, { createContext, useState } from "react";

interface AuthContextInterface {
	auth: AuthUser | null;
	setAuth: React.Dispatch<React.SetStateAction<AuthUser | null>>;
}

interface AuthProviderProps {
	children: React.ReactNode;
}

interface AuthUser {
	user: {
		_id: string;
		name: string;
		email: string;
		accessToken: string;
	};
}

const AuthContext = createContext({} as AuthContextInterface);

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [auth, setAuth] = useState<AuthUser | null>(null);

	return (
		<AuthContext.Provider value={{ auth, setAuth }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;

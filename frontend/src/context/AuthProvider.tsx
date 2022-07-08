import React, { createContext, useState } from "react";

interface AuthContextInterface {
	user: AuthUser | null;
	setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
}

interface AuthProviderProps {
	children: React.ReactNode;
}

interface AuthUser {
	_id: string;
	name: string;
	email: string;
	role: number;
	accessToken: string;
}

const AuthContext = createContext({} as AuthContextInterface);

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [user, setUser] = useState<AuthUser | null>(null);

	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;

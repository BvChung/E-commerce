import React, { createContext, useEffect, useState } from "react";

interface ThemeContextInterface {
	theme: boolean;
	setTheme: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ThemeProviderProps {
	children: React.ReactNode;
}

const ThemeContext = createContext({} as ThemeContextInterface);

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
	const [theme, setTheme] = useState<boolean>(false);

	useEffect(() => {
		localStorage.setItem("theme", JSON.stringify(theme));
	}, [theme]);

	return (
		<ThemeContext.Provider value={{ theme, setTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

export default ThemeContext;

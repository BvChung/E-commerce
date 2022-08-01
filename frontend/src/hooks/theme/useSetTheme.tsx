import { useContext } from "react";
import ThemeContext from "../../context/ThemeProvider";

export const useSetTheme = () => {
	return useContext(ThemeContext);
};

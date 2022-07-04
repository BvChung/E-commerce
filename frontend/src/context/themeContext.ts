import React, { createContext, useState } from "react";

interface ContextState {
	theme: boolean | null;
}

const ThemeContext = createContext({} as ContextState);

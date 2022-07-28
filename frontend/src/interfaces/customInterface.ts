export interface CustomError extends Error {
	response?: {
		data: {
			message: string;
			stack: string;
		};
	};
}

export interface CustomLocationState {
	pathname: string | null;
	search: string | null;
	hash: string | null;
	state: {
		from: {
			hash: string;
			key: string;
			pathname: string;
			search: string;
			state: null | object;
		};
	};
	key: string | null;
}

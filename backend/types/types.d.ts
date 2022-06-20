// Add req.user to typescript
export declare global {
	namespace Express {
		interface Request {
			user: any;
		}
	}
}

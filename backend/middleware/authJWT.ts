import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import UserModel from "../models/userModel";

const verifyJWT = async (req: Request, res: Response, next: NextFunction) => {
	// Initialize the token
	let token;

	// Checking for authorization token in header
	// In http headers the token always starts with "Bearer" to be authentic
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		try {
			// Get token from header
			token = req.headers.authorization.split(" ")[1];

			// Verify token
			const decodedToken = jwt.verify(token, process.env.JWT_ACCESS_SECRET!);

			///@ts-ignore
			// .select("-password") removes the password from req.user
			req.user = await UserModel.findById(decodedToken.id).select("-password");

			next();
		} catch (err) {
			// console.error(err);
			res.status(403);
			throw new Error("Unauthorized, invalid token.");
		}
	}
	if (!token) {
		res.status(403);
		throw new Error("Unauthorized, no JSON Web Token.");
	}
};

export default verifyJWT;

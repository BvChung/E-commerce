import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel";

const verifyJWT = async (req: Request, res: Response, next: NextFunction) => {
	try {
		if (
			!(
				req.headers.authorization &&
				req.headers.authorization.startsWith("Bearer")
			)
		) {
			throw new Error("Unauthorized, no authorization headers.");
		}

		// Get token from header
		const token = req.headers.authorization.split(" ")[1];

		// Verify token
		const decodedToken = jwt.verify(token, process.env.JWT_ACCESS_SECRET!);

		///@ts-ignore
		req.user = await UserModel.findById(decodedToken.id).select("-password");
	} catch (error) {
		res.status(403);
		next(error);
	}

	next();
};

export default verifyJWT;

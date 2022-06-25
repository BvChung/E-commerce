import { Request, Response, NextFunction } from "express";
import UserModel from "../models/userModel";
import jwt from "jsonwebtoken";
import { generateAccessToken } from "../helper/JWTGeneration";
import { DecodedToken } from "../types/types";

const handleRefreshToken = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const cookies = req.cookies;

		if (!cookies?.jwt) return res.sendStatus(401);

		const refreshToken = cookies.jwt;

		const foundUser = await UserModel.findOne({ refreshToken: refreshToken });

		if (!foundUser) return res.sendStatus(403);

		const decodedToken = jwt.verify(
			refreshToken,
			process.env.JWT_REFRESH_SECRET!
		) as DecodedToken;

		const accessToken = generateAccessToken(decodedToken.id);

		return res.json(accessToken);
	} catch (error) {
		res.status(403);
		next(error);
	}
};

export default handleRefreshToken;

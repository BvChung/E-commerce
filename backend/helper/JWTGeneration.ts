import jwt from "jsonwebtoken";
import { Types } from "mongoose";

export const generateAccessToken = (id: Types.ObjectId) => {
	return jwt.sign({ id }, process.env.JWT_ACCESS_SECRET!, {
		expiresIn: "30m",
	});
};

export const generateRefreshToken = (id: Types.ObjectId) => {
	return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET!, {
		expiresIn: "1d",
	});
};

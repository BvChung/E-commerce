import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel";
import { DecodedToken } from "../types/types";
import { accessRoles } from "../helper/accessRoles";
import global from "../types/types";

const verifyAdmin = async (req: Request, res: Response, next: NextFunction) => {
	try {
		if (
			req.user.role !== accessRoles.Admin &&
			req.user.role !== accessRoles.Manager
		) {
			throw new Error("Unauthorized access.");
		}
	} catch (error) {
		res.status(403);
		next(error);
	}

	next();
};

export default verifyAdmin;

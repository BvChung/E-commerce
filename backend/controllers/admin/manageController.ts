import { Request, Response, NextFunction } from "express";
import UserModel from "../../models/userModel";

export const getAccounts = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const foundAccounts = await UserModel.find({});

		res.status(200).json(foundAccounts);
	} catch (error) {
		res.status(404);
		next(error);
	}
};

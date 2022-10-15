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

export const editRole = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const editedAccount = await UserModel.findByIdAndUpdate(req.params);

		res.sendStatus(200).json(editedAccount);
	} catch (error) {
		res.status(404);
		next(error);
	}
};

export const deleteAccount = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const deletedAccount = await UserModel.findByIdAndDelete(req.params);

		res.sendStatus(200).json(deletedAccount);
	} catch (error) {
		res.status(404);
		next(error);
	}
};

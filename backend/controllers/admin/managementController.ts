import { Request, Response, NextFunction } from "express";
import global from "../../types/types";
import UserModel from "../../models/userModel";
import OrderModel from "../../models/orderModel";
import { accountParams, accountBody } from "../../schemas/adminSchema";

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
	req: Request<accountParams["params"], {}, accountBody["body"]>,
	res: Response,
	next: NextFunction
) => {
	try {
		const { role } = req.body;

		const updatedRole = await UserModel.findByIdAndUpdate(
			req.params.id,
			{
				role,
			},
			{
				new: true,
			}
		);

		res.sendStatus(200).json(updatedRole);
	} catch (error) {
		res.status(404);
		next(error);
	}
};

export const deleteAccount = async (
	req: Request<accountParams["params"], {}, {}>,
	res: Response,
	next: NextFunction
) => {
	try {
		// Delete account info and orders associated
		const deletedAccount = await UserModel.findByIdAndDelete(req.params.id);
		await OrderModel.deleteMany({ accountId: req.params.id });

		res.sendStatus(200).json(deletedAccount);
	} catch (error) {
		res.status(404);
		next(error);
	}
};

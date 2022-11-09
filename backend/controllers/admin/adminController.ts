import { Request, Response, NextFunction } from "express";
import global from "../../types/types";
import UserModel from "../../models/userModel";
import OrderModel from "../../models/orderModel";
import { accountParams, accountBody } from "../../schemas/adminSchema";
import bcrypt from "bcrypt";
import { signInBody } from "../../schemas/adminSchema";
import {
	generateAccessToken,
	generateRefreshToken,
} from "../../helper/JWTGeneration";
import { accessRoles } from "../../helper/accessRoles";

// @desc Login user
// @route POST /api/users/login
// @access Public
export const signInAdmin = async (
	req: Request<{}, {}, signInBody["body"]>,
	res: Response,
	next: NextFunction
) => {
	try {
		const { email, password } = req.body;

		// Check for user based on email
		const foundUser = await UserModel.findOne({ email });

		if (!foundUser) {
			throw new Error("Email and/or password do not match.");
		}

		if (
			foundUser.role !== accessRoles.Admin &&
			foundUser.role !== accessRoles.Manager
		) {
			throw new Error("Unauthorized access.");
		}

		if (!(await bcrypt.compare(password, foundUser.password))) {
			throw new Error("Email and/or password do not match.");
		}

		const refreshToken = generateRefreshToken(foundUser._id);

		await UserModel.findByIdAndUpdate(
			foundUser._id,
			{
				refreshToken,
			},
			{
				new: true,
			}
		);

		res
			.status(200)
			.cookie("jwt", refreshToken, {
				sameSite: "strict",
				httpOnly: true,
				secure: true,
				maxAge: 24 * 60 * 60 * 1000,
			})
			.cookie("name", `${foundUser.firstName}_${foundUser.lastName}`, {
				sameSite: "strict",
				httpOnly: true,
				secure: true,
				maxAge: 24 * 60 * 60 * 1000,
			})
			.json({
				_id: foundUser.id,
				firstName: foundUser.firstName,
				lastName: foundUser.lastName,
				email: foundUser.email,
				role: foundUser.role,
				accessToken: generateAccessToken(foundUser._id),
			});
	} catch (error: any) {
		res.status(404);
		next(error);
	}
};

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
	req: Request<{}, {}, accountBody["body"]>,
	res: Response,
	next: NextFunction
) => {
	try {
		const { _id, role } = req.body;

		const updatedRole = await UserModel.findByIdAndUpdate(
			_id,
			{
				role,
			},
			{
				new: true,
			}
		);

		res.status(200).json(updatedRole);
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
		console.log(req.params);
		// const deletedAccount = await UserModel.findByIdAndDelete(req.params.id);
		// await OrderModel.deleteMany({ accountId: req.params.id });

		// res.status(200).json(deletedAccount);
	} catch (error) {
		res.status(404);
		next(error);
	}
};

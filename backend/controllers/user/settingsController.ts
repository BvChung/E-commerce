import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import UserModel from "../../models/userModel";
import OrderModel from "../../models/orderModel";
import {
	generateAccessToken,
	generateRefreshToken,
} from "../../helper/JWTGeneration";
import global from "../../types/types";
import {
	editNameBody,
	editEmailBody,
	editPasswordBody,
} from "../../schemas/userSchema";

// @desc Update name
// @route PUT /api/account/name
// @access Private
const updateName = async (
	req: Request<{}, {}, editNameBody["body"]>,
	res: Response,
	next: NextFunction
) => {
	try {
		const { firstName, lastName } = req.body;

		if (req.user.firstName === firstName || req.user.lastName === lastName) {
			res.status(400);
			throw new Error("Your new name cannot be the same as the original.");
		}

		// Update user information
		await UserModel.findByIdAndUpdate(
			req.user._id,
			{
				firstName,
				lastName,
			},
			{
				new: true,
			}
		);

		// Find messages in Message schema with user id then update username
		// await OrderModel.updateMany(
		// 	{ customerName: req.user.name },
		// 	{ customerName: name }
		// );

		return res.status(200).json({
			_id: req.user.id,
			name: name,
			email: req.user.email,
		});
	} catch (error) {
		res.status(400);
		next(error);
	}
};

// @desc Update email
// @route PUT /api/account/email
// @access Private
const updateEmail = async (
	req: Request<{}, {}, editEmailBody["body"]>,
	res: Response,
	next: NextFunction
) => {
	try {
		const { email } = req.body;

		if (req.user.email === email) {
			res.status(400);
			throw new Error("Your new email cannot be the same as the original.");
		}

		// Update user information
		await UserModel.findByIdAndUpdate(
			req.user._id,
			{
				email,
			},
			{
				new: true,
			}
		);

		return res.status(200).json(email);
	} catch (error) {
		res.status(400);
		next(error);
	}
};

// @desc Update password
// @route PUT /api/account/password
// @access Private
const updatePassword = async (
	req: Request<{}, {}, editPasswordBody["body"]>,
	res: Response,
	next: NextFunction
) => {
	try {
		const { currentPassword, newPassword } = req.body;

		if (
			currentPassword &&
			!(await bcrypt.compare(currentPassword, req.user.password))
		) {
			res.status(400);
			throw new Error("Current password is incorrect. Try again.");
		}

		if (currentPassword === newPassword) {
			res.status(400);
			throw new Error("Your new password cannot be the same as the original.");
		}

		if (newPassword.slice(0, 1) === " " || newPassword.slice(-1) === " ") {
			res.status(400);
			throw new Error(
				"Your new password cannot begin or end with a blank space."
			);
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(newPassword, salt);

		// Update password
		await UserModel.findByIdAndUpdate(
			req.user._id,
			{
				password: hashedPassword,
			},
			{
				new: true,
			}
		);

		return res.sendStatus(200);
	} catch (error) {
		res.status(400);
		next(error);
	}
};

module.exports = {
	updateName,
	updateEmail,
	updatePassword,
};

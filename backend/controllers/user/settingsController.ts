// import { Request, Response, NextFunction } from "express";
// import bcrypt from "bcrypt";
// import UserModel from "../../models/userModel";
// import {
// 	generateAccessToken,
// 	generateRefreshToken,
// } from "../../helper/JWTGeneration";
// import { registerUserInput, loginUserInput } from "../../schemas/userSchema";

// // For schema data:
// // .id => 6278dd9dadc7cdbc6f7ec28c
// // ._id => new ObjectId("6278dd9dadc7cdbc6f7ec28c")

// // @desc Update username
// // @route PUT /api/account/username
// // @access Private
// const updateUsername = async (
// 	req: Request,
// 	res: Response,
// 	next: NextFunction
// ) => {
// 	const currentUser = await UserModel.findById(req.user._id);

// 	const { username } = req.body;

// 	if (currentUser.username === username) {
// 		res.status(400);
// 		throw new Error("Your new username cannot be the same as the original.");
// 	}

// 	if (username.slice(0, 1) === " " || username.slice(-1) === " ") {
// 		res.status(400);
// 		throw new Error(
// 			"Your new username cannot begin or end with a blank space."
// 		);
// 	}

// 	// Update user information
// 	await UserModel.findByIdAndUpdate(
// 		req.user._id,
// 		{
// 			username,
// 		},
// 		{
// 			new: true,
// 		}
// 	);

// 	// Find messages in Message schema with user id then update username
// 	await Messages.updateMany({ user: currentUser.id }, { username: username });

// 	// Update member list in Group Schema with new username
// 	await Conversation.updateMany(
// 		{
// 			members: {
// 				$elemMatch: {
// 					_id: currentUser.id,
// 					username: currentUser.username,
// 				},
// 			},
// 		},
// 		{ $set: { "members.$.username": username } }
// 	);

// 	return res.status(200).json({
// 		_id: currentUser.id,
// 		name: currentUser.name,
// 		username: username,
// 		email: currentUser.email,
// 		userAvatar: currentUser.userAvatar,
// 	});
// };

// // @desc Update email
// // @route PUT /api/account/email
// // @access Private
// const updateEmail = async (req: Request, res: Response, next: NextFunction) => {
// 	const currentUser = await UserModel.findById(req.user._id);

// 	const { email } = req.body;

// 	if (currentUser.email === email) {
// 		res.status(400);
// 		throw new Error("Your new email cannot be the same as the original.");
// 	}

// 	if (email.slice(0, 1) === " " || email.slice(-1) === " ") {
// 		res.status(400);
// 		throw new Error("Your new email cannot begin or end with a blank space.");
// 	}

// 	// Update user information
// 	await UserModel.findByIdAndUpdate(
// 		req.user._id,
// 		{
// 			email,
// 		},
// 		{
// 			new: true,
// 		}
// 	);

// 	return res.status(200).json({
// 		_id: currentUser.id,
// 		name: currentUser.name,
// 		username: currentUser.username,
// 		email: email,
// 		userAvatar: currentUser.userAvatar,
// 	});
// };

// // @desc Update password
// // @route PUT /api/account/password
// // @access Private
// const updatePassword = async (
// 	req: Request,
// 	res: Response,
// 	next: NextFunction
// ) => {
// 	const currentUser = await UserModel.findById(req.user._id);

// 	const { currentPassword, newPassword } = req.body;

// 	if (
// 		currentPassword &&
// 		!(await bcrypt.compare(currentPassword, currentUser.password))
// 	) {
// 		res.status(400);
// 		throw new Error("Current password is incorrect. Try again.");
// 	}

// 	if (currentPassword === newPassword) {
// 		res.status(400);
// 		throw new Error("Your new password cannot be the same as the original.");
// 	}

// 	if (newPassword.slice(0, 1) === " " || newPassword.slice(-1) === " ") {
// 		res.status(400);
// 		throw new Error(
// 			"Your new password cannot begin or end with a blank space."
// 		);
// 	}

// 	const salt = await bcrypt.genSalt(10);
// 	const hashedPassword = await bcrypt.hash(newPassword, salt);

// 	// Update password
// 	await UserModel.findByIdAndUpdate(
// 		req.user._id,
// 		{
// 			password: hashedPassword,
// 		},
// 		{
// 			new: true,
// 		}
// 	);

// 	return res.status(200).json({
// 		_id: currentUser.id,
// 		name: currentUser.name,
// 		username: currentUser.username,
// 		email: currentUser.email,
// 		userAvatar: currentUser.userAvatar,
// 	});
// };

// module.exports = {
// 	updateUsername,
// 	updateEmail,
// 	updatePassword,
// };

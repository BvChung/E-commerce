import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import UserModel from "../../models/userModel";
import {
	generateAccessToken,
	generateRefreshToken,
} from "../../helper/JWTGeneration";
import global from "../../types/types";
import { registerUserInput, loginUserInput } from "../../schemas/userSchema";
import { isConstructorDeclaration } from "typescript";

// For schema data:
// ._id => new ObjectId("6278dd9dadc7cdbc6f7ec28c")
// .id => 6278dd9dadc7cdbc6f7ec28c

// @desc Login user
// @route POST /api/user/login
// @access Public
const loginUser = async (
	req: Request<{}, {}, loginUserInput["body"]>,
	res: Response,
	next: NextFunction
) => {
	try {
		const { email, password } = req.body;

		// Check for user based on email
		const foundUser = await UserModel.findOne({ email });

		if (foundUser && (await bcrypt.compare(password, foundUser.password))) {
			// bcrypt.compare() compares password from request and hashed password from database schema
			// Create JWT refresh token
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
				.json({
					accessToken: generateAccessToken(foundUser._id),
				});
		} else {
			res.status(401);
			throw new Error("Email and/or password do not match.");
		}
	} catch (error: any) {
		next(error);
	}
};

// @desc Register new user
// @route POST /api/user/register
// @access Public
const registerUser = async (
	req: Request<{}, {}, registerUserInput["body"]>,
	res: Response,
	next: NextFunction
) => {
	try {
		const { name, email, password } = req.body;

		// Check if user exists in the database based on email
		const emailExists = await UserModel.findOne({ email });

		if (emailExists) {
			res.status(409);
			throw new Error("This email address is already in use.");
		}
		if (password.slice(0, 1) === " " || password.slice(-1) === " ") {
			res.status(400);
			throw new Error("Your password cannot begin or end with a blank space.");
		}

		// Hash(encrypt) password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		// Create User using mongoose schema
		const user = await UserModel.create({
			name,
			email,
			password: hashedPassword,
		});

		// Create JWT refresh token based on Schema Id
		const refreshToken = generateRefreshToken(user._id);

		await UserModel.findByIdAndUpdate(
			user._id,
			{
				refreshToken,
			},
			{
				new: true,
			}
		);

		// If user is succesfully created
		if (user) {
			return res
				.status(201)
				.cookie("jwt", refreshToken, {
					sameSite: "strict",
					httpOnly: true,
					secure: true,
					maxAge: 24 * 60 * 60 * 1000,
				})
				.json({
					accessToken: generateAccessToken(user._id),
				});
		} else {
			res.status(401);
			throw new Error("Invalid user data");
		}
	} catch (error: any) {
		next(error);
	}
};

// @desc Get user
// @route GET /api/user/me
// @access Private
const getUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		console.log(req.user);

		res.status(200).json({
			_id: req.user.id,
			name: req.user.name,
			email: req.user.email,
		});
	} catch (error) {
		res.status(404);
		next(error);
	}
};

// @desc Logout user
// @route PUT /api/user/logout
// @access Public
const logoutUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const cookies = req.cookies;

		// If no cookie => logout
		if (!cookies?.jwt) return res.sendStatus(204);

		const refreshToken = cookies.jwt;

		const foundUser = await UserModel.findOne({ refreshToken: refreshToken });

		// No token in DB => clear cookie + logout
		if (!foundUser) {
			res.clearCookie("jwt", {
				httpOnly: true,
				sameSite: "strict",
				secure: true,
			});
			return res.sendStatus(204);
		}

		// Remove refresh JWT + cookie + logout
		await UserModel.findOneAndUpdate(
			{ refreshToken: refreshToken },
			{
				$unset: {
					refreshToken: "",
				},
			},
			{
				new: true,
			}
		);

		res.clearCookie("jwt", {
			httpOnly: true,
			sameSite: "strict",
			secure: true,
		});

		return res.sendStatus(204);
	} catch (error) {
		next(error);
	}
};

export { loginUser, registerUser, getUser, logoutUser };

import express, { IRouter } from "express";
import {
	loginUser,
	registerUser,
	getUser,
	logoutUser,
} from "../controllers/user/userController";
import { registerUserSchema, loginUserSchema } from "../schemas/userSchema";
import validateRequest from "../middleware/validateReq";
import verifyJWT from "../middleware/authJWT";

const router: IRouter = express.Router();

router.post("/login", validateRequest(loginUserSchema), loginUser);
router.post("/register", validateRequest(registerUserSchema), registerUser);
router.get("/me", verifyJWT, getUser);
router.post("/logout", logoutUser);

export default router;

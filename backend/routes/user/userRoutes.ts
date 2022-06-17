import express, { IRouter } from "express";
import {
	loginUser,
	registerUser,
	logoutUser,
} from "../../controllers/user/userController";
import { registerUserSchema, loginUserSchema } from "../../schemas/userSchema";
import validateRequest from "../../middleware/validateReq";

const router: IRouter = express.Router();

router.post("/login", validateRequest(loginUserSchema), loginUser);
router.post("/register", validateRequest(registerUserSchema), registerUser);
router.put("/logout", logoutUser);

export default router;

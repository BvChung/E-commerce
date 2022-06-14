import express, { IRouter } from "express";
import {
	loginUser,
	registerUser,
	logoutUser,
} from "../../controllers/userController/userController";
import validateReq from "../../middleware/validateReq";
import { registerUserSchema, loginUserSchema } from "../../schemas/userSchema";

const router: IRouter = express.Router();

router.post("/login", validateReq(loginUserSchema), loginUser);
router.post("/register", validateReq(registerUserSchema), registerUser);
router.put("/logout", logoutUser);

export default router;

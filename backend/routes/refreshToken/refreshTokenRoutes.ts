import express, { IRouter } from "express";
import handleRefreshToken from "../../controllers/refreshToken/refreshTokenController";

const router: IRouter = express.Router();

router.get("/", handleRefreshToken);

export default router;

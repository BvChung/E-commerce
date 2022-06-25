import express, { IRouter } from "express";
import handleRefreshToken from "../controllers/refreshTokenController";

const router: IRouter = express.Router();

router.get("/", handleRefreshToken);

export default router;

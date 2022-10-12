import { IRouter, Router } from "express";
import handleRefreshToken from "../controllers/refreshTokenController";

const router: IRouter = Router();

router.get("/", handleRefreshToken);

export default router;

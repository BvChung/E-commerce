import { Router, IRouter } from "express";
import { getAccounts } from "../../controllers/admin/manageController";
import verifyJWT from "../../middleware/authJWT";
const router: IRouter = Router();

router.get("/manage", verifyJWT, getAccounts);

export default router;

import { Router, IRouter } from "express";
import {
	getAccounts,
	editRole,
	deleteAccount,
} from "../../controllers/admin/manageController";
import verifyJWT from "../../middleware/authJWT";

const router: IRouter = Router();

router.get("/manage", verifyJWT, getAccounts);
router.patch("/edit", verifyJWT, editRole);
router.delete("/delete", verifyJWT, deleteAccount);

export default router;

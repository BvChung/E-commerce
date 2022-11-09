import { Router, IRouter } from "express";
import {
	signInAdmin,
	getAccounts,
	editRole,
	deleteAccount,
} from "../../controllers/admin/adminController";
import verifyJWT from "../../middleware/authJWT";
import {
	accountUpdateBodySchema,
	accountParamsSchema,
} from "../../schemas/adminSchema";
import validateRequest from "../../middleware/validateReq";

const router: IRouter = Router();

router.get("/manage", verifyJWT, getAccounts);
router.post("/signin", signInAdmin);
router.patch(
	"/edit/",
	[verifyJWT, validateRequest(accountUpdateBodySchema)],
	editRole
);
router.delete("/delete/:id", [verifyJWT], deleteAccount);

export default router;

import express, { IRouter } from "express";
import verifyJWT from "../middleware/authJWT";
import validateRequest from "../middleware/validateReq";
import {
	getOrder,
	createOrder,
	deleteOrder,
} from "../controllers/orderController";
import { orderSchema } from "../schemas/orderSchema";

const router: IRouter = express.Router();

router
	.route("/")
	.get(verifyJWT, getOrder)
	.post([verifyJWT, validateRequest(orderSchema)], createOrder);
router.route("/:id").delete(verifyJWT, deleteOrder);

export default router;

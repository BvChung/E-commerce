import { IRouter, Router } from "express";
import verifyJWT from "../middleware/authJWT";
import validateRequest from "../middleware/validateReq";
import {
	getOrder,
	getOrderInfo,
	createOrder,
	deleteOrder,
} from "../controllers/orderController";
import { orderBodySchema, orderParamsSchema } from "../schemas/orderSchema";

const router: IRouter = Router();

router
	.route("/")
	.get(verifyJWT, getOrder)
	.post([verifyJWT, validateRequest(orderBodySchema)], createOrder);
router
	.route("/:id")
	.get([verifyJWT, validateRequest(orderParamsSchema)], getOrderInfo)
	.delete([verifyJWT, validateRequest(orderParamsSchema)], deleteOrder);

export default router;

import express, { IRouter } from "express";
import verifyJWT from "../middleware/authJWT";
import validateRequest from "../middleware/validateReq";
import {
	getOrder,
	createOrder,
	deleteOrder,
} from "../controllers/orderController";
import { orderBodySchema, orderParamsSchema } from "../schemas/orderSchema";

const router: IRouter = express.Router();

router
	.route("/")
	.get(getOrder)
	.post([validateRequest(orderBodySchema)], createOrder);
// router
// 	.route("/")
// 	.get(verifyJWT, getOrder)
// 	.post([verifyJWT, validateRequest(orderBodySchema)], createOrder);
router
	.route("/:id")
	.delete([verifyJWT, validateRequest(orderParamsSchema)], deleteOrder);

export default router;

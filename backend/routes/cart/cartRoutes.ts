import { IRouter, Router } from "express";
import verifyJWT from "../../middleware/authJWT";
import validateRequest from "../../middleware/validateReq";
import {
	getOrder,
	createOrder,
	deleteOrder,
} from "../../controllers/order/orderController";
import { orderBodySchema } from "../../schemas/orderSchema";

const router: IRouter = Router();

router
	.route("/")
	.get(verifyJWT, getOrder)
	.post([verifyJWT, validateRequest(orderBodySchema)], createOrder);
router.route("/:id").delete(verifyJWT, deleteOrder);

export default router;

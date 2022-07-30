import express, { IRouter } from "express";
import verifyJWT from "../middleware/authJWT";
import validateRequest from "../middleware/validateReq";
import convertFile from "../middleware/convertFile";
import {
	getProduct,
	getProductInfo,
	createProduct,
	updateProduct,
	deleteProduct,
} from "../controllers/productController";
import {
	productBodySchema,
	productParamsSchema,
} from "../schemas/productSchema";

const router: IRouter = express.Router();

router
	.route("/")
	.get(getProduct)
	.post(
		[verifyJWT, convertFile, validateRequest(productBodySchema)],
		createProduct
	);
router
	.route("/:id")
	.get(validateRequest(productParamsSchema), getProductInfo)
	.patch(
		[
			verifyJWT,
			validateRequest(productParamsSchema),
			validateRequest(productBodySchema),
		],
		updateProduct
	)
	.delete([verifyJWT, validateRequest(productParamsSchema)], deleteProduct);

export default router;

import { IRouter, Router } from "express";
import verifyJWT from "../../middleware/authJWT";
import validateRequest from "../../middleware/validateReq";

import {
	getProduct,
	getProducts,
	getProductInfo,
	getSpecifiedProducts,
	createProduct,
	updateProduct,
	deleteProduct,
} from "../../controllers/product/productController";
import {
	productCreationBodySchema,
	productUpdateBodySchema,
	productParamsSchema,
} from "../../schemas/productSchema";

const router: IRouter = Router();

router
	.route("/")
	.get(getProduct)
	.post(validateRequest(productCreationBodySchema), createProduct);

router.route("/get").get(getProducts);

router.route("/cart").get(getSpecifiedProducts);

router
	.route("/:id")
	.get(validateRequest(productParamsSchema), getProductInfo)
	.patch(
		[
			verifyJWT,
			validateRequest(productParamsSchema),
			validateRequest(productUpdateBodySchema),
		],
		updateProduct
	)
	.delete([verifyJWT, validateRequest(productParamsSchema)], deleteProduct);

export default router;

import { IRouter, Router } from "express";
import verifyJWT from "../../middleware/authJWT";
import validateRequest from "../../middleware/validateReq";
import {
	getAllProducts,
	queryProducts,
	getProductInfo,
	getCartItemsInfo,
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
	.get(getAllProducts)
	.post(validateRequest(productCreationBodySchema), createProduct);

router.route("/query").get(queryProducts);
router.route("/cart").get(getCartItemsInfo);

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

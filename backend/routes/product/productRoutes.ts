import { IRouter, Router } from "express";
import verifyJWT from "../../middleware/authJWT";
import validateRequest from "../../middleware/validateReq";
import {
	getInventory,
	queryProducts,
	getProductInfo,
	getCartItemsInfo,
} from "../../controllers/product/productController";
import { productParamsSchema } from "../../schemas/productSchema";

const router: IRouter = Router();

router.route("/").get(getInventory);

router.route("/inventory").get(verifyJWT, getInventory);
router.route("/query").get(queryProducts);
router.route("/cart").get(getCartItemsInfo);

router.route("/:id").get(validateRequest(productParamsSchema), getProductInfo);

export default router;

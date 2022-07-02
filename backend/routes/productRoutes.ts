import express, { IRouter } from "express";
import verifyJWT from "../middleware/authJWT";
import validateRequest from "../middleware/validateReq";
import convertFile from "../middleware/convertFile";
import {
	getProduct,
	createProduct,
	updateProduct,
	deleteProduct,
} from "../controllers/productController";
import { productSchema } from "../schemas/productSchema";

const router: IRouter = express.Router();

router
	.route("/")
	.get(getProduct)
	.post([verifyJWT, validateRequest(productSchema)], createProduct);
router
	.route("/:id")
	.patch(verifyJWT, updateProduct)
	.delete(verifyJWT, deleteProduct);

export default router;

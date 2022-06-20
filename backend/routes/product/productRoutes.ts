import express, { IRouter } from "express";
import verifyJWT from "../../middleware/authJWT";
import validateRequest from "../../middleware/validateReq";
import convertFile from "../../middleware/convertFile";
import {
	getProduct,
	createProduct,
	deleteProduct,
} from "../../controllers/product/productController";

const router: IRouter = express.Router();

router.route("/").get(verifyJWT, getProduct).post(verifyJWT, createProduct);
router.route("/:id").delete(verifyJWT, deleteProduct);

export default router;

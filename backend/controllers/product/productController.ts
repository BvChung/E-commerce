import { Request, Response, NextFunction } from "express";
import ProductModel from "../../models/productModel";
import global from "../../types/types";

export const getProduct = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const product = await ProductModel.find({});

		res.status(200).json(product);
	} catch (error) {
		res.status(400);
		next(error);
	}
};

export const createProduct = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const product = await ProductModel.create({});

		res.status(200).json(product);
	} catch (error) {
		res.status(400);
		next(error);
	}
};

export const deleteProduct = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const deletedProduct = await ProductModel.findByIdAndDelete(req.params.id);

		res.status(200).json(deletedProduct);
	} catch (error) {
		res.status(400);
		next(error);
	}
};

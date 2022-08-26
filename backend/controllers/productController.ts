import { Request, Response, NextFunction } from "express";
import ProductModel from "../models/productModel";
import global from "../types/types";
import cloudinaryConnection from "../config/cloudinaryConfig";
import {
	productCreationBody,
	productParams,
	productUpdateBody,
} from "../schemas/productSchema";
import dotenv from "dotenv";
dotenv.config();

export const getProduct = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const products = await ProductModel.find({});

		res.status(200).json(products);
	} catch (error) {
		res.status(400);
		next(error);
	}
};

export const getSpecifiedProducts = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const myCartItems = await ProductModel.find({
			_id: { $in: req.query.productIds },
		});

		res.status(200).json(myCartItems);
	} catch (error) {
		res.status(400);
		next(error);
	}
};

export const getProductInfo = async (
	req: Request<productParams["params"], {}, {}>,
	res: Response,
	next: NextFunction
) => {
	try {
		const productInfo = await ProductModel.findById(req.params.id);

		res.status(200).json(productInfo);
	} catch (error) {
		res.status(400);
		next(error);
	}
};

export const createProduct = async (
	req: Request<{}, {}, productCreationBody["body"]>,
	res: Response,
	next: NextFunction
) => {
	try {
		const { name, description, price, category, image, fileName } = req.body;

		const uploadedImage = await cloudinaryConnection.uploader.upload(
			image,
			{
				upload_preset: process.env.CLOUDINARY_PRODUCT_UPLOAD,
				public_id: Date.now() + fileName.split(".")[0],
			},
			(err) => {
				if (err) {
					console.log(err);
				}
			}
		);

		const createdProduct = await ProductModel.create({
			name,
			description,
			price,
			category,
			image: uploadedImage.secure_url,
			imageCloudId: uploadedImage.public_id,
		});

		res.status(200).json(createdProduct);
	} catch (error) {
		res.status(400);
		next(error);
	}
};

export const updateProduct = async (
	req: Request<productParams["params"], {}, productUpdateBody["body"]>,
	res: Response,
	next: NextFunction
) => {
	try {
		const { name, description, price, category, image, fileName } = req.body;

		const foundProduct = await ProductModel.findById(req.params.id);
		if (!foundProduct) throw new Error("Product not found.");

		let uploadedImage;
		if (image && fileName) {
			uploadedImage = await cloudinaryConnection.uploader.upload(
				image,
				{
					upload_preset: process.env.CLOUDINARY_PRODUCT_UPLOAD,
					public_id: Date.now() + fileName.split(".")[0],
				},
				(err) => {
					if (err) {
						console.log(err);
					}
				}
			);

			await cloudinaryConnection.uploader.destroy(foundProduct.imageCloudId);
		}

		const updatedProduct = await ProductModel.findByIdAndUpdate(
			req.params.id,
			{
				name,
				description,
				price,
				category,
				image: uploadedImage ? uploadedImage.secure_url : foundProduct.image,
				imageCloudId: uploadedImage
					? uploadedImage.secure_url
					: foundProduct.imageCloudId,
			},
			{
				new: true,
			}
		);

		res.status(200).json(updatedProduct);
	} catch (error) {
		res.status(400);
		next(error);
	}
};

export const deleteProduct = async (
	req: Request<productParams["params"], {}, {}>,
	res: Response,
	next: NextFunction
) => {
	try {
		const deletedProduct = await ProductModel.findByIdAndDelete(req.params.id);

		if (!deletedProduct) throw new Error("Product not found.");

		await cloudinaryConnection.uploader.destroy(deletedProduct.imageCloudId);

		res.status(200).json(deletedProduct);
	} catch (error) {
		res.status(400);
		next(error);
	}
};

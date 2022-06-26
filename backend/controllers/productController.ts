import { Request, Response, NextFunction } from "express";
import ProductModel from "../models/productModel";
import global from "../types/types";
import { v2 as cloudinary } from "cloudinary";
import { productInput } from "../schemas/productSchema";

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

export const createProduct = async (
	req: Request<{}, {}, productInput["body"]>,
	res: Response,
	next: NextFunction
) => {
	try {
		const { name, description, price, image, imageCloudId } = req.body;
		// const uploadedImage = await cloudinary.uploader.upload(req.body.content, {
		// 	upload_preset: process.env.CLOUDINARY_AVATAR_UPLOAD,
		// 	public_id: req.file.originalname,
		// });
		const test = {
			name,
			description,
			image,
			imageCloudId,
			price,
			//image: uploadedImage.secure_url,
			// imageCloudId: uploadedImage.public_id,
		};

		const createdProduct = await ProductModel.create(test);

		res.status(200).json(createdProduct);
	} catch (error) {
		res.status(400);
		next(error);
	}
};

export const updateProduct = async (
	req: Request<productInput["params"], {}, productInput["body"]>,
	res: Response,
	next: NextFunction
) => {
	try {
		const foundProduct = await ProductModel.findById(req.params.id);
		const { name, description, price, image, imageCloudId } = req.body;
		// const uploadedImage = await cloudinary.uploader.upload(req.body.content, {
		// 	upload_preset: process.env.CLOUDINARY_AVATAR_UPLOAD,
		// 	public_id: req.file.originalname,
		// });

		const updatedProduct = await ProductModel.findByIdAndUpdate(
			req.params.id,
			{
				name: name ? name : foundProduct?.name,
				description: description ? description : foundProduct?.description,
				price: price ? price : foundProduct?.price,
				image: image ? image : foundProduct?.image,
				imageCloudId: imageCloudId ? imageCloudId : foundProduct?.imageCloudId,
				// image: uploadedImage.secure_url,
				// imageCloudId: uploadedImage.public_id,
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
	req: Request<productInput["params"], {}, {}>,
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

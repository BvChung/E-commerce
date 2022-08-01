import { Request, Response, NextFunction } from "express";
import ProductModel from "../models/productModel";
import global from "../types/types";
import { v2 as cloudinary } from "cloudinary";
import { productBody, productParams } from "../schemas/productSchema";

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
	req: Request<{}, {}, productBody["body"]>,
	res: Response,
	next: NextFunction
) => {
	try {
		const { name, description, price, image, imageCloudId } = req.body;
		console.log(req.body.image);

		const uploadedImage = await cloudinary.uploader.upload(
			req.body.image.content,
			{
				upload_preset: process.env.CLOUDINARY_PRODUCT_UPLOAD,
				public_id: req.file.originalname,
			}
		);

		console.log(uploadedImage);

		// const createdProduct = await ProductModel.create({
		// 	name: "test",
		// 	description: "test",
		// 	// image,
		// 	// imageCloudId,
		// 	// price,
		// 	price: 1,
		// 	image: uploadedImage.secure_url,
		// 	imageCloudId: uploadedImage.public_id,
		// });

		res.status(200);
		// res.status(200).json(createdProduct);
	} catch (error) {
		res.status(400);
		next(error);
	}
};

export const updateProduct = async (
	req: Request<productParams["params"], {}, productBody["body"]>,
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
	req: Request<productParams["params"], {}, {}>,
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

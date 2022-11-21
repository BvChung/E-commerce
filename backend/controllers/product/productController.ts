import { Request, Response, NextFunction } from "express";
import ProductModel from "../../models/productModel";
import OrderModel from "../../models/orderModel";
import global from "../../types/types";
import cloudinaryConnection from "../../config/cloudinaryConfig";
import {
	productCreationBody,
	productParams,
	productUpdateBody,
} from "../../schemas/productSchema";
import dotenv from "dotenv";
dotenv.config();

export const getAllProducts = async (
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

export const queryProducts = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		if (!req.query.priceLow || !req.query.priceHigh) {
			return;
		}

		let queriedProducts;
		let minPrice;
		let maxPrice;

		if (req.query.priceLow === "min") {
			minPrice = 0.01;
		} else {
			minPrice = +req.query.priceLow;
		}

		if (req.query.priceHigh === "max") {
			maxPrice = Number.MAX_SAFE_INTEGER;
		} else {
			maxPrice = +req.query.priceHigh;
		}

		// Products are returned based on query
		// 1) Query contains category + price filter
		// 2) Query contains price filter
		// 3) Query contains category filter
		// 4) No query => returns all products
		if (req.query.category && minPrice && maxPrice) {
			queriedProducts = await ProductModel.find({
				category: { $in: req.query.category },
				price: { $gte: minPrice, $lt: maxPrice },
			});
		} else if (minPrice && maxPrice) {
			queriedProducts = await ProductModel.find({
				price: { $gte: minPrice, $lt: maxPrice },
			});
		} else if (req.query.category) {
			queriedProducts = await ProductModel.find({
				category: { $in: req.query.category },
			});
		} else {
			queriedProducts = await ProductModel.find({});
		}

		res.status(200).json(queriedProducts);
	} catch (error) {
		res.status(400);
		next(error);
	}
};

export const getCartItemsInfo = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		// productIds is an array containing item ids from the current account's cart
		// Iterates through productIds array and returns array with info of each product from the database
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
		const { name, description, color, price, category, image, fileName } =
			req.body;

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
			color,
			price,
			category,
			image: uploadedImage.secure_url,
			imageCloudId: uploadedImage.public_id,
			createdBy: req.user.id,
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
		const { name, description, color, price, category, image, fileName } =
			req.body;

		const { id: productId } = req.params;

		const foundProduct = await ProductModel.findById(productId);
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
			productId,
			{
				name,
				description,
				color,
				price,
				category,
				image: uploadedImage ? uploadedImage.secure_url : foundProduct.image,
				imageCloudId: uploadedImage
					? uploadedImage.public_id
					: foundProduct.imageCloudId,
			},
			{
				new: true,
			}
		);

		await OrderModel.updateMany(
			{
				"purchasedItems._id": productId,
			},
			{
				$set: {
					"purchasedItems.$.name": name,
					"purchasedItems.$.description": description,
					"purchasedItems.$.color": color,
					"purchasedItems.$.price": price,
					"purchasedItems.$.category": category,
					"purchasedItems.$.image": uploadedImage
						? uploadedImage.secure_url
						: foundProduct.image,
					"purchasedItems.$.imageCloudId": uploadedImage
						? uploadedImage.public_id
						: foundProduct.imageCloudId,
				},
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
		const { id: productId } = req.params;
		const deletedProduct = await ProductModel.findByIdAndDelete(productId);

		// Finds all orders with the product and $pull removes deleted product from purchasedItems array
		// await OrderModel.updateMany(
		// 	{
		// 		purchasedItems: {
		// 			$elemMatch: { _id: productId },
		// 		},
		// 	},
		// 	{
		// 		$pull: {
		// 			purchasedItems: {
		// 				_id: productId,
		// 			},
		// 		},
		// 	},
		// 	{
		// 		new: true,
		// 	}
		// );

		await OrderModel.updateMany(
			{
				"purchasedItems._id": productId,
			},
			{
				$pull: {
					"purchasedItems.$._id": productId,
				},
			},
			{
				new: true,
			}
		);

		if (!deletedProduct) throw new Error("Product not found.");

		await cloudinaryConnection.uploader.destroy(deletedProduct.imageCloudId);

		res.status(200).json(deletedProduct);
	} catch (error) {
		res.status(400);
		next(error);
	}
};

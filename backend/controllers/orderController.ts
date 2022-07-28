import { Request, Response, NextFunction } from "express";
import OrderModel from "../models/orderModel";
import global from "../types/types";
import { orderBody, orderParams } from "../schemas/orderSchema";

export const getOrder = async (
	req: Request<orderParams["params"], {}, {}>,
	res: Response,
	next: NextFunction
) => {
	try {
		const customerOrder = await OrderModel.find({ user: req.user.id });

		res.status(200).json(customerOrder);
	} catch (error) {
		res.status(400);
		next(error);
	}
};

export const createOrder = async (
	req: Request<{}, {}, orderBody["body"]>,
	res: Response,
	next: NextFunction
) => {
	try {
		const { shippingAddress, purchasedItems, paymentDetails } = req.body;

		const newOrder = await OrderModel.create({
			user: req.user.id,
			customerName: req.user.name,
			shippingAddress,
			purchasedItems,
			paymentDetails,
		});

		res.status(200).json(newOrder);
	} catch (error) {
		res.status(400);
		next(error);
	}
};

export const deleteOrder = async (
	req: Request<orderParams["params"], {}, {}>,
	res: Response,
	next: NextFunction
) => {
	try {
		const deletedOrder = await OrderModel.findByIdAndDelete(req.params.id);

		res.status(200).json(deletedOrder);
	} catch (error) {
		res.status(400);
		next(error);
	}
};

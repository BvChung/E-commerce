import { Request, Response, NextFunction } from "express";
import OrderModel from "../models/orderModel";
import global from "../types/types";
import { orderInput } from "../schemas/orderSchema";

export const getOrder = async (
	req: Request<orderInput["params"], {}, {}>,
	res: Response,
	next: NextFunction
) => {
	try {
		const order = await OrderModel.find({ user: req.user.id });

		res.status(200).json(order);
	} catch (error) {
		res.status(400);
		next(error);
	}
};

export const createOrder = async (
	req: Request<{}, {}, orderInput["body"]>,
	res: Response,
	next: NextFunction
) => {
	try {
		const { shippingAddress, purchasedItems, paymentDetails } = req.body;

		const createdOrder = await OrderModel.create({
			user: req.user.id,
			customerName: req.user.name,
			shippingAddress,
			purchasedItems,
			paymentDetails,
		});

		res.status(200).json(createdOrder);
	} catch (error) {
		res.status(400);
		next(error);
	}
};

export const deleteOrder = async (
	req: Request<orderInput["params"], {}, {}>,
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

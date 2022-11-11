import { Request, Response, NextFunction } from "express";
import OrderModel from "../../models/orderModel";
import global from "../../types/types";
import { orderBody, orderParams } from "../../schemas/orderSchema";

export const getOrder = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const myOrder = await OrderModel.find({ accountId: req.user.id });

		res.status(200).json(myOrder);
	} catch (error) {
		res.status(400);
		next(error);
	}
};

export const getOrderInfo = async (
	req: Request<orderParams["params"], {}, {}>,
	res: Response,
	next: NextFunction
) => {
	try {
		const foundOrder = await OrderModel.findById(req.params.id);

		res.status(200).json(foundOrder);
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
		const { accountId, shippingInfo, purchasedItems, paymentInfo } = req.body;

		const createdOrder = await OrderModel.create({
			accountId,
			shippingInfo,
			purchasedItems,
			paymentInfo,
		});

		res.status(200).json(createdOrder);
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

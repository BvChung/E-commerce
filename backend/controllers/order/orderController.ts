import { Request, Response, NextFunction } from "express";
import OrderModel from "../../models/orderModel";
import global from "../../types/types";

export const getOrder = async (
	req: Request,
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
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const test = {
			user: req.user.id,
			customerName: req.user.name,
			shippingAddress: {
				address: "1",
				city: "1",
				country: "1",
				postalCode: "1",
			},
			purchasedItems: [
				{
					id: "1",
					name: "1",
					quantity: 2,
					image: "1",
					price: "1",
				},
				{
					id: "1",
					name: "1",
					quantity: 2,
					image: "1",
					price: "1",
				},
			],
			paymentDetails: {
				paymentType: "1",
				cardNumber: "1",
				totalCost: 23,
				datePurchased: "1",
			},
		};

		const createdOrder = await OrderModel.create(test);

		res.status(200).json(createdOrder);
	} catch (error) {
		res.status(400);
		next(error);
	}
};

export const deleteOrder = async (
	req: Request,
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

import React, { createContext, useState } from "react";
import { OrderForm } from "../interfaces/orderInterface";

interface OrderContextInterface {
	myOrder: OrderForm;
	setMyOrder: React.Dispatch<React.SetStateAction<OrderForm>>;
	handlePayment(
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLSelectElement>
	): void;
	handleShipping(e: React.ChangeEvent<HTMLInputElement>): void;
}

interface OrderProviderProps {
	children: React.ReactNode;
}

export const OrderContext = createContext({} as OrderContextInterface);

export const OrderProvider = ({ children }: OrderProviderProps) => {
	const [myOrder, setMyOrder] = useState<OrderForm>({
		customerId: "",
		customerName: "",
		paymentDetails: {
			paymentType: "",
			cardNumber: "",
			totalCost: "",
			datePurchased: "",
		},
		shippingAddress: {
			address: "",
			city: "",
			country: "",
			postalCode: "",
		},
		// paymentType: "",
		// cardNumber: "",
		// totalCost: "",
		// datePurchased: "",
		// address: "",
		// city: "",
		// country: "",
		// postalCode: "",
	});

	function handlePayment(
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLSelectElement>
	) {
		const { name, value } = e.target;

		setMyOrder((prev) => {
			return {
				...prev,
				paymentDetails: {
					...prev.paymentDetails,
					[name]: value,
				},
			};
		});
	}

	function handleShipping(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;

		setMyOrder((prev) => {
			return {
				...prev,
				shippingAddress: {
					...prev.shippingAddress,
					[name]: value,
				},
			};
		});
	}

	return (
		<OrderContext.Provider
			value={{ myOrder, setMyOrder, handlePayment, handleShipping }}
		>
			{children}
		</OrderContext.Provider>
	);
};

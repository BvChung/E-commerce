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
		shippingInfo: {
			firstName: "",
			lastName: "",
			address: "",
			aptSuiteEtc: "",
			state: "",
			city: "",
			postalCode: "",
			phone: "",
			email: "",
		},
		paymentInfo: {
			paymentType: "",
			cardNumber: "",
			cardHolder: "",
			expiryDateMonth: "",
			expiryDateYear: "",
			securityCode: "",
			totalCost: "",
			datePurchased: "",
		},
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
				paymentInfo: {
					...prev.paymentInfo,
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
				shippingInfo: {
					...prev.shippingInfo,
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

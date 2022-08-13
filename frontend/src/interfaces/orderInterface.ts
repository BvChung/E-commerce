import { CartInfo } from "./cartInterface";

export interface OrderForm {
	shippingInfo: {
		firstName: string;
		lastName: string;
		address: string;
		aptSuiteEtc?: string;
		state: string;
		city: string;
		postalCode: string;
		phone: string;
		email: string;
	};
	paymentInfo: {
		paymentType: string;
		cardNumber: string;
		cardHolder: string;
		expiryDateMonth: string;
		expiryDateYear: string;
		securityCode: string;
		totalCost: string | number;
		datePurchased: string;
	};
}

export interface OrderInfo {
	_id: string;
	purchasedItems: {
		productId: string;
		name: string;
		description: string;
		category: string;
		price: number;
		quantity: number;
		image: string;
		imageCloudId: string;
	}[];
	shippingInfo: {
		firstName: string;
		lastName: string;
		address: string;
		aptSuiteEtc: string;
		state: string;
		city: string;
		postalCode: string;
		phone: string;
		email: string;
	};
	paymentInfo: {
		paymentType: string;
		cardNumber: string;
		cardHolder: string;
		expiryDateMonth: string;
		expiryDateYear: string;
		securityCode: string;
		totalCost: number;
		datePurchased: string;
	};
}

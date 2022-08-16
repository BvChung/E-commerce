import { CartInfo } from "./cartInterface";

export interface OrderShippingInfo {
	firstName: string;
	lastName: string;
	address: string;
	aptSuiteEtc?: string;
	state: string;
	city: string;
	zipCode: string;
	phone: string;
	email: string;
}

export interface OrderCardInfo {
	cardNumber: string;
	cardHolderFirstName: string;
	cardHolderLastName: string;
	expiryDateMonth: string;
	expiryDateYear: string;
	securityCode: string;
	phone: string;
	subTotal: number;
	datePurchased: string;
}

export interface OrderForm {
	shippingInfo: OrderShippingInfo;
	paymentInfo: OrderCardInfo;
}

export interface OrderInfo {
	_id?: string;
	purchasedItems: CartInfo[];
	shippingInfo: {
		firstName: string;
		lastName: string;
		address: string;
		aptSuiteEtc?: string;
		state: string;
		city: string;
		zipCode: string;
		phone: string;
		email: string;
	};
	paymentInfo: {
		cardNumber: string;
		cardHolderFirstName: string;
		cardHolderLastName: string;
		expiryDateMonth: string;
		expiryDateYear: string;
		securityCode: string;
		phone: string;
		subTotal: number;
		datePurchased: string;
	};
}

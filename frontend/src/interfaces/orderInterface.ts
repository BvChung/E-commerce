import { CartItemInfo } from "./cartInterface";

interface OrderShippingInfo {
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

interface OrderPaymentInfo {
	cardNumber: string;
	cardHolderFirstName: string;
	cardHolderLastName: string;
	expiryDateMonth: string;
	expiryDateYear: string;
	securityCode: string;
	phone: string;
	subTotal: number;
}

export interface OrderForm {
	shippingInfo: OrderShippingInfo;
	paymentInfo: OrderPaymentInfo;
}

// const now = new Date("2022-07-08T23:43:14.121+00:00"); => from mongoDB created at
// console.log(now.toDateString());
export interface OrderInfo {
	_id?: string;
	purchasedItems: CartItemInfo[];
	shippingInfo: OrderShippingInfo;
	paymentInfo: OrderPaymentInfo;
}

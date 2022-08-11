import { CartInfo } from "./cartInterface";

export interface OrderForm {
	customerId: string;
	customerName: string;
	shippingAddress: {
		address: string;
		city: string;
		country: string;
		postalCode: string;
	};
	paymentDetails: {
		paymentType: string;
		cardNumber: string;
		totalCost: string | number;
		datePurchased: string;
	};
}

// export interface OrderForm {
// 	customerId: string;
// 	customerName: string;
// 	address: string;
// 	city: string;
// 	country: string;
// 	postalCode: string;
// 	paymentType: string;
// 	cardNumber: string;
// 	totalCost: string | number;
// 	datePurchased: string;
// }

export interface OrderInfo {
	_id: string;
	customerId: string;
	customerName: string;
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
	shippingAddress: {
		address: string;
		city: string;
		country: string;
		postalCode: string;
	};
	paymentDetails: {
		paymentType: string;
		cardNumber: string;
		totalCost: number;
		datePurchased: string;
	};
}

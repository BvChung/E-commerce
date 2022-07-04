export interface OrderInfo {
	_id: string;
	user: string;
	customerName: string;
	purchasedItems: {
		productId: string;
		name: string;
		quantity: number;
		image: string;
		price: number;
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

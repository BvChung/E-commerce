import { ProductInfo } from "./productInterface";

export interface CartStorageData {
	_id: string;
	price: number;
	quantity: number;
}

export interface CartCheckoutInfo {
	subTotal: number;
	numItems: number;
}

export interface CartItemInfo extends ProductInfo {
	quantity: number;
}

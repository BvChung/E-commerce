// import { ProductInfo } from "./productInterface";

interface Cart {
	_id: string;
}

export interface CartStorageData extends Cart {
	price: number;
	quantity: number;
}

export interface CartCheckoutInfo {
	subTotal: number;
	numItems: number;
}

export interface CartItemQuantity extends Cart {
	quantity: number;
}

export interface CartItemPrice extends Cart {
	price: number;
}

export interface CartItemInfo {
	_id: string;
	image: string;
	imageCloudId: string;
	price: number;
	name: string;
	description: string;
	category: string;
}

// export interface CartItemInfo extends ProductInfo {
// 	quantity: number;
// }

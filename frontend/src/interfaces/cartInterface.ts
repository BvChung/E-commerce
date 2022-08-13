import { ProductInfo } from "./productInterface";

export interface CartStorageData {
	_id: string;
	price: number;
	quantity: number;
}

export interface CartInfo extends ProductInfo {
	quantity: number;
}

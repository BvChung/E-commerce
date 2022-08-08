import { ProductInfo } from "./productInterface";

export interface CartStorageData {
	_id: string;
	quantity: number;
}

export interface CartInfo extends ProductInfo {
	quantity: number;
}

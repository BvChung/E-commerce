export interface ProductInfo {
	_id: string;
	name: string;
	description: string;
	price: string | number;
	category: string;
	image: string;
}

export interface TestImage {
	fileName: string | null;
	image: string | null;
}

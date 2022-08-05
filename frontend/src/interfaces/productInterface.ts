interface Product {
	name: string;
	description: string;
	category: string;
}

export interface ProductDetails extends Product {
	_id: string;
	price: number;
	image: string;
	imageCloudId: string;
}

export interface ProductCreation extends Product {
	price: number;
	fileName: string | null;
	image: string | null;
}

export interface ProductForm extends Product {
	price: string;
}

interface Product {
	name: string;
	description: string;
	category: string;
}

export interface ProductInfo extends Product {
	_id: string;
	image: string;
	imageCloudId: string;
	price: number;
	setItemId?: React.Dispatch<React.SetStateAction<string>>;
	setDeleteConfirmation?: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ProductCreation extends Product {
	fileName: string | null;
	image: string | null;
	price: number;
}

export interface ProductUpdate extends Product {
	fileName?: string | null;
	image?: string | null;
	price: number;
}

export interface ProductForm extends Product {
	price: string;
}

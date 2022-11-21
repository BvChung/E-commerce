import { cldConfig } from "../config/cloudinaryConfig";
import { CloudinaryImage } from "@cloudinary/url-gen";

export interface CarouselData {
	slides: CloudinaryImage[];
	// slides: string[];
}

const sofaImg = cldConfig
	.image("Commerce_Products/sven-brandsma-GZ5cKOgeIB0-unsplash_naus7q.jpg")
	.format("auto")
	.quality("auto");

export const carouselData: CarouselData = {
	slides: [sofaImg, sofaImg, sofaImg, sofaImg, sofaImg],
	// slides: [Sofa, Desk, Table, Chair, Drawer],
};

export const categoryData = [];

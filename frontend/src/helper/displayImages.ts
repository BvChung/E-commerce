import { cldConfig } from "../config/cloudinaryConfig";
import { CloudinaryImage } from "@cloudinary/url-gen";

export interface CarouselData {
	slides: string[];
	// slides: string[];
}

export const carouselData: CarouselData = {
	slides: [
		"Commerce_Products/sven-brandsma-GZ5cKOgeIB0-unsplash_naus7q.jpg",
		"ECommerceDisplay/kam-idris-_HqHX3LBN18-unsplash_erbbeu.jpg",
		"ECommerceDisplay/pickawood-532oh8WKfpA-unsplash_bdq1hw.jpg",
		"Commerce_Products/sven-brandsma-GZ5cKOgeIB0-unsplash_naus7q.jpg",
		"Commerce_Products/sven-brandsma-GZ5cKOgeIB0-unsplash_naus7q.jpg",
	],
	// slides: [Sofa, Desk, Table, Chair, Drawer],
};

export const categoryData = [
	{
		id: 1,
		imgPubId: "ECommerceDisplay/jonathan-borba-9iljaLpo9uw-unsplash_k7da2r.jpg",
		title: "Sofas",
	},
	{
		id: 2,
		imgPubId:
			"ECommerceDisplay/jean-philippe-delberghe-F0DdaYs0EeQ-unsplash_zkq9nd.jpg",
		title: "Tables",
	},
	{
		id: 3,
		imgPubId: "ECommerceDisplay/ergonofis-tdnYk4qOGhc-unsplash_fngntv.jpg",
		title: "Desks",
	},
	{
		id: 4,
		imgPubId: "ECommerceDisplay/khloe-arledge-8Rz_RIyp5FM-unsplash_jeiko3.jpg",
		title: "Chairs",
	},
	{
		id: 5,
		imgPubId: "ECommerceDisplay/toa-heftiba-TWOnvtstmeU-unsplash_flmj1l.jpg",
		title: "Drawers",
	},
	{
		id: 6,
		imgPubId:
			"ECommerceDisplay/natural-goods-berlin-L6NP4ZGnpSY-unsplash_hlxl8w.jpg",
		title: "Shelves",
	},
];

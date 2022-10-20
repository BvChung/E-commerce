//@ts-ignore
import Desk from "../assets/desk.jpg";
//@ts-ignore
import Sofa from "../assets/sofa.jpg";
//@ts-ignore
import Chair from "../assets/chair.jpg";
//@ts-ignore
import Drawer from "../assets/drawer.jpg";
//@ts-ignore
import Shelf from "../assets/shelf.jpg";
//@ts-ignore
import Table from "../assets/table.jpg";

export interface CarouselData {
	slides: string[];
}

export const carouselData: CarouselData = {
	slides: [Sofa, Desk, Table, Chair, Drawer],
};

export const categoryData = [Sofa, Table, Desk, Chair, Drawer, Shelf];

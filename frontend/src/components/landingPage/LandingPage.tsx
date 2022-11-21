import { useId } from "react";
import { carouselData } from "../../helper/displayImages";
import Carousel from "./display/Carousel";

function LandingPage() {
	return (
		<div className="flex flex-col w-full gap-2 items-center justify-center">
			<div className="w-full mb-16">
				<Carousel slides={carouselData.slides} />
			</div>

			<div className="w-full flex flex-col items-center justify-center mb-16">
				<h1 className="font-medium text-3xl mb-6">Minimal and Aesthetic</h1>
				<p className="">Explore our unique line of collections.</p>
			</div>

			{/* <div className="w-full h-fit md:max-w-7xl grid justify-center items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 mb-16">
				<Category key={useId()} image={Sofa} title={"Sofas"} />
				<Category key={useId()} image={Table} title={"Tables"} />
				<Category key={useId()} image={Desk} title={"Desks"} />
				<Category key={useId()} image={Chair} title={"Chairs"} />
				<Category key={useId()} image={Drawer} title={"Drawers"} />
				<Category key={useId()} image={Shelf} title={"Shelves"} />
			</div> */}
		</div>
	);
}

export default LandingPage;

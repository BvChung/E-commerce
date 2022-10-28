import { useId } from "react";
import { useNavigate } from "react-router-dom";
import { useRefreshToken } from "../../hooks/auth/useRefreshToken";
import { carouselData } from "../../helper/displayImages";
import Carousel from "./Carousel";
import Category from "./Category";
//@ts-ignore
import Desk from "../../assets/desk.jpg";
//@ts-ignore
import Couch from "../../assets/sven.jpg";
//@ts-ignore
import Sofa from "../../assets/sofa.jpg";
//@ts-ignore
import Chair from "../../assets/chair.jpg";
//@ts-ignore
import Drawer from "../../assets/drawer.jpg";
//@ts-ignore
import Shelf from "../../assets/shelf.jpg";
//@ts-ignore
import Table from "../../assets/table.jpg";

function LandingPage() {
	const navigate = useNavigate();
	const refreshToken = useRefreshToken();

	return (
		<div className="flex flex-col w-full gap-2 items-center justify-center">
			<div className="w-full mb-16">
				<Carousel slides={carouselData.slides} />
			</div>

			<div className="w-full flex flex-col items-center justify-center mb-12">
				<h1 className="font-medium text-3xl mb-7">Minimal and Aesthetic</h1>
				<p className="font-">Explore our unique line of collections.</p>
			</div>

			<div className="w-full h-fit md:max-w-7xl grid justify-center items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
				<Category key={useId()} image={Sofa} title={"Sofas"} />
				<Category key={useId()} image={Table} title={"Tables"} />
				<Category key={useId()} image={Desk} title={"Desks"} />
				<Category key={useId()} image={Chair} title={"Chairs"} />
				<Category key={useId()} image={Drawer} title={"Drawers"} />
				<Category key={useId()} image={Shelf} title={"Shelves"} />
			</div>

			<div className="grid gap-4 grid-cols-2 mt-10">
				<button
					onClick={() => {
						navigate("/orders");
					}}
					className="btn uppercase"
				>
					Orders
				</button>
				<button
					onClick={() => {
						navigate("/admin");
					}}
					className="btn btn-secondary uppercase"
				>
					Admin
				</button>

				<button
					onClick={() => {
						navigate("/cart");
					}}
					className="btn btn-info w-20 uppercase"
				>
					Cart
				</button>
				<button
					onClick={() => {
						refreshToken();
					}}
					className="btn w-20 uppercase"
				>
					Refresh Token
				</button>
			</div>
		</div>
	);
}

export default LandingPage;

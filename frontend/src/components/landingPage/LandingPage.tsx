import React from "react";
import { useNavigate } from "react-router-dom";
import { useRefreshToken } from "../../hooks/auth/useRefreshToken";
import { Link } from "react-router-dom";
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
		<div className="flex flex-col w-full gap-2 items-center justify-center mx-4 lg:mx-0">
			<Carousel slides={carouselData.slides} />

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
				<Category image={Sofa} title={"Sofas"} />
				<Category image={Table} title={"Tables"} />
				<Category image={Desk} title={"Desks"} />
				<Category image={Chair} title={"Chairs"} />
				<Category image={Drawer} title={"Drawers"} />
				<Category image={Shelf} title={"Shelves"} />
			</div>

			<div className="grid gap-4 grid-cols-2">
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

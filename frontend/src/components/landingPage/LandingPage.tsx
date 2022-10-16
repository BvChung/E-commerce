import React from "react";
import { useNavigate } from "react-router-dom";
import { useRefreshToken } from "../../hooks/auth/useRefreshToken";
import { Link } from "react-router-dom";
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
		<div className="flex flex-col gap-2 items-center justify-center">
			<div className="carousel w-full mb-8">
				<div id="slide1" className="carousel-item relative w-full">
					<img
						src={Couch}
						className="w-full max-h-96 object-cover"
						alt="Couch"
					/>
					<div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
						<a
							href="#slide4"
							className="btn h-14 w-14 flex items-center justify-center bg-opacity-60 btn-circle border-none bg-gray-800 hover:bg-opacity-90 hover:bg-gray-800"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={2}
								stroke="currentColor"
								className="w-7 h-7 stroke-white"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M15.75 19.5L8.25 12l7.5-7.5"
								/>
							</svg>
						</a>
						<a
							href="#slide2"
							className="btn h-14 w-14 flex items-center justify-center bg-opacity-60 btn-circle border-none bg-gray-800 hover:bg-opacity-90 hover:bg-gray-800"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={2}
								stroke="currentColor"
								className="w-7 h-7 stroke-white"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M8.25 4.5l7.5 7.5-7.5 7.5"
								/>
							</svg>
						</a>
					</div>
				</div>
				<div id="slide2" className="carousel-item relative w-full">
					<img
						src={Couch}
						className="w-full max-h-96 object-cover"
						alt="Couch"
					/>
					<div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
						<a
							href="#slide1"
							className="btn h-14 w-14 flex items-center justify-center bg-opacity-60 btn-circle border-none bg-gray-800 hover:bg-opacity-90 hover:bg-gray-800"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={2}
								stroke="currentColor"
								className="w-7 h-7 stroke-white"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M15.75 19.5L8.25 12l7.5-7.5"
								/>
							</svg>
						</a>
						<a
							href="#slide3"
							className="btn h-14 w-14 flex items-center justify-center bg-opacity-60 btn-circle border-none bg-gray-800 hover:bg-opacity-90 hover:bg-gray-800"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={2}
								stroke="currentColor"
								className="w-7 h-7 stroke-white"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M8.25 4.5l7.5 7.5-7.5 7.5"
								/>
							</svg>
						</a>
					</div>
				</div>
				<div id="slide3" className="carousel-item relative w-full">
					<img
						src={Couch}
						className="w-full max-h-96 object-cover"
						alt="Couch"
					/>
					<div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
						<a
							href="#slide2"
							className="btn h-14 w-14 flex items-center justify-center bg-opacity-60 btn-circle border-none bg-gray-800 hover:bg-opacity-90 hover:bg-gray-800"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={2}
								stroke="currentColor"
								className="w-7 h-7 stroke-white"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M15.75 19.5L8.25 12l7.5-7.5"
								/>
							</svg>
						</a>
						<a
							href="#slide4"
							className="btn h-14 w-14 flex items-center justify-center bg-opacity-60 btn-circle border-none bg-gray-800 hover:bg-opacity-90 hover:bg-gray-800"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={2}
								stroke="currentColor"
								className="w-7 h-7 stroke-white"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M8.25 4.5l7.5 7.5-7.5 7.5"
								/>
							</svg>
						</a>
					</div>
				</div>
				<div id="slide4" className="carousel-item relative w-full">
					<img
						src={Couch}
						className="w-full max-h-96 object-cover"
						alt="Couch"
					/>
					<div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
						<a
							href="#slide3"
							className="btn h-14 w-14 flex items-center justify-center bg-opacity-60 btn-circle border-none bg-gray-800 hover:bg-opacity-90 hover:bg-gray-800"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={2}
								stroke="currentColor"
								className="w-7 h-7 stroke-white"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M15.75 19.5L8.25 12l7.5-7.5"
								/>
							</svg>
						</a>
						<a
							href="#slide1"
							className="btn h-14 w-14 flex items-center justify-center bg-opacity-60 btn-circle border-none bg-gray-800 hover:bg-opacity-90 hover:bg-gray-800"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={2}
								stroke="currentColor"
								className="w-7 h-7 stroke-white"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M8.25 4.5l7.5 7.5-7.5 7.5"
								/>
							</svg>
						</a>
					</div>
				</div>
			</div>

			<Carousel />

			<div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
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

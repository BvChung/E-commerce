import React, { useState } from "react";
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

export default function Carousel() {
	const [currentIndex, setCurrentIndex] = useState<number>(0);

	const data = [
		{
			img: Couch,
		},
		{
			img: Sofa,
		},
		{
			img: Chair,
		},
		{
			img: Drawer,
		},
	];

	function toNextImg() {
		setCurrentIndex((prev) =>
			currentIndex === data.length - 1 ? 0 : prev + 1
		);
	}

	function toPrevImg() {
		setCurrentIndex((prev) =>
			currentIndex === 0 ? data.length - 1 : prev - 1
		);
	}

	return (
		<div className="flex flex-col items-center justify-center gap-2 w-full">
			<div className="flex items-center w-full relative justify-center">
				{data.map((el, i) => {
					return (
						<div className={`w-full`}>
							<img
								key={i}
								src={el.img}
								alt="img"
								className="w-96 h-96 object-cover"
							></img>
						</div>
					);
				})}

				<div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
					<button
						onClick={toPrevImg}
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
					</button>
					<button
						onClick={toNextImg}
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
					</button>
				</div>
			</div>

			<div className="w-full relative">
				<img
					src={data[currentIndex].img}
					alt="img"
					className="w-full max-h-96 object-fill"
				></img>

				<div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
					<button
						onClick={toPrevImg}
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
					</button>
					<button
						onClick={toNextImg}
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
					</button>
				</div>
			</div>
		</div>
	);
}

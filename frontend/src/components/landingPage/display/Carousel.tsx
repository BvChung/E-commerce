import { useState, useEffect, useRef, useId } from "react";
import { Link } from "react-router-dom";
import { CarouselData } from "../../../helper/displayImages";
import Indicator from "./Indicator";
import { cldConfig } from "../../../config/cloudinaryConfig";
import { AdvancedImage, lazyload } from "@cloudinary/react";
import { fill, crop, scale, fit } from "@cloudinary/url-gen/actions/resize";

export default function Carou({ slides }: CarouselData) {
	const [currentIndex, setCurrentIndex] = useState<number>(0);
	const slideInterval = useRef<ReturnType<typeof setInterval>>();

	function startTimer() {
		slideInterval.current = setInterval(() => {
			setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
		}, 8000);
	}

	useEffect(() => {
		startTimer();

		return () => stopTimer();
	}, []);

	function toNextSlide() {
		setCurrentIndex((prev) =>
			currentIndex === slides.length - 1 ? 0 : prev + 1
		);
	}

	function toPrevSlide() {
		setCurrentIndex((prev) =>
			currentIndex === 0 ? slides.length - 1 : prev - 1
		);
	}

	function stopTimer() {
		if (slideInterval.current) {
			clearInterval(slideInterval.current);
		}
	}

	return (
		<div className="flex relative w-full">
			<div className="overflow-hidden w-full">
				<div className="flex w-full">
					{slides.map((img, index) => {
						return (
							<div key={index} className="relative min-w-full">
								<div
									onMouseOver={stopTimer}
									onMouseLeave={startTimer}
									className="relative w-full
                             h-[34rem]"
								>
									{/* <img
										src={img}
										alt="Carousel"
										className="absolute block w-full object-cover h-[34rem] ease-out duration-1000"
										style={{ transform: `translateX(${-currentIndex * 100}%)` }}
										loading="lazy"
									/> */}

									<AdvancedImage
										cldImg={img}
										plugins={[
											lazyload({
												rootMargin: "10px 20px 10px 30px",
												threshold: 0.25,
											}),
										]}
										className="absolute block w-full object-cover h-[34rem] ease-out duration-1000"
										style={{ transform: `translateX(${-currentIndex * 100}%)` }}
										alt="Carousel"
									/>
								</div>
							</div>
						);
					})}
				</div>
			</div>

			<div className="absolute top-14 left-16 w-fit">
				<h2 className="text-2xl font-semibold text-white mb-2">
					The Modern Collection
				</h2>
				<p className="font-normal text-white mb-6">Simple and Elegant</p>
				<Link
					to={"/products"}
					className="btn border-white hover:border-gray-200 hover:bg-gray-200 bg-white text-black"
				>
					Shop now
				</Link>
			</div>

			<div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
				<button
					onMouseOver={stopTimer}
					onMouseLeave={startTimer}
					onClick={toPrevSlide}
					className="btn h-14 w-14 flex items-center justify-center bg-opacity-0 btn-circle border-none hover:bg-opacity-70 hover:bg-gray-900"
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
					onMouseOver={stopTimer}
					onMouseLeave={startTimer}
					onClick={toNextSlide}
					className="btn h-14 w-14 flex items-center justify-center bg-opacity-0 btn-circle border-none hover:bg-opacity-70 hover:bg-gray-900"
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

			<div
				onMouseOver={stopTimer}
				onMouseLeave={startTimer}
				className="absolute w-[240px] bg-gray-500 bg-opacity-30 p-2 rounded-full shadow-sm flex items-center justify-center gap-4 -translate-y-1/2 left-1/2 ml-[-120px] bottom-0"
			>
				<Indicator
					key={useId()}
					currentIndex={currentIndex}
					toIndex={0}
					setCurrentIndex={setCurrentIndex}
				/>
				<Indicator
					key={useId()}
					currentIndex={currentIndex}
					toIndex={1}
					setCurrentIndex={setCurrentIndex}
				/>
				<Indicator
					key={useId()}
					currentIndex={currentIndex}
					toIndex={2}
					setCurrentIndex={setCurrentIndex}
				/>
				<Indicator
					key={useId()}
					currentIndex={currentIndex}
					toIndex={3}
					setCurrentIndex={setCurrentIndex}
				/>
				<Indicator
					key={useId()}
					currentIndex={currentIndex}
					toIndex={4}
					setCurrentIndex={setCurrentIndex}
				/>
			</div>
		</div>
	);
}

import { useState, useEffect, useRef, useCallback, useId } from "react";
import { carouselData, CarouselData } from "../../helper/displayImages";
import Indicator from "./Indicator";

export default function Carou({ slides }: CarouselData) {
	const [currentIndex, setCurrentIndex] = useState<number>(0);
	const slideInterval = useRef<ReturnType<typeof setInterval>>();

	// const startTimer = useCallback(() => {
	// 	slideInterval.current = setInterval(() => {
	// 		setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
	// 	}, 5000);
	// }, [slides.length]);

	function startTimer() {
		slideInterval.current = setInterval(() => {
			setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
		}, 10000);
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
			console.log("stop");
			clearInterval(slideInterval.current);
		}
	}

	return (
		<div className="flex relative w-full ">
			<div className="overflow-hidden w-full">
				<div className="flex w-full">
					{slides.map((img, index) => {
						return (
							<div key={index} className="relative min-w-full">
								<div
									onMouseOver={stopTimer}
									onMouseLeave={startTimer}
									className="relative w-full
                             h-[30rem]"
								>
									<img
										src={img}
										alt="Carousel"
										className="absolute block w-full  object-cover h-[30rem] ease-out duration-1000"
										style={{ transform: `translateX(${-currentIndex * 100}%)` }}
									></img>
								</div>
							</div>
						);
					})}
				</div>
			</div>

			<div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
				<button
					onMouseOver={stopTimer}
					onMouseLeave={startTimer}
					onClick={toPrevSlide}
					className="btn h-14 w-14 flex items-center justify-center bg-opacity-0 btn-circle border-none bg-gray-700 hover:bg-opacity-70 hover:bg-gray-800"
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
					className="btn h-14 w-14 flex items-center justify-center bg-opacity-0 btn-circle border-none bg-gray-700 hover:bg-opacity-70 hover:bg-gray-800"
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

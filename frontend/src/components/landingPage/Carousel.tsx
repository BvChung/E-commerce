import { useState, useEffect, useRef, useCallback, useId } from "react";
import { carouselData, CarouselData } from "../../helper/displayImages";
import Indicator from "./Indicator";

export default function Carousel({ data }: CarouselData) {
	const [currentIndex, setCurrentIndex] = useState<number>(0);
	const slideInterval = useRef<ReturnType<typeof setInterval>>();

	const startTimer = useCallback(() => {
		slideInterval.current = setInterval(() => {
			setCurrentIndex((prev) => (prev === data.length - 1 ? 0 : prev + 1));
		}, 10000);
	}, [data.length]);

	useEffect(() => {
		startTimer();

		return () => stopTimer();
	}, [startTimer]);

	function toNextSlide() {
		setCurrentIndex((prev) =>
			currentIndex === data.length - 1 ? 0 : prev + 1
		);
	}

	function toPrevSlide() {
		setCurrentIndex((prev) =>
			currentIndex === 0 ? data.length - 1 : prev - 1
		);
	}

	function toSpecificSlide(index: number) {
		setCurrentIndex(index);
	}

	function stopTimer() {
		if (slideInterval.current) {
			clearInterval(slideInterval.current);
		}
	}

	return (
		<div className="flex relative w-full overflow-hidden lg:max-w-5xl xl:max-w-7xl">
			<div className="flex ">
				{data.map((img, index) => {
					return (
						<div
							key={index}
							className={`w-full`}
							onMouseOver={stopTimer}
							onMouseLeave={startTimer}
						>
							<img
								key={index}
								src={img}
								alt="Carouse"
								className="w-full lg:min-w-[64rem] xl:min-w-[80rem] h-[30rem] object-cover carousel-item ease-out duration-1000"
								style={{ transform: `translateX(${-currentIndex * 100}%)` }}
							></img>
						</div>
					);
				})}
			</div>

			<div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
				<button
					onClick={toPrevSlide}
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
					onClick={toNextSlide}
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

			<div className="absolute w-fit bg-gray-400 bg-opacity-30 p-2 rounded-full flex gap-4 -translate-y-1/2 left-[45%] right-[60%] bottom-0 ">
				{/* absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 */}
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

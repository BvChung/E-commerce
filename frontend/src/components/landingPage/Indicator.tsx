import React from "react";

interface CarouselIndicator {
	currentIndex: number;
	toIndex: number;
	setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function Indicator({
	currentIndex,
	toIndex,
	setCurrentIndex,
}: CarouselIndicator) {
	const active = currentIndex === toIndex ? "bg-gray-900" : "bg-white";
	return (
		<button
			onClick={(e) => {
				setCurrentIndex(toIndex);
			}}
			name="carouselRadio"
			className={`radio h-[.8rem] w-[.8rem] ${active}`}
		/>
	);
}

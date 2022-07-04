import React from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
	const navigate = useNavigate();
	return (
		<div className="flex items-center justify-center">
			<span>LandingPage</span>
			<button
				onClick={() => {
					navigate("/checkout");
				}}
				className="btn uppercase"
			>
				Checkout
			</button>
			<button
				onClick={() => {
					navigate("/checkout/information");
				}}
				className="btn w-20 uppercase"
			>
				Info
			</button>
			<button
				onClick={() => {
					navigate("/checkout/payment");
				}}
				className="btn w-20 uppercase"
			>
				Payment
			</button>
			<button
				onClick={() => {
					navigate("/admin");
				}}
				className="btn w-20 uppercase"
			>
				Admin
			</button>
		</div>
	);
}

export default LandingPage;

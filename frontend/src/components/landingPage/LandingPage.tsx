import React from "react";
import { useNavigate } from "react-router-dom";
import { useRefreshToken } from "../../hooks/auth/useRefreshToken";
// import { refreshToken } from "../../api/tokenApi";

function LandingPage() {
	const navigate = useNavigate();
	const refreshToken = useRefreshToken();

	return (
		<div className="flex flex-col gap-2 items-center justify-center">
			<span>LandingPage</span>
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
	);
}

export default LandingPage;

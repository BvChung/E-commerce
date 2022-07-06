import React from "react";
import { useNavigate } from "react-router-dom";

export default function Unauthorized() {
	const navigate = useNavigate();
	return (
		<div>
			<p>Unauthorized</p>
			<button
				onClick={() => {
					navigate(-1);
				}}
				className="btn"
			>
				Go back
			</button>
		</div>
	);
}

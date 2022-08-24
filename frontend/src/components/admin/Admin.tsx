import React from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Admin() {
	const navigate = useNavigate();
	return (
		<div>
			Admin
			<div>
				<button
					onClick={() => {
						navigate("/admin/updateproduct");
					}}
					className="btn w-20 uppercase"
				>
					Update product
				</button>
				<button
					onClick={() => {
						navigate("/admin/createproduct");
					}}
					className="btn btn-secondary w-20 uppercase"
				>
					Create Product
				</button>
			</div>
		</div>
	);
}

import React from "react";
import { Link } from "react-router-dom";
import { useGetAccounts } from "../../../hooks/admin/useGetAccounts";

export default function ManageAccounts() {
	const { data } = useGetAccounts();
	console.log(data);

	return (
		<div className="flex flex-col items-center justify-center mb-10 mx-4 ">
			<div className="flex items-center gap-2 w-full mt-8 mb-8 pb-2 border-b-[1px] border-gray-200 lg:max-w-5xl xl:max-w-6xl">
				<Link to={"/admin"} className="mr-2 cursor-pointer">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={2}
						stroke="currentColor"
						className="w-5 h-5"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
						/>
					</svg>
				</Link>
				<span className="font-medium text-xl sm:text-2xl">Manage</span>
			</div>
		</div>
	);
}

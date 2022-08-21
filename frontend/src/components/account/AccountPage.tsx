import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/context/useAuthContext";

export default function AccountPage() {
	const { user } = useAuthContext();

	return (
		<div className="flex flex-col gap-10 items-center ">
			<h1>Personal info</h1>
			<div className="flex flex-col max-w-3xl items-center w-full rounded-sm border-[1px]">
				<Link
					to="/account/name"
					className="w-full px-6 hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer"
				>
					<div className="flex items-center justify-center py-6 border-b-[1px]">
						<div className="flex flex-1">
							<div className="flex items-center basis-44 mr-6 font-medium text-sm">
								Name
							</div>
							<div className="flex basis-96 items-center text-sm">
								{user.firstName} {user.lastName}
							</div>
						</div>
						<div className="ml-4">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth={2}
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M9 5l7 7-7 7"
								/>
							</svg>
						</div>
					</div>
				</Link>

				<Link
					to="/account/email"
					className="w-full px-6 hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer"
				>
					<div className="flex items-center justify-center border-b-[1px] py-6 ">
						<div className="flex flex-1">
							<div className="flex items-center basis-44 mr-6 font-medium text-sm">
								Email
							</div>
							<div className="flex basis-96 items-center text-sm">
								{user.email}
							</div>
						</div>
						<div className="ml-4">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth={2}
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M9 5l7 7-7 7"
								/>
							</svg>
						</div>
					</div>
				</Link>

				<Link
					to="/account/password"
					className="w-full px-6 hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer"
				>
					<div className="flex items-center justify-center py-6 ">
						<div className="flex flex-1">
							<div className="flex items-center basis-44 mr-6 font-medium text-sm">
								Password
							</div>
							<div className="flex basis-96 items-center text-sm">********</div>
						</div>
						<div className="ml-4">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth={2}
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M9 5l7 7-7 7"
								/>
							</svg>
						</div>
					</div>
				</Link>
			</div>
		</div>
	);
}

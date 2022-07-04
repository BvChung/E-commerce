import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SearchIcon } from "@heroicons/react/solid";
import { useAuth } from "../../hooks/auth/useAuth";

const Nav = () => {
	const navigate = useNavigate();
	const { auth, setAuth } = useAuth();
	const [searchText, setSearchText] = useState<string>("");
	const [inputActive, setInputActive] = useState<boolean>(false);
	const inputActiveStyle: string = inputActive ? "bg-white" : "bg-gray-100";

	return (
		<nav className="sticky flex items-center justify-evenly h-14 border-b-[1px] border-b-gray-200">
			<div className="w-auto p-4">
				<Link to="/">
					<span className="font-semibold text-lg">ModernfyDesign</span>
				</Link>
			</div>
			<div
				className={`flex flex-grow items-center justify-center border-[1px] border-transparent
								bg-gray-200 focus-within:border-gray-600 w-64 p-[4px] rounded-full shadow-sm max-w-3xl transition-all ${inputActiveStyle}`}
				onClick={() => {
					setInputActive(true);
				}}
				onBlur={() => {
					setInputActive(false);
				}}
			>
				<SearchIcon className="w-7 h-7 text-gray-500 bg-transparent rounded-full p-1" />
				<input
					name="searchText"
					value={searchText}
					type="text"
					placeholder="Search products"
					onChange={(e) => setSearchText(e.target.value)}
					className="text-gray1 dark:text-white outline-none bg-transparent w-full px-2 placeholder:text-gray-500 dark:placeholder:text-gray-400"
				></input>
			</div>
			<div className="p-4">
				<Link to="/products">
					<span className="font-semibold  dark:text-white text-lg">Shop</span>
				</Link>
			</div>
			<div className="p-4">
				{auth?.user ? (
					<button
						onClick={() => {
							setAuth(null);
							navigate("/login");
						}}
						className="btn"
					>
						Logout{" "}
					</button>
				) : (
					<Link to="/login">
						<span className="font-semibold text-gray-700 text-lg">User</span>
					</Link>
				)}
			</div>
		</nav>
	);
};

export default Nav;

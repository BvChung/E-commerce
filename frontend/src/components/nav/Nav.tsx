import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SearchIcon } from "@heroicons/react/solid";
import { useAuthContext } from "../../hooks/context/useAuthContext";
import { useThemeContext } from "../../hooks/context/useThemeContext";
import { useCartContext } from "../../hooks/context/useCartContext";
import { storage } from "../../helper/tokenStorage";

const Nav = () => {
	//const navigate = useNavigate();
	//const { user, setUser } = useAuthContext();
	const { myCart } = useCartContext();
	const { setTheme } = useThemeContext();
	//const [searchText, setSearchText] = useState<string>("");
	//const [inputActive, setInputActive] = useState<boolean>(false);

	const numCartItems = myCart.reduce((prev, curr) => prev + curr.quantity, 0);

	//const inputActiveStyle: string = inputActive ? "bg-white" : "bg-gray-100";

	return (
		<nav className="navbar h-14 px-4 border-b-[1px]">
			<div className="navbar-start">
				<button className="btn btn-square btn-ghost">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						className="inline-block w-6 h-6 stroke-current"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M4 6h16M4 12h16M4 18h16"
						></path>
					</svg>
				</button>

				<div className="w-auto p-4">
					<Link to="/">
						<button className="btn btn-ghost normal-case font-bold text-lg ">
							ModernfyDesign
						</button>
					</Link>
				</div>
			</div>

			{/* <div className="navbar-center"></div> */}

			<div className="navbar-end gap-1">
				<button className=" btn btn-ghost btn-circle flex items-center justify-center">
					<label htmlFor="cart" className="swap swap-rotate">
						<input
							type="checkbox"
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
								e.target.checked ? setTheme(true) : setTheme(false);
							}}
							id="cart"
							name="cart"
						/>

						<svg
							className="swap-on fill-current w-7 h-7"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
						>
							<path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
						</svg>

						<svg
							className="swap-off fill-current w-7 h-7"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
						>
							<path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
						</svg>
					</label>
				</button>

				<div className="tooltip tooltip-bottom " data-tip="Search Products">
					<label htmlFor="product-search" className="btn btn-ghost btn-circle">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							/>
						</svg>
					</label>
				</div>

				<input type="checkbox" id="product-search" className="modal-toggle" />
				<label htmlFor="product-search" className="modal cursor-pointer">
					<label className="modal-box relative" htmlFor="">
						<h3 className="text-lg font-bold">
							Congratulations random Internet user!
						</h3>
						<p className="py-4">
							You've been selected for a chance to get one year of subscription
							to use Wikipedia for free!
						</p>
					</label>
				</label>

				<div className="tooltip tooltip-bottom " data-tip="Shop">
					<Link to="/products">
						<button className="btn btn-ghost btn-circle">
							<div className="indicator">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
									/>
								</svg>
							</div>
						</button>
					</Link>
				</div>

				<div className="tooltip tooltip-bottom " data-tip="My Cart">
					<Link to="/cart">
						<button className="btn btn-ghost btn-circle">
							<div className="indicator">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
									/>
								</svg>
								<span className="badge badge-sm indicator-item">
									{numCartItems}
								</span>
							</div>
						</button>
					</Link>
				</div>

				<div className="dropdown dropdown-end">
					<label tabIndex={0} className="btn btn-ghost btn-circle avatar">
						<div className="w-10 rounded-full">
							<img src="https://placeimg.com/80/80/people" alt="people" />
						</div>
					</label>
					<ul
						tabIndex={0}
						className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
					>
						<li>
							<Link to="/login">
								<span>Login/Register</span>
							</Link>
						</li>
						<li>
							<span className="justify-between">Profile</span>
						</li>
						<li>
							<span>Settings</span>
						</li>
						<li>
							<span>Logout</span>
						</li>
					</ul>
				</div>
			</div>
		</nav>
		// <nav className="navbar sticky justify-evenly h-14 px-4 border-b-[1px] ">

		// 	<div className="flex-1">
		// 		<div className="w-auto p-4">
		// 			<Link to="/">
		// 				<button className="btn btn-ghost normal-case font-bold text-lg ">
		// 					ModernfyDesign
		// 				</button>
		// 			</Link>
		// 		</div>
		// 	</div>

		// 	<div
		// 		className={`flex flex-grow items-center justify-center border-[1px] border-transparent
		// 						bg-gray-200 focus-within:border-gray-600 w-64 p-[4px] rounded-full shadow-sm max-w-3xl transition-all ${inputActiveStyle}`}
		// 		onClick={() => {
		// 			setInputActive(true);
		// 		}}
		// 		onBlur={() => {
		// 			setInputActive(false);
		// 		}}
		// 	>
		// 		<SearchIcon className="w-7 h-7 text-gray-500 bg-transparent rounded-full p-1" />
		// 		<input
		// 			name="searchText"
		// 			value={searchText}
		// 			type="text"
		// 			placeholder="Search products"
		// 			onChange={(e) => setSearchText(e.target.value)}
		// 			className="text-gray1 dark:text-white outline-none bg-transparent w-full px-2 placeholder:text-gray-500 dark:placeholder:text-gray-400"
		// 		></input>
		// 	</div>
		// 	<div className="p-4">
		// 		<Link to="/products">
		// 			<span className="font-semibold  dark:text-white text-lg">Shop</span>
		// 		</Link>
		// 	</div>

		// <div className="p-4">
		// 	{user ? (
		// 		<button
		// 			onClick={() => {
		// 				setUser(null);
		// 				storage.clearToken();
		// 				navigate("/login");
		// 			}}
		// 			className="btn"
		// 		>
		// 			Logout
		// 		</button>
		// 	) : (
		// 		<Link to="/login">
		// 			<span className="font-semibold text-gray-700 text-lg">
		// 				Login/Register
		// 			</span>
		// 		</Link>
		// 	)}
		// </div>

		//</nav>
	);
};

export default Nav;

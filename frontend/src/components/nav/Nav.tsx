import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SearchIcon } from "@heroicons/react/solid";
import { useAuthContext } from "../../hooks/context/useAuthContext";
import { useThemeContext } from "../../hooks/context/useThemeContext";
import { useCartContext } from "../../hooks/context/useCartContext";
import { useSearchProducts } from "../../hooks/products/useSearchProducts";
import { storage } from "../../helper/tokenStorage";
import { useLogoutUser } from "../../hooks/user/useLogout";

const Nav = () => {
	// const navigate = useNavigate();
	const { user } = useAuthContext();
	const { myCart } = useCartContext();
	const { setTheme } = useThemeContext();
	const { mutate } = useLogoutUser();
	const [searchText, setSearchText] = useState<string>("");
	const {
		refetch,
		data: searchedProducts,
		isFetched,
		isFetching,
		isSuccess,
	} = useSearchProducts();
	console.log(searchedProducts);
	//const [inputActive, setInputActive] = useState<boolean>(false);

	const numCartItems = myCart.reduce((prev, curr) => prev + curr.quantity, 0);

	//const inputActiveStyle: string = inputActive ? "bg-white" : "bg-gray-100";

	return (
		<nav className="navbar h-14 px-4 border-b-[1px]">
			<div className="navbar-start">
				<div className="flex-none lg:hidden">
					<label htmlFor="app-drawer" className="btn btn-square btn-ghost">
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
					</label>
				</div>

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
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="swap-on fill-current w-7 h-7"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
							/>
						</svg>

						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="swap-off w-7 h-7"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
							/>
						</svg>
					</label>
				</button>

				<div className="tooltip tooltip-bottom z-50" data-tip="Search Products">
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

				<input
					type="checkbox"
					onClick={() => {
						refetch();
					}}
					id="product-search"
					className="modal-toggle"
				/>
				<div className="modal">
					<div className="modal-box relative">
						<label
							htmlFor="product-search"
							className="btn btn-sm btn-circle absolute right-2 top-2"
						>
							✕
						</label>
						<h3 className="text-lg font-bold mb-4">Search for products</h3>
						<div className="flex justify-center w-full">
							<div className="form-control w-full">
								<label className="input-group">
									<span>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="w-5 h-5"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
											/>
										</svg>
									</span>
									<input
										type="text"
										placeholder="Search for product name"
										value={searchText}
										onChange={(e) => setSearchText(e.target.value)}
										className="input input-bordered w-full"
									/>
								</label>
							</div>
							{/* {isSuccess && searchedProducts.filter(product => product.name.toLowerCase().includes(searchText.toLowerCase()))} */}
						</div>
					</div>
				</div>

				<div className="tooltip tooltip-bottom z-50" data-tip="Shop">
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

				<div className="tooltip tooltip-bottom z-50" data-tip="My Cart">
					<Link to="/cart">
						<button className="btn btn-ghost btn-circle">
							<div className="indicator">
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
						{!user.accessToken && (
							<li>
								<Link to="/login">
									<span>Login/Register</span>
								</Link>
							</li>
						)}
						<li>
							<Link to="/account/info">
								<span className="justify-between">Manage Account</span>
							</Link>
						</li>
						<li>
							<span
								onClick={() => {
									mutate();
								}}
							>
								Logout
							</span>
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

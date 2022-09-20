import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/context/useAuthContext";
import { useThemeContext } from "../../hooks/context/useThemeContext";
import { useCartContext } from "../../hooks/context/useCartContext";
import SearchModal from "./SearchModal";
import LoginModal from "./LoginModal";
import { useLogoutUser } from "../../hooks/user/useLogout";

export default function Nav() {
	const { user } = useAuthContext();
	const { cartItemsInfo } = useCartContext();
	const { setTheme } = useThemeContext();
	const { mutate } = useLogoutUser();

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
							className="flex items-center justify-center swap-on fill-current w-6 h-6"
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
							className="flex items-center justify-center swap-off w-6 h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
							/>
						</svg>
					</label>
				</button>

				{/* <div
					onClick={() => {
						refetch();
						setOpenSearch(true);
					}}
					className="tooltip tooltip-bottom z-50"
					data-tip="Search Products"
				>
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
				</div> */}

				{/* <label htmlFor="my-modal-4" className="btn modal-button">
					open modal
				</label>
				<input type="checkbox" id="my-modal-4" className="modal-toggle" />
				<label
					htmlFor="my-modal-4"
					className="modal modal-middle cursor-pointer"
				>
					<label className="modal-box relative" htmlFor="">
						<label
							onClick={() => {
								console.log("Clicked");
							}}
							className="btn btn-sm btn-circle absolute right-2 top-2"
							htmlFor="my-modal-4"
						>
							✕
						</label>

						<h3 className="text-lg font-bold">
							Congratulations random Internet user!
						</h3>
						<p className="py-4">
							You've been selected for a chance to get one year of subscription
							to use Wikipedia for free!
						</p>
					</label>
				</label> */}

				<SearchModal />

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

				<LoginModal />

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
									{cartItemsInfo.numItems}
								</span>
							</div>
						</button>
					</Link>
				</div>

				<div className="dropdown dropdown-end">
					<label tabIndex={0} className="btn btn-ghost btn-circle avatar">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.8}
							stroke="currentColor"
							className="w-6 h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
							/>
						</svg>
					</label>
					<ul
						tabIndex={0}
						className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
					>
						{!user.accessToken && (
							<>
								<li>
									{/* <Link to="/login">
										<span>Sign in</span>
									</Link> */}
									<label htmlFor="signin-modal">
										<span>Sign in</span>
									</label>
								</li>
								<li>
									<Link to="/register">
										<span>Register</span>
									</Link>
								</li>
							</>
						)}
						<li>
							<Link to="/account/info">
								<div className="flex items-center gap-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="w-6 h-6"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
										/>
									</svg>

									<span>Manage Account</span>
								</div>
							</Link>
						</li>
						<li>
							<div
								onClick={() => {
									mutate();
								}}
								className="flex items-center gap-2"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-6 h-6"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
									/>
								</svg>
								<span>Logout</span>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}

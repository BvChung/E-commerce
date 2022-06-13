import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SearchIcon } from "@heroicons/react/solid";

const Nav: React.FC = () => {
	const [searchText, setSearchText] = useState<string>("");

	return (
		<nav className="flex items-center  bg-gray-900 dark:bg-white">
			<div>
				<Link to="/">Company</Link>
			</div>
			<div
				className="flex items-center justify-center border-[1px] border-gray-300 dark:border-gray-600 dark:bg-gray-800 
								bg-offwhite focus-within:border-sky-500 dark:focus-within:border-sky-700 w-80 p-[6px] rounded-full shadow-sm"
			>
				<SearchIcon className="w-7 h-7 text-white bg-emerald-600 dark:bg-emerald-700 rounded-full p-1" />
				<input
					name="searchText"
					value={searchText}
					type="text"
					placeholder="Search for items"
					onChange={(e) => setSearchText(e.target.value)}
					className="text-gray1 dark:text-white outline-none bg-transparent w-11/12 px-2 placeholder:text-gray-500 dark:placeholder:text-gray-400"
				></input>
			</div>
			<div>
				<Link to="/products">Catalog</Link>
			</div>
			<div>
				<Link to="/login">User</Link>
			</div>
		</nav>
	);
};

export default Nav;

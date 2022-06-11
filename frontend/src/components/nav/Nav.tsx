import React from "react";
import { Link } from "react-router-dom";
import "../../styles/nav.css";
import { SearchIcon } from "@heroicons/react/solid";

const Nav: React.FC = () => {
	return (
		<nav className="nav bg-gray-900 dark:bg-white">
			<div>
				<Link to="/">Company</Link>
			</div>
			<div className="search">
				<input placeholder="Search for product" className="search"></input>
				<SearchIcon className="h-5 w-5" />
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

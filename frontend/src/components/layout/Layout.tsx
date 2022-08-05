import { Outlet } from "react-router-dom";

export default function Layout() {
	return (
		<div className="mx-2 md:mx-24">
			<Outlet />
		</div>
	);
}

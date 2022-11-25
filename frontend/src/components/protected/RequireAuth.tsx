import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthContext } from "../../hooks/context/useAuthContext";

export default function RequireAuth() {
	const { user } = useAuthContext();
	const location = useLocation();
	// console.log(user.accessToken);

	return user.accessToken ? (
		<Outlet />
	) : (
		<Navigate to="/signin" state={{ from: location }} replace />
	);
}

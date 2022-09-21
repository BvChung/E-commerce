import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthContext } from "../../hooks/context/useAuthContext";

interface ProtectedRoutesProps {
	authRoles: Array<number>;
}

const ProtectedRoutes = ({ authRoles }: ProtectedRoutesProps) => {
	const { user } = useAuthContext();
	const location = useLocation();

	// User is logged in and authenticated role number matches prop roles then return access to child components

	return authRoles.find((role) => role === user?.role) ? (
		<Outlet />
	) : user?.accessToken ? (
		// User is logged in and authenticated role does not match then return nav to unauthorized

		<Navigate to="/unauthorized" state={{ from: location }} replace />
	) : (
		// User not logged in navigate to login page storing original location => with login => redirects to intended page

		<Navigate to="/signin" state={{ from: location }} replace />
	);
};

export default ProtectedRoutes;

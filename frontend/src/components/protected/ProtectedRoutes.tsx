import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/auth/useAuth";

interface ProtectedRoutesProps {
	authRoles: Array<number>;
}

const ProtectedRoutes = ({ authRoles }: ProtectedRoutesProps) => {
	const { auth } = useAuth();
	const location = useLocation();

	// User is logged in and authenticated role number matches prop roles then return access to child components

	return authRoles.find((role) => role === auth?.role) ? (
		<Outlet />
	) : auth ? (
		// User is logged in and authenticated role does not match then return nav to unauthorized

		<Navigate to="/unauthorized" state={{ from: location }} replace />
	) : (
		// User not logged in navigate to login page storing original location => with login => redirects to intended page

		<Navigate to="/login" state={{ from: location }} replace />
	);
};

export default ProtectedRoutes;

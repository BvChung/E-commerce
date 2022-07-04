import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/auth/useAuth";

const ProtectedRoutes = () => {
	const { auth } = useAuth();
	const location = useLocation();

	return auth?.user ? (
		<Outlet />
	) : (
		<Navigate to="/login" state={{ from: location }} replace />
	);
};

export default ProtectedRoutes;

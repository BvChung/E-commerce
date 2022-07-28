import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/auth/useAuth";
import { useGetUser } from "../../hooks/user/useGetUser";

export default function PersistLogin() {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const { user } = useAuth();
	const getUser = useGetUser();

	// Get user with cookie => if cookie expired redirect to login else return outlet
	useEffect(() => {
		const verifyUserData = async () => {
			try {
				console.log("Verifying user");
				await getUser();
			} catch (error) {
				console.error(error);
			} finally {
				setIsLoading(false);
			}
		};

		!user?.accessToken ? verifyUserData() : setIsLoading(false);
	}, []);

	return <>{isLoading ? <p>Loading</p> : <Outlet />}</>;
}

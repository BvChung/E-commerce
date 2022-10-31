import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuthContext } from "../../hooks/context/useAuthContext";
import { useGetUser } from "../../hooks/user/useGetUser";

export default function PersistLogin() {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const { user } = useAuthContext();
	const getUser = useGetUser();

	// Authenticate cookie on user device to load account information
	useEffect(() => {
		const verifyUser = async (): Promise<void> => {
			try {
				console.log("Verifying user");
				await getUser();
			} catch (error) {
				console.error(error);
			} finally {
				setIsLoading(false);
			}
		};

		!user?.accessToken ? verifyUser() : setIsLoading(false);
	}, []);

	return <>{!isLoading && <Outlet />}</>;
}

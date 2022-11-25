import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useGetUser } from "../../hooks/user/useGetUser";
import { useAuthContext } from "../../hooks/context/useAuthContext";
import Spinner from "../loading/Spinner";

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
			} finally {
				setIsLoading(false);
			}
		};

		!user?.accessToken ? verifyUser() : setIsLoading(false);
	}, []);

	return <>{!isLoading ? <Outlet /> : <Spinner />}</>;
}

// export default function PersistLogin() {
// 	const getUser = useGetUser();

// 	// Authenticate cookie on user device to load account information
// 	useEffect(() => {
// 		const verifyUser = async (): Promise<void> => {
// 			try {
// 				console.log("Verifying user");
// 				await getUser();
// 			} catch (error) {}
// 		};

// 		verifyUser();
// 	}, []);

// 	return <Outlet />;
// }

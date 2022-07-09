import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

export default function PersistLogin() {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		const verifyAccessToken = async () => {};
	}, []);
	return <div>PersistLogin</div>;
}

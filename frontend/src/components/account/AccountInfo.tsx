import React from "react";
import { useAuthContext } from "../../hooks/context/useAuthContext";

export default function AccountInfo() {
	const { user } = useAuthContext();
	return (
		<div>
			<p>
				Name: {user.firstName} {user.lastName}
			</p>
			<p>Email: {user.email}</p>
		</div>
	);
}

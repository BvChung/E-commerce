import React from "react";
import { useAuthContext } from "../../hooks/context/useAuthContext";

export default function Account() {
	const { user } = useAuthContext();
	return (
		<div>
			<h1>My Account</h1>
			<p>
				{user.firstName} {user.lastName}
			</p>
			<p>{user.email}</p>
		</div>
	);
}

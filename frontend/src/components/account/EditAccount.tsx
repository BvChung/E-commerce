import React from "react";
import { useAuthContext } from "../../hooks/context/useAuthContext";

export default function EditAccount() {
	const { user } = useAuthContext();
	return (
		<div>
			<h1>Edit Account</h1>
			<p>
				Name: {user.firstName} {user.lastName}
			</p>
			<p>Email: {user.email}</p>
		</div>
	);
}

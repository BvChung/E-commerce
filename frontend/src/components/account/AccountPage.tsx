import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AccountInfo from "./AccountInfo";
import EditAccount from "./EditAccount";
import { useAuthContext } from "../../hooks/context/useAuthContext";

export default function AccountPage() {
	const [isEditing, setIsEditing] = useState<boolean>(false);

	return (
		<div className="flex flex-col gap-10 items-center ">
			<h1>My Account</h1>
			<div className="grid grid-cols-2 gap-12 w-full">
				<div className="flex flex-col items-center gap-6 border-r-[1px]">
					<button
						onClick={() => {
							if (isEditing) setIsEditing(false);
						}}
						className="text-base font-semibold w-fit py-2 px-4 rounded-md hover:bg-gray-800"
					>
						Account Info
					</button>
					<button
						onClick={() => {
							if (!isEditing) setIsEditing(true);
						}}
						className="text-base font-semibold w-fit py-2 px-4 rounded-md hover:bg-gray-800"
					>
						Edit Account
					</button>
				</div>
				<div>{isEditing ? <EditAccount /> : <AccountInfo />}</div>
			</div>
			<Outlet />
		</div>
	);
}

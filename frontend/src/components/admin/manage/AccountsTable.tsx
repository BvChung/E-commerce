import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGetAccounts } from "../../../hooks/admin/useGetAccounts";
import AccountRow from "./AccountRow";
import { accessRoles } from "../../../helper/accessRoles";
import { CurrentInfo } from "../../../interfaces/adminInterface";
import PreviousMap from "postcss/lib/previous-map";

export default function ManageAccounts() {
	const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
	const [editingAccount, setEditingAccount] = useState<boolean>(false);
	const [accessRole, setAccessRole] = useState<string>("");
	const [currentAccount, setCurrentAccount] = useState<CurrentInfo>({
		_id: "",
		role: 0,
	});
	const { data: accounts, isSuccess } = useGetAccounts();
	console.log(currentAccount);
	// console.log(accounts);

	return (
		<div className="flex flex-col items-center justify-center mb-10 mx-4 ">
			<div className="flex items-center gap-2 w-full mt-8 mb-8 pb-2 border-b-[1px] border-gray-200 lg:max-w-5xl xl:max-w-6xl">
				<Link to={"/admin"} className="mr-2 cursor-pointer">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={2}
						stroke="currentColor"
						className="w-5 h-5"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
						/>
					</svg>
				</Link>
				<span className="font-medium text-xl sm:text-2xl">Manage</span>
			</div>

			<div className="w-full lg:max-w-5xl xl:max-w-6xl border-[1px] rounded-lg mb-10 ">
				<table className="table table-compact w-full">
					<thead>
						<tr>
							<th className="px-6 py-4">Name</th>
							<th className="px-6 py-4">Role</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{isSuccess &&
							accounts.map((account) => {
								return (
									<AccountRow
										key={account._id}
										_id={account._id}
										firstName={account.firstName}
										lastName={account.lastName}
										email={account.email}
										role={account.role}
										setCurrentAccount={setCurrentAccount}
										setEditingAccount={setEditingAccount}
										setDeleteConfirmation={setDeleteConfirmation}
									/>
								);
							})}
					</tbody>
				</table>
			</div>

			<div className={`modal ${editingAccount && "modal-open"} `}>
				<div className="modal-box relative">
					<button
						onClick={() => {
							setEditingAccount(false);
							setCurrentAccount({
								_id: "",
								role: 0,
							});
						}}
						className="btn btn-sm btn-circle absolute right-2 top-2"
					>
						✕
					</button>

					<h3 className="text-lg font-bold mb-4">Edit Role</h3>
					<div className="form-control w-full">
						<select
							name="role"
							value={currentAccount.role}
							onChange={(e) => {
								setCurrentAccount((prev) => {
									return {
										...prev,
										[e.target.name]: +e.target.value,
									};
								});
							}}
							className="select rounded-none select-md select-bordered w-full "
							required
						>
							<option disabled value="">
								{Object.keys(accessRoles).find(
									(key) => accessRoles[key] === currentAccount.role
								)}
							</option>
							<option value="6114">Admin</option>
							<option value="5325">Manager</option>
							<option value="5050">Consumer</option>
						</select>
					</div>

					<div className="modal-action justify-end gap-4">
						<button
							onClick={() => {
								setEditingAccount(false);
								setCurrentAccount({
									_id: "",
									role: 0,
								});
							}}
							className="btn px-6 rounded-full btn-outline normal-case"
						>
							Cancel
						</button>

						<button
							onClick={() => {
								setEditingAccount(false);
								// mutate(itemId);
								setCurrentAccount({
									_id: "",
									role: 0,
								});
							}}
							className="btn px-6 rounded-full btn-primary normal-case"
						>
							Save changes
						</button>
					</div>
				</div>
			</div>

			<div className={`modal ${deleteConfirmation && "modal-open"} `}>
				<div className="modal-box relative">
					<button
						onClick={() => {
							setDeleteConfirmation(false);
							setCurrentAccount({
								_id: "",
								role: 0,
							});
						}}
						className="btn btn-sm btn-circle absolute right-2 top-2"
					>
						✕
					</button>

					<h3 className="text-lg font-bold">Confirm deletion</h3>
					<p className="py-4">Are you sure you want to delete this account?</p>
					<div className="modal-action justify-end gap-4">
						<button
							onClick={() => {
								setDeleteConfirmation(false);
								setCurrentAccount({
									_id: "",
									role: 0,
								});
							}}
							className="btn px-6 rounded-full btn-outline normal-case"
						>
							Cancel
						</button>

						<button
							onClick={() => {
								setDeleteConfirmation(false);
								// mutate(itemId);
								setCurrentAccount({
									_id: "",
									role: 0,
								});
							}}
							className="btn px-6 rounded-full btn-primary normal-case"
						>
							Delete
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

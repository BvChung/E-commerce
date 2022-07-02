import React, { useState } from "react";
import {
	useQuery,
	useMutation,
	useQueryClient,
	UseQueryResult,
} from "react-query";
import { useNavigate, Link } from "react-router-dom";
import { LoginCredentials, UserInfo } from "../../interfaces/userInterface";
import { useLoginUser, useLogin } from "../../hooks/user/useLoginUser";
import { ReactQueryDevtools } from "react-query/types/devtools";
import { toast } from "react-toastify";

export default function Login() {
	const navigate = useNavigate();
	const signInMutation = useLoginUser();

	const [loginCredentials, setLoginCredentials] = useState<LoginCredentials>({
		email: "",
		password: "",
	});
	const [showPassword, setShowPassword] = useState<boolean>(false);

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;

		setLoginCredentials((prev) => {
			return {
				...prev,
				[name]: value,
			};
		});
	}

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		console.log(loginCredentials);

		signInMutation.mutate(loginCredentials);
	}

	return (
		<div className="flex flex-col items-center justify-center">
			<p>Login</p>
			<form onSubmit={handleSubmit}>
				<div className="form-control w-full max-w-xs">
					<label className="label">
						<span className="label-text-alt">Email</span>
					</label>
					<input
						type="text"
						name="email"
						value={loginCredentials.email}
						className="input input-bordered rounded-md w-full max-w-xs"
						onChange={handleChange}
						required={true}
					/>
					<label className="label">
						<span className="label-text-alt">Password</span>
					</label>
					<input
						type={showPassword ? "text" : "password"}
						name="password"
						value={loginCredentials.password}
						className="input input-bordered w-full max-w-xs"
						onChange={handleChange}
						required={true}
					/>
					<label className="label cursor-pointer">
						<span className="label-text">Show password</span>
						<input
							type="checkbox"
							className="checkbox "
							onChange={() => {
								setShowPassword((prev) => !prev);
							}}
						/>
					</label>
				</div>

				<button className="btn">Login</button>
			</form>
			<div className="flex justify-center items-center gap-2 ">
				<span className="">New to GroupCord?</span>
				<span className="font-semibold ">
					<Link to="/register">Register</Link>
				</span>
			</div>
		</div>
	);
}

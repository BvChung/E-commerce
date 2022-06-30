import React, { useState } from "react";
import {
	useQuery,
	useMutation,
	useQueryClient,
	UseQueryResult,
} from "react-query";
import { useNavigate, Link } from "react-router-dom";
import { LoginCredentials, UserInfo } from "../../interfaces/user";
import { loginUser } from "../../api/userApi";

export default function Login() {
	const navigate = useNavigate();
	const [loginCredentials, setLoginCredentials] = useState<LoginCredentials>({
		email: "",
		password: "",
	});
	const [showPassword, setShowPassword] = useState<boolean>(false);

	function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;

		setLoginCredentials((prev) => {
			return {
				...prev,
				[name]: value,
			};
		});
	}

	const { status, error, data }: UseQueryResult<UserInfo, Error> = useQuery<
		UserInfo,
		Error
	>("user", loginUser(loginCredentials));

	function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();

		console.log(loginCredentials);
		//loginUser(loginCredentials)
	}

	return (
		<div className="flex flex-col items-center justify-center">
			<p>Login</p>
			<div>
				<div className="form-control w-full max-w-xs">
					<label className="label">
						<span className="label-text-alt">Email</span>
					</label>
					<input
						type="text"
						name="email"
						value={loginCredentials.email}
						className="input input-bordered rounded-md w-full max-w-xs"
						onChange={handleInput}
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
						onChange={handleInput}
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

				<button className="btn" onClick={handleSubmit}>
					Login
				</button>
			</div>
			<div className="flex justify-center items-center gap-2 ">
				<span className="">New to GroupCord?</span>
				<span className="font-semibold ">
					<Link to="/register">Register</Link>
				</span>
			</div>
		</div>
	);
}

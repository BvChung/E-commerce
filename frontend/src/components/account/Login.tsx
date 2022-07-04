import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { LoginCredentials, UserInfo } from "../../interfaces/userInterface";
import { useLoginUser } from "../../hooks/user/useLoginUser";
import { useAuth } from "../../hooks/auth/useAuth";
import { toast } from "react-toastify";

interface CustomState {
	pathname: string | null;
	search: string | null;
	hash: string | null;
	state: {
		from: {
			hash: string;
			key: string;
			pathname: string;
			search: string;
			state: null | object;
		};
	};
	key: string | null;
}

// 1@gmail.com
// 123456

export default function Login() {
	const { setAuth } = useAuth();

	const navigate = useNavigate();
	const location = useLocation() as CustomState;
	const from = location.state?.from?.pathname || "/";

	const { data, isSuccess, mutate } = useLoginUser();

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

		mutate(loginCredentials);

		setLoginCredentials({
			email: "",
			password: "",
		});
	}

	useEffect(() => {
		if (isSuccess) {
			setAuth({ user: data });
			navigate(from, { replace: true });
		}
	}, [isSuccess, navigate, data, setAuth]);

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
				<button
					onClick={() => {
						setLoginCredentials({
							email: process.env.REACT_APP_GUEST_EMAIL!,
							password: process.env.REACT_APP_GUEST_PASSWORD!,
						});
					}}
					className="btn"
				>
					Login as guest
				</button>
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

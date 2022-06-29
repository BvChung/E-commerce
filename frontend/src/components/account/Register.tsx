import React, { useState } from "react";
import { Link } from "react-router-dom";

interface Credentials {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

export default function Register() {
	const [loginCredentials, setLoginCredentials] = useState<Credentials>({
		firstName: "",
		lastName: "",
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
	console.log(loginCredentials);

	return (
		<div className="flex flex-col items-center justify-center">
			<p>Register</p>
			<div>
				<div className="form-control w-full max-w-xs">
					<div className="flex">
						<label className="label">
							<span className="label-text-alt">First name</span>
						</label>
						<input
							type="text"
							name="firstName"
							value={loginCredentials.firstName}
							placeholder="Type here"
							className="input input-bordered rounded-md w-full max-w-xs"
							onChange={handleInput}
							required={true}
						/>
						<label className="label">
							<span className="label-text-alt">Last name</span>
						</label>
						<input
							type="text"
							name="lastName"
							value={loginCredentials.lastName}
							placeholder="Type here"
							className="input input-bordered w-full max-w-xs"
							onChange={handleInput}
							required={true}
						/>
					</div>
					<label className="label">
						<span className="label-text-alt">Email</span>
					</label>
					<input
						type="text"
						name="email"
						value={loginCredentials.email}
						placeholder="Type here"
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
						placeholder="Type here"
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

				<button className="btn">Register</button>
			</div>
			<div className="flex justify-center items-center gap-2 px-8">
				<span className="dark:text-slate-300">New to GroupCord?</span>
				<span className="font-semibold text-sky-600 hover:text-sky-500">
					<Link to="/login">Login</Link>
				</span>
			</div>
		</div>
	);
}

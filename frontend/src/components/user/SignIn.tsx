import React, { useState, useId, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { LoginCredentials } from "../../interfaces/authInterface";
import { useSignInUser } from "../../hooks/user/useSignInUser";
import { CustomLocationState } from "../../interfaces/customInterface";
import { FormInputProps } from "../../interfaces/formInterface";
import FormInput from "../form/FormInput";

export default function SignIn() {
	const navigate = useNavigate();
	const location = useLocation() as CustomLocationState;
	const from = location.state?.from?.pathname || "/";
	const { isSuccess, isLoading, mutate } = useSignInUser();

	const [loginCredentials, setLoginCredentials] = useState<LoginCredentials>({
		email: "",
		password: "",
	});
	const [showPassword, setShowPassword] = useState<boolean>(false);

	function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
		const { name, value } = e.target;

		setLoginCredentials((prev) => {
			return {
				...prev,
				[name]: value,
			};
		});
	}

	function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
		e.preventDefault();

		mutate(loginCredentials);

		setLoginCredentials({
			email: "",
			password: "",
		});
	}

	useEffect(() => {
		if (isSuccess) {
			navigate(from, { replace: true });
		}
	}, [isSuccess, navigate, from]);

	const loginInput: FormInputProps[] = [
		{
			key: useId(),
			errorMessage: "Please enter a valid email.",
			id: "email",
			label: "Email",
			required: true,
			name: "email",
			onChange: handleChange,
			type: "email",
			value: loginCredentials.email,
			pattern: "^[a-zA-Z0-9]+@[a-zA-Z]+(?:.[a-zA-Z]+)*$",
			maxLength: 50,
			htmlInputSize: "md",
		},
		{
			key: useId(),
			errorMessage: "Please enter a valid password.",
			id: "password",
			label: "Password",
			required: true,
			name: "password",
			onChange: handleChange,
			type: showPassword ? "text" : "password",
			value: loginCredentials.password,
			pattern: "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9d=!-@._*]{8,25}$",
			maxLength: 25,
			htmlInputSize: "md",
		},
	];

	return (
		<div className="flex items-center justify-center my-4 md:my-32">
			<form
				className="flex flex-col justify-center items-center w-full px-4 md:p-6 md:w-[30rem] md:border-[1px] md:rounded-lg md:shadow-sm"
				onSubmit={handleSubmit}
			>
				<p className=" font-semibold text-lg md:text-xl mt-2 mb-4">
					Sign in to ModernfyDesign
				</p>

				<div className="flex flex-col items-center w-full mb-4">
					{loginInput.map((input) => {
						return (
							<FormInput
								key={input.key}
								errorMessage={input.errorMessage}
								id={input.id}
								label={input.label}
								name={input.name}
								onChange={input.onChange}
								required={input.required}
								type={input.type}
								value={input.value}
								pattern={input.pattern}
								inputMode={input.inputMode}
								maxLength={input.maxLength}
								htmlInputSize={input.htmlInputSize}
							/>
						);
					})}

					<div className="flex w-full justify-start item-start mt-1">
						<label className="label cursor-pointer">
							<span className="label-text mr-2">Show password</span>
							<input
								type="checkbox"
								className="checkbox"
								onChange={() => {
									setShowPassword((prev) => !prev);
								}}
							/>
						</label>
					</div>
				</div>

				<div className="flex flex-col w-full justify-center items-start mb-6">
					<button className="btn w-full mb-4">Sign in</button>
					<button
						onClick={() => {
							setLoginCredentials({
								email: process.env.REACT_APP_GUEST_EMAIL!,
								password: process.env.REACT_APP_GUEST_PASSWORD!,
							});
						}}
						className="btn px-8 btn-primary w-full"
					>
						Sign in as guest
					</button>
				</div>

				<div className="flex justify-center items-center gap-2 ">
					<span>New to ModernfyDesign?</span>
					<span className="font-semibold link">
						<Link to="/register">Register</Link>
					</span>
				</div>
			</form>
		</div>
	);
}

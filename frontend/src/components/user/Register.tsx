import React, { useState, useId, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { RegisterCredentials } from "../../interfaces/authInterface";
import { useRegisterUser } from "../../hooks/user/useRegisterUser";
import { FormInputProps } from "../../interfaces/formInterface";
import { CustomLocationState } from "../../interfaces/customInterface";
import FormInput from "../form/FormInput";
import { toast } from "react-toastify";

export default function Register() {
	const navigate = useNavigate();
	const location = useLocation() as CustomLocationState;
	const from = location.state?.from?.pathname || "/";
	const { isSuccess, mutate } = useRegisterUser();

	const [registerCredentials, setRegisterCredentials] =
		useState<RegisterCredentials>({
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			verifyPassword: "",
		});

	const [showPassword, setShowPassword] = useState<boolean>(false);

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;

		setRegisterCredentials((prev) => {
			return {
				...prev,
				[name]: value,
			};
		});
	}

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (registerCredentials.password !== registerCredentials.verifyPassword) {
			return toast.error("Passwords do not match");
		}

		mutate(registerCredentials);

		setRegisterCredentials({
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			verifyPassword: "",
		});
	}

	useEffect(() => {
		if (isSuccess) {
			navigate(from, { replace: true });
		}
	}, [isSuccess, navigate, from]);

	const registerInput: FormInputProps[] = [
		{
			key: useId(),
			errorMessage: "Please enter a valid first name.",
			id: "firstName",
			label: "First name*",
			required: true,
			pattern: "^[a-zA-Z0-9]{1,25}$",
			name: "firstName",
			onChange: handleChange,
			type: "text",
			value: registerCredentials.firstName,
			maxLength: 25,
			htmlInputSize: "md",
		},
		{
			key: useId(),
			errorMessage: "Please enter a valid last name.",
			id: "lastName",
			label: "Last name*",
			required: true,
			pattern: "^[a-zA-Z]{1,25}$",
			name: "lastName",
			onChange: handleChange,
			type: "text",
			value: registerCredentials.lastName,
			maxLength: 25,
			htmlInputSize: "md",
		},
		{
			key: useId(),
			errorMessage: "Please enter a valid email.",
			id: "email",
			label: "Email",
			required: true,
			name: "email",
			onChange: handleChange,
			type: "text",
			value: registerCredentials.email,
			pattern: "^[a-zA-Z0-9]+@[a-zA-Z]+(?:.[a-zA-Z]+)*$",
			maxLength: 50,
			htmlInputSize: "md",
		},
		{
			key: useId(),
			errorMessage:
				"Must be at least eight characters, include one uppercase letter, one lowercase letter, and one number",
			id: "password",
			label: "Password",
			required: true,
			name: "password",
			onChange: handleChange,
			type: showPassword ? "text" : "password",
			value: registerCredentials.password,
			pattern: "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9d=!-@._*]{8,25}$",
			// prettier-ignore
			// pattern: "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9\d=!\-@._*]{8,25}$",
			maxLength: 25,
			htmlInputSize: "md",
		},
		{
			key: useId(),
			errorMessage:
				"Must be at least eight characters, include one uppercase letter, one lowercase letter, and one number",
			id: "verifyPassword",
			label: "Verify password",
			required: true,
			name: "verifyPassword",
			onChange: handleChange,
			type: showPassword ? "text" : "password",
			value: registerCredentials.verifyPassword,
			pattern: "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9d=!-@._*]{8,25}$",
			// prettier-ignore
			// pattern: "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9\d=!\-@._*]{8,25}$",
			maxLength: 25,
			htmlInputSize: "md",
		},
	];

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col items-center justify-center"
		>
			<p>Register</p>
			<div>
				{registerInput.map((input) => {
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

				<button className="btn">Register</button>
			</div>
			<div className="flex justify-center items-center gap-2 px-8">
				<span className="dark:text-slate-300">Already have an account?</span>
				<span className="font-semibold text-sky-600 hover:text-sky-500">
					<Link to="/login">Sign-In</Link>
				</span>
			</div>
		</form>
	);
}

import React, { useState, useId } from "react";
import { useAuthContext } from "../../hooks/context/useAuthContext";
import FormInput from "../form/FormInput";
import { FormInputProps } from "../../interfaces/formInterface";
import { EditPasswordCredentials } from "../../interfaces/authInterface";
import { useEditPassword } from "../../hooks/account/useEditPassword";
import { useNavigate } from "react-router-dom";

export default function EditPassword() {
	const { mutate } = useEditPassword();
	const navigate = useNavigate();

	const [passwordCredentials, setPasswordCredentials] =
		useState<EditPasswordCredentials>({
			currentPassword: "",
			newPassword: "",
			verifyNewPassword: "",
		});

	const [showPassword, setShowPassword] = useState<boolean>(false);

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;

		setPasswordCredentials((prev) => {
			return {
				...prev,
				[name]: value,
			};
		});
	}

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		mutate(passwordCredentials);

		setPasswordCredentials({
			currentPassword: "",
			newPassword: "",
			verifyNewPassword: "",
		});
	}

	const passwordInput: FormInputProps[] = [
		{
			key: useId(),
			errorMessage:
				"Must be at least eight characters, include one uppercase letter, one lowercase letter, and one number",
			id: "currentPassword",
			label: "Current password",
			required: true,
			name: "currentPassword",
			onChange: handleChange,
			type: showPassword ? "text" : "password",
			value: passwordCredentials.currentPassword,
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
			id: "newPassword",
			label: "New password",
			required: true,
			name: "newPassword",
			onChange: handleChange,
			type: showPassword ? "text" : "password",
			value: passwordCredentials.newPassword,
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
			id: "verifyNewPassword",
			label: "Verify new password",
			required: true,
			name: "verifyNewPassword",
			onChange: handleChange,
			type: showPassword ? "text" : "password",
			value: passwordCredentials.verifyNewPassword,
			pattern: "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9d=!-@._*]{8,25}$",
			// prettier-ignore
			// pattern: "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9\d=!\-@._*]{8,25}$",
			maxLength: 25,
			htmlInputSize: "md",
		},
	];

	return (
		<div>
			<h1>Password</h1>
			<form onSubmit={handleSubmit}>
				{passwordInput.map((input) => {
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

				<div className="flex gap-4">
					<button
						onClick={(e) => {
							e.preventDefault();

							setPasswordCredentials({
								currentPassword: "",
								newPassword: "",
								verifyNewPassword: "",
							});
							navigate("/account/info");
						}}
						className="btn btn-primary"
					>
						Cancel
					</button>
					<button className="btn btn-primary">Save</button>
				</div>
			</form>
		</div>
	);
}

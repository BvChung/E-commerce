import React, { useState, useId, useEffect } from "react";
import { useAuthContext } from "../../hooks/context/useAuthContext";
import FormInput from "../form/FormInput";
import { FormInputProps } from "../../interfaces/formInterface";
import { EditEmailCredentials } from "../../interfaces/authInterface";
import { useEditEmail } from "../../hooks/account/useEditEmail";
import { useNavigate } from "react-router-dom";

export default function EditEmail() {
	const { user } = useAuthContext();
	const { mutate, isSuccess } = useEditEmail();
	const navigate = useNavigate();
	const [emailCredentials, setEmailCredentials] =
		useState<EditEmailCredentials>({
			email: user.email,
		});

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;

		setEmailCredentials((prev) => {
			return {
				...prev,
				[name]: value,
			};
		});
	}

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		mutate(emailCredentials);
	}

	useEffect(() => {
		setEmailCredentials({
			email: user.email,
		});
	}, [isSuccess]);

	const emailInput: FormInputProps[] = [
		{
			key: useId(),
			errorMessage: "Please enter a valid email.",
			id: "email",
			label: "Email",
			required: true,
			name: "email",
			onChange: handleChange,
			type: "text",
			value: emailCredentials.email,
			pattern: "^[a-zA-Z0-9]+@[a-zA-Z]+(?:.[a-zA-Z]+)*$",
			maxLength: 50,
			htmlInputSize: "md",
		},
	];

	return (
		<form onSubmit={handleSubmit}>
			<div>Edit Email</div>
			{emailInput.map((input) => {
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
			<div className="flex gap-4">
				<button
					onClick={(e) => {
						e.preventDefault();

						setEmailCredentials({
							email: user.email,
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
	);
}

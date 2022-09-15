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
		<div className="flex flex-col items-center justify-center mx-2">
			<div className="flex w-full items-center justify-center px-1 mt-8 mb-6">
				<div
					onClick={(e) => {
						e.preventDefault();

						setEmailCredentials({
							email: user.email,
						});
						navigate("/account/info");
					}}
					className="flex items-center w-full md:w-[30rem]"
				>
					<div className="mr-4 cursor-pointer">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-5 h-5 md:w-6 md:h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
							/>
						</svg>
					</div>

					<p className="font-medium text-lg md:text-xl">Update Email</p>
				</div>
			</div>

			<form
				onSubmit={handleSubmit}
				className="flex flex-col items-center w-full md:w-[30rem] border-[1px] rounded-lg shadow-sm"
			>
				<div className="p-7 w-full">
					<div className="flex flex-col items-center w-full mb-10">
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
					</div>
					<div className="flex items-center justify-end gap-4">
						<button
							onClick={(e) => {
								e.preventDefault();

								setEmailCredentials({
									email: user.email,
								});
								navigate("/account/info");
							}}
							className="btn btn-accent btn-outline rounded-lg h-11"
						>
							Cancel
						</button>
						<button className="btn btn-primary rounded-lg h-11">Save</button>
					</div>
				</div>
			</form>
		</div>
	);
}

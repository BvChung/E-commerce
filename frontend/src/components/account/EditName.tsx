import React, { useState, useId, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/context/useAuthContext";
import FormInput from "../form/FormInput";
import { FormInputProps } from "../../interfaces/formInterface";
import { EditNameCredentials } from "../../interfaces/authInterface";
import { useEditName } from "../../hooks/account/useEditName";

export default function EditName() {
	const { user } = useAuthContext();
	const { mutate, isSuccess } = useEditName();
	const navigate = useNavigate();
	const [nameCredentials, setNameCredentials] = useState<EditNameCredentials>({
		firstName: user.firstName,
		lastName: user.lastName,
	});

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;

		setNameCredentials((prev) => {
			return {
				...prev,
				[name]: value,
			};
		});
	}

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		mutate(nameCredentials);
	}

	useEffect(() => {
		setNameCredentials({
			firstName: user.firstName,
			lastName: user.lastName,
		});
	}, [isSuccess]);

	const nameInput: FormInputProps[] = [
		{
			key: useId(),
			errorMessage: "Please enter a valid first name.",
			id: "firstName",
			label: "First name",
			required: true,
			pattern: "^[a-zA-Z0-9]{1,25}$",
			name: "firstName",
			onChange: handleChange,
			type: "text",
			value: nameCredentials.firstName,
			maxLength: 25,
			htmlInputSize: "md",
		},
		{
			key: useId(),
			errorMessage: "Please enter a valid last name.",
			id: "lastName",
			label: "Last name",
			required: true,
			pattern: "^[a-zA-Z]{1,25}$",
			name: "lastName",
			onChange: handleChange,
			type: "text",
			value: nameCredentials.lastName,
			maxLength: 25,
			htmlInputSize: "md",
		},
	];

	return (
		<div className="flex flex-col items-center justify-center">
			<div className="flex items-center justify-center mt-10 mb-6 ">
				<div
					onClick={(e) => {
						e.preventDefault();

						setNameCredentials({
							firstName: user.firstName,
							lastName: user.lastName,
						});
						navigate("/account/info");
					}}
					className="flex items-center w-[30rem]"
				>
					<div className="mr-4 cursor-pointer">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-6 h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
							/>
						</svg>
					</div>

					<p className="font-medium text-xl">Update Name</p>
				</div>
			</div>

			<form
				onSubmit={handleSubmit}
				className="flex flex-col items-center w-[30rem] border-[1px] rounded-lg shadow-sm"
			>
				<div className="my-7">
					<div className="flex flex-col items-center mb-10">
						{nameInput.map((input) => {
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

								setNameCredentials({
									firstName: user.firstName,
									lastName: user.lastName,
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

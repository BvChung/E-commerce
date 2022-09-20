import React, { useState, useId, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { RegisterCredentials } from "../../interfaces/authInterface";
import { useRegisterUser } from "../../hooks/user/useRegisterUser";
import { FormInputProps } from "../../interfaces/formInterface";
import { CustomLocationState } from "../../interfaces/customInterface";
import FormInput from "../form/FormInput";
import { toast } from "react-toastify";

export default function RegisterModal() {
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

	const [openModal, setOpenModal] = useState<boolean>(false);

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
		setOpenModal(false);
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
		<>
			<div className="tooltip tooltip-bottom z-50" data-tip="Search Products">
				<label
					htmlFor="signin-modal"
					className="btn modal-button btn-ghost btn-circle"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.8}
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
						/>
					</svg>
				</label>
			</div>

			<input
				type="checkbox"
				onChange={(e) => {
					if (e.target.checked) {
						setOpenModal(true);
					}
					if (!e.target.checked) {
						setOpenModal(false);
					}
				}}
				checked={openModal}
				id="signin-modal"
				className="modal-toggle"
			/>

			<label
				htmlFor="signin-modal"
				className="modal modal-bottom md:modal-middle cursor-pointer"
			>
				<label className="modal-box relative" htmlFor="">
					<label
						className="btn btn-sm btn-circle absolute right-2 top-2"
						htmlFor="signin-modal"
					>
						✕
					</label>

					<h3 className="text-lg font-bold mb-4">Sign in to ModernfyDesign</h3>

					<div className="flex flex-col items-center justify-center">
						<form
							className="flex flex-col items-center w-full "
							onSubmit={handleSubmit}
						>
							<div className="flex flex-col w-full mb-4">
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

								<div className="flex item-end mt-1">
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

							<div className="flex flex-col w-full justify-center items-start mb-4">
								<button className="btn px-8 mb-4">Register</button>
							</div>
						</form>

						<div className="flex justify-center items-center gap-2 ">
							<span className="">New to ModernfyDesign?</span>
							<span className="font-semibold ">
								<Link to="/register">Register</Link>
							</span>
						</div>
					</div>
				</label>
			</label>
		</>
	);
}

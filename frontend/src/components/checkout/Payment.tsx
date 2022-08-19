import React, { useId } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useOrderContext } from "../../hooks/context/useOrderContext";
import { useCartContext } from "../../hooks/context/useCartContext";
import { FormInputProps } from "../../interfaces/formInterface";
import FormInput from "../form/FormInput";

export default function Payment() {
	const { myOrder, handlePayment } = useOrderContext();
	const navigate = useNavigate();

	const paymentInput1: FormInputProps[] = [
		{
			key: useId(),
			errorMessage: "Please enter a valid card number.",
			id: "cardNumber",
			label: "Card number*",
			required: true,
			pattern: "^[0-9]{15,19}$",
			name: "cardNumber",
			onChange: handlePayment,
			type: "text",
			value: myOrder.paymentInfo.cardNumber,
			inputMode: "numeric",
			maxLength: 19,
			htmlInputSize: "sm",
		},
		{
			key: useId(),
			errorMessage: "Please enter a valid first name.",
			id: "cardHolderFirstName",
			label: "First name*",
			required: true,
			pattern: "^[a-zA-Z]{1,25}$",
			name: "cardHolderFirstName",
			onChange: handlePayment,
			type: "text",
			value: myOrder.paymentInfo.cardHolderFirstName,
			maxLength: 25,
			htmlInputSize: "sm",
		},
		{
			key: useId(),
			errorMessage: "Please enter a valid last name.",
			id: "cardHolderLastName",
			label: "Last name*",
			required: true,
			pattern: "^[a-zA-Z]{1,25}$",
			name: "cardHolderLastName",
			onChange: handlePayment,
			type: "text",
			value: myOrder.paymentInfo.cardHolderLastName,
			maxLength: 25,
			htmlInputSize: "sm",
		},
	];

	const paymentInput2: FormInputProps[] = [
		{
			key: useId(),
			errorMessage: "Please enter a valid CVV.",
			id: "securityCode",
			label: "CVV*",
			required: true,
			pattern: "^[0-9]{3,4}$",
			name: "securityCode",
			onChange: handlePayment,
			type: "text",
			value: myOrder.paymentInfo.securityCode,
			inputMode: "numeric",
			maxLength: 4,
			htmlInputSize: "sm",
		},
		{
			key: useId(),
			errorMessage: "Please enter a valid phone number.",
			id: "phone",
			label: "Phone*",
			required: true,
			name: "phone",
			pattern: "^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$",
			onChange: handlePayment,
			type: "text",
			value: myOrder.paymentInfo.phone,
			inputMode: "tel",
			maxLength: 14,
			htmlInputSize: "sm",
		},
	];

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				navigate("/checkout/confirmation");
			}}
		>
			<div className="flex flex-col items-center">
				<h1>Payment method</h1>
				<ul className="steps">
					<li className="step step-primary uppercase text-sm">Sign in</li>
					<li className="step step-primary uppercase text-sm">Shipping</li>
					<li className="step step-primary uppercase text-sm">Payment</li>
					<li className="step uppercase text-xs">Place order</li>
				</ul>
				<div className="flex flex-col">
					<label className="label">
						<span className="label-text">Card Information</span>
					</label>

					{paymentInput1.map((input) => {
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

					<div className="form-control w-full max-w-sm">
						<label className="label">
							<span className="label-text">Expiration date</span>
						</label>
						<div className="grid grid-cols-2 gap-4">
							<select
								name="expiryDateMonth"
								value={myOrder.paymentInfo.expiryDateMonth}
								onChange={handlePayment}
								className="select select-sm select-bordered"
								required
							>
								<option disabled value="">
									Month
								</option>
								<option value="01">01</option>
								<option value="02">02</option>
								<option value="03">03</option>
								<option value="04">04</option>
								<option value="05">05</option>
								<option value="06">06</option>
								<option value="07">07</option>
								<option value="08">08</option>
								<option value="09">09</option>
								<option value="10">10</option>
								<option value="11">11</option>
								<option value="12">12</option>
							</select>

							<select
								name="expiryDateYear"
								value={myOrder.paymentInfo.expiryDateYear}
								onChange={handlePayment}
								className="select select-sm select-bordered"
								required
							>
								<option disabled value="">
									Year
								</option>
								<option value="22">22</option>
								<option value="23">23</option>
								<option value="24">24</option>
								<option value="25">25</option>
								<option value="26">26</option>
							</select>
						</div>
					</div>

					{paymentInput2.map((input) => {
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
				<div>
					<button className="btn btn-primary">Continue</button>
					<Link to="/checkout/shipping" className="btn btn-primary">
						Return
					</Link>
				</div>
			</div>
			<div></div>
		</form>
	);
}

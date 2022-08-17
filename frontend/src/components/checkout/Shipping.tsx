import { useEffect, useId } from "react";
import { useNavigate } from "react-router-dom";
import { useOrderContext } from "../../hooks/context/useOrderContext";
import { useCartContext } from "../../hooks/context/useCartContext";
import { useAuthContext } from "../../hooks/context/useAuthContext";
import FormInput from "../form/FormInput";
import { FormInputProps } from "../../interfaces/formInterface";

export default function Shipping() {
	const { myOrder, handleShipping, setMyOrder } = useOrderContext();
	const { cartItemsInfo } = useCartContext();
	const { user } = useAuthContext();
	const navigate = useNavigate();
	console.log(user);

	useEffect(() => {
		console.log("render");
		setMyOrder((prev) => {
			return {
				...prev,
				shippingInfo: {
					...prev.shippingInfo,
					firstName: user.firstName,
					lastName: user.lastName,
					email: user.email,
				},
			};
		});
	}, []);

	const shippingInput1: FormInputProps[] = [
		{
			key: useId(),
			errorMessage: "Please enter a valid first name.",
			id: "firstName",
			label: "First name*",
			required: true,
			pattern: "^[a-zA-Z0-9]{1,25}$",
			name: "firstName",
			onChange: handleShipping,
			type: "text",
			value: myOrder.shippingInfo.firstName,
			maxLength: 25,
			htmlInputSize: "sm",
		},
		{
			key: useId(),
			errorMessage: "Please enter a valid last name.",
			id: "lastName",
			label: "Last Name*",
			required: true,
			pattern: "^[a-zA-Z]{1,25}$",
			name: "lastName",
			onChange: handleShipping,
			type: "text",
			value: myOrder.shippingInfo.lastName,
			maxLength: 25,
			htmlInputSize: "sm",
		},
		{
			key: useId(),
			errorMessage: "Please enter a valid address.",
			id: "address",
			label: "Address*",
			required: true,
			name: "address",
			pattern: "^[a-zA-Z0-9_ ]{1,50}$",
			onChange: handleShipping,
			type: "text",
			value: myOrder.shippingInfo.address,
			maxLength: 50,
			htmlInputSize: "sm",
		},
		{
			key: useId(),
			errorMessage: "Please enter a valid apt, suite, etc.",
			id: "aptSuiteEtc",
			label: "Apt, suite, etc. (optional)",
			required: false,
			name: "aptSuiteEtc",
			pattern: "^[a-zA-Z0-9_ ]{1,50}$",
			onChange: handleShipping,
			type: "text",
			value: myOrder.shippingInfo.aptSuiteEtc,
			maxLength: 50,
			htmlInputSize: "sm",
		},
	];
	const shippingInput2: FormInputProps[] = [
		{
			key: useId(),
			errorMessage: "Please enter a valid city.",
			id: "city",
			label: "City*",
			required: true,
			name: "city",
			pattern: "^[a-zA-Z]{1,30}$",
			onChange: handleShipping,
			type: "text",
			value: myOrder.shippingInfo.city,
			maxLength: 30,
			htmlInputSize: "sm",
		},
		{
			key: useId(),
			errorMessage: "Please enter a valid zip code.",
			id: "zipCode",
			label: "Zip code*",
			required: true,
			pattern: "^[0-9]{5}(?:-[0-9]{4})?$",
			name: "zipCode",
			onChange: handleShipping,
			type: "text",
			value: myOrder.shippingInfo.zipCode,
			maxLength: 5,
			inputMode: "numeric",
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
			onChange: handleShipping,
			type: "text",
			value: myOrder.shippingInfo.phone,
			inputMode: "tel",
			maxLength: 14,
			htmlInputSize: "sm",
		},
		{
			key: useId(),
			errorMessage: "Please enter a valid email.",
			id: "email",
			label: "Email*",
			required: true,
			name: "email",
			onChange: handleShipping,
			type: "email",
			value: myOrder.shippingInfo.email,
			maxLength: 50,
			htmlInputSize: "sm",
		},
	];

	return (
		<form
			className="flex"
			onSubmit={(e) => {
				e.preventDefault();
				navigate("/checkout/payment");
			}}
		>
			<div className="flex flex-col items-center justify-center">
				<h1>Shipping</h1>
				<ul className="steps">
					<li className="step step-primary uppercase text-sm">Sign in</li>
					<li className="step step-primary uppercase text-sm">Payment</li>
					<li className="step uppercase text-sm">Shipping</li>
					<li className="step uppercase text-sm">Place order</li>
				</ul>
				<div className="grid grid-cols-2 gap-x-12 gap-y-2">
					{shippingInput1.map((input) => {
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
							<span className="label-text">State*</span>
						</label>
						<select
							name="state"
							value={myOrder.shippingInfo.state}
							onChange={handleShipping}
							className="select select-sm select-bordered"
							required
						>
							<option disabled value="">
								Select a State
							</option>
							<option value="AL">Alabama</option>
							<option value="AK">Alaska</option>
							<option value="AZ">Arizona</option>
							<option value="AR">Arkansas</option>
							<option value="CA">California</option>
							<option value="CO">Colorado</option>
							<option value="CT">Connecticut</option>
							<option value="DE">Delaware</option>
							<option value="DC">District Of Columbia</option>
							<option value="FL">Florida</option>
							<option value="GA">Georgia</option>
							<option value="HI">Hawaii</option>
							<option value="ID">Idaho</option>
							<option value="IL">Illinois</option>
							<option value="IN">Indiana</option>
							<option value="IA">Iowa</option>
							<option value="KS">Kansas</option>
							<option value="KY">Kentucky</option>
							<option value="LA">Louisiana</option>
							<option value="ME">Maine</option>
							<option value="MD">Maryland</option>
							<option value="MA">Massachusetts</option>
							<option value="MI">Michigan</option>
							<option value="MN">Minnesota</option>
							<option value="MS">Mississippi</option>
							<option value="MO">Missouri</option>
							<option value="MT">Montana</option>
							<option value="NE">Nebraska</option>
							<option value="NV">Nevada</option>
							<option value="NH">New Hampshire</option>
							<option value="NJ">New Jersey</option>
							<option value="NM">New Mexico</option>
							<option value="NY">New York</option>
							<option value="NC">North Carolina</option>
							<option value="ND">North Dakota</option>
							<option value="OH">Ohio</option>
							<option value="OK">Oklahoma</option>
							<option value="OR">Oregon</option>
							<option value="PA">Pennsylvania</option>
							<option value="RI">Rhode Island</option>
							<option value="SC">South Carolina</option>
							<option value="SD">South Dakota</option>
							<option value="TN">Tennessee</option>
							<option value="TX">Texas</option>
							<option value="UT">Utah</option>
							<option value="VT">Vermont</option>
							<option value="VA">Virginia</option>
							<option value="WA">Washington</option>
							<option value="WV">West Virginia</option>
							<option value="WI">Wisconsin</option>
							<option value="WY">Wyoming</option>
						</select>
					</div>

					{shippingInput2.map((input) => {
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
				<div className="flex gap-4">
					<button className="btn btn-primary">Continue</button>
					{/* <Link to="/checkout/payselect" className="btn btn-primary">
						Continue
					</Link> */}
				</div>
			</div>
			<div className="flex flex-col">
				<p>Subtotal {cartItemsInfo.subTotal}</p>
				<p>Number items {cartItemsInfo.numItems}</p>
			</div>
		</form>
	);
}

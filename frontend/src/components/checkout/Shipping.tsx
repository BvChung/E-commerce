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

	useEffect(() => {
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
			htmlInputSize: "input-md",
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
			htmlInputSize: "input-md",
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
			htmlInputSize: "input-md",
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
			htmlInputSize: "input-md",
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
			htmlInputSize: "input-md",
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
			htmlInputSize: "input-md",
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
			htmlInputSize: "input-md",
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
			htmlInputSize: "input-md",
		},
	];

	return (
		<div className="flex flex-col items-center justify-center mb-10">
			<div className="flex flex-col gap-2 w-full mt-8 mb-4 lg:max-w-5xl xl:max-w-6xl">
				<span className="font-semibold text-2xl">Shipping</span>
				<div className="text-sm breadcrumbs">
					<ul>
						<li>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-4 h-4 mr-2 stroke-current"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
								/>
							</svg>
							Sign in
						</li>
						<li>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-4 h-4 mr-2 stroke-blue-500"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
								/>
							</svg>
							<span className="text-blue-500 font-semibold">Shipping</span>
						</li>
					</ul>
				</div>
			</div>

			<form
				className="flex flex-col-reverse items-center md:items-baseline md:flex-row justify-between w-full lg:max-w-5xl xl:max-w-6xl"
				onSubmit={(e) => {
					e.preventDefault();
					setMyOrder((prev) => {
						return {
							...prev,
							completedShippingForm: true,
						};
					});
					navigate("/checkout/payment");
				}}
			>
				<div className="flex flex-col border-[1px] items-center justify-center p-4 shadow-md rounded-lg">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 mb-6">
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
								className="select select-md select-bordered"
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

					<div className="flex justify-end w-full">
						<button className="btn rounded-lg btn-primary">Continue</button>
						{/* <Link to="/checkout/payselect" className="btn btn-primary">
						Continue
					</Link> */}
					</div>
				</div>

				<div className="rounded-lg shadow-sm h-fit w-80 border-[1px] py-6 px-4 flex flex-col items-center">
					<div className="w-full flex items-center justify-between mb-6">
						<div>
							<span className="font-semibold mr-2 ">Subtotal</span>
							<span className="text-gray-700">
								({cartItemsInfo.numItems} items)
							</span>
						</div>
						<div className="text-gray-700">${cartItemsInfo.subTotal}</div>
					</div>

					<div className="w-full flex items-center justify-between mb-6">
						<div>
							<span className="font-semibold mr-2 ">Shipping</span>
						</div>
						<div className="text-gray-700">Free</div>
					</div>

					<div className="w-full flex items-center justify-between border-b-[1px] pb-6 mb-6">
						<div className=" font-semibold ">Estimated taxes</div>
						<div className="text-gray-700">
							${(cartItemsInfo.subTotal * 0.0625).toFixed(2)}
						</div>
					</div>

					<div className="w-full flex items-center justify-between">
						<div className="text-lg font-semibold ">Estimated total</div>
						<div className="text-lg font-semibold">
							$
							{(
								cartItemsInfo.subTotal +
								cartItemsInfo.subTotal * 0.0625
							).toFixed(2)}
						</div>
					</div>
				</div>
			</form>
		</div>
	);
}

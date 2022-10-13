import { Link, useNavigate } from "react-router-dom";
import { useCartContext } from "../../hooks/context/useCartContext";
import { CartItemInfo } from "../../interfaces/cartInterface";
import { useGetCartItems } from "../../hooks/cart/useGetCartItems";
import CartItem from "./CartItem";
import { useOrderContext } from "../../hooks/context/useOrderContext";
import Spinner from "../loading/Spinner";

export default function Cart() {
	const { myCart, cartItemsInfo } = useCartContext();
	const { setMyOrder } = useOrderContext();
	const navigate = useNavigate();
	const {
		data: displayCartItems,
		isSuccess,
		isLoading,
		isFetching,
	} = useGetCartItems(myCart);

	return (
		<div className="flex flex-col items-center justify-center mb-6 mx-4 lg:mx-0">
			<div className="flex items-center gap-2 w-full mt-8 mb-6 lg:max-w-5xl xl:max-w-7xl">
				<span className="font-medium text-xl sm:text-2xl">My Cart</span>
			</div>

			<div className="flex flex-col-reverse md:flex-row justify-center h-max w-full gap-4 lg:max-w-5xl xl:max-w-7xl">
				<div className="border-[1px] py-2 px-6 h-max rounded-lg shadow-sm transition-all fade w-full md:w-2/3">
					{displayCartItems?.length === 0 && (
						<div className="flex flex-col items-center justify-center gap-6 h-[262px]">
							<div className="flex items-center gap-2 text-2xl font-semibold">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="currentColor"
									className="w-7 h-7"
								>
									<path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
								</svg>

								<span>Your cart is empty</span>
							</div>
							<Link
								to={"/products"}
								className="btn btn-primary w-64 rounded-full"
							>
								Browse our products
							</Link>
						</div>
					)}
					{isSuccess ? (
						displayCartItems.map((item: CartItemInfo) => {
							return (
								<CartItem
									key={item._id}
									_id={item._id}
									name={item.name}
									category={item.category}
									description={item.description}
									image={item.image}
									imageCloudId={item.imageCloudId}
									price={item.price}
								/>
							);
						})
					) : (
						<Spinner mt={6} />
					)}
				</div>

				<div className="flex flex-col items-center md:sticky top-6 rounded-lg shadow-md h-fit w-full md:w-1/3 border-[1px] py-4 md:py-6 px-4 mb-4 md:mb-0">
					<div className="w-full border-b-[1px] mb-4 md:mb-6">
						<Link
							className={`btn ${
								cartItemsInfo.numItems === 0 ? "btn-disabled" : "btn-primary"
							}  rounded-full mb-4 md:mb-6 w-full `}
							to={"/checkout/shipping"}
						>
							Continue to checkout
						</Link>
					</div>

					<div className="w-full border-b-[1px] mb-4 md:mb-6">
						<button
							className={`btn ${
								cartItemsInfo.numItems === 0 ? "btn-disabled" : "btn"
							}  rounded-full mb-4 md:mb-6 w-full `}
							onClick={() => {
								setMyOrder({
									shippingInfo: {
										firstName: process.env.REACT_APP_GUEST_CARDFIRSTNAME!,
										lastName: process.env.REACT_APP_GUEST_CARDLASTNAME!,
										address: process.env.REACT_APP_GUEST_ADDRESS!,
										aptSuiteEtc: "",
										state: process.env.REACT_APP_GUEST_STATE!,
										city: process.env.REACT_APP_GUEST_CITY!,
										zipCode: process.env.REACT_APP_GUEST_ZIPCODE!,
										phone: process.env.REACT_APP_GUEST_PHONE!,
										email: process.env.REACT_APP_GUEST_EMAIL!,
									},
									paymentInfo: {
										cardNumber: process.env.REACT_APP_GUEST_CARDNUMBER!,
										cardHolderFirstName:
											process.env.REACT_APP_GUEST_CARDFIRSTNAME!,
										cardHolderLastName:
											process.env.REACT_APP_GUEST_CARDLASTNAME!,
										expiryDateMonth: process.env.REACT_APP_GUEST_CARDEXPMONTH!,
										expiryDateYear: process.env.REACT_APP_GUEST_CARDEXPYEAR!,
										securityCode: process.env.REACT_APP_GUEST_CARDCVV!,
										phone: process.env.REACT_APP_GUEST_PHONE!,
										subTotal: 0,
									},
									completedPaymentForm: true,
									completedShippingForm: true,
								});

								navigate("/checkout/confirmation");
							}}
						>
							Checkout with demo info
						</button>
					</div>

					<div className="w-full flex items-center justify-between mb-6">
						<div>
							<span className="font-semibold mr-2 ">Subtotal</span>
							<span className="text-gray-700">
								({cartItemsInfo.numItems} items)
							</span>
						</div>
						<div className="text-gray-700">${cartItemsInfo.subTotal}</div>
					</div>

					<div className="w-full flex items-center justify-between border-b-2 border-gray-800 pb-4 mb-4 md:pb-6 md:mb-6">
						<div className="font-semibold ">Taxes</div>
						<div className="text-gray-700">Calculated at checkout</div>
					</div>

					<div className="w-full flex items-center justify-between">
						<div className="font-semibold ">Estimated Total</div>
						<div className="text-lg font-semibold">
							${cartItemsInfo.subTotal}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

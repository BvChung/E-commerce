import { Link, useNavigate } from "react-router-dom";
import { useCartContext } from "../../hooks/context/useCartContext";
import { CartItemInfo } from "../../interfaces/cartInterface";
import { useGetCartItems } from "../../hooks/cart/useGetCartItems";
import CartItem from "./CartItem";
import { useOrderContext } from "../../hooks/context/useOrderContext";

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
		<div className="flex flex-col items-center justify-center mb-6">
			<div className="flex items-center gap-2 w-full mt-8 mb-6 lg:max-w-5xl xl:max-w-7xl">
				<span className="font-semibold text-2xl">Cart</span>
				<span className="font-base text-lg">
					({cartItemsInfo.numItems} items)
				</span>
			</div>
			<div className="flex justify-center h-max w-full gap-4 lg:max-w-5xl xl:max-w-7xl">
				<div className="border-[1px] p-4 h-max rounded-lg shadow-md transition-all fade w-2/3">
					{displayCartItems?.length === 0 && (
						<div className="flex flex-col items-center justify-center gap-6 h-[262px]">
							<div className="text-2xl font-semibold">Your cart is empty</div>
							<Link to={"/products"} className="btn btn-primary rounded-full">
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
						<div className="border border-blue-300 shadow rounded-md p-4 max-w-md w-full mx-auto">
							<div className="animate-pulse flex space-x-4 h-full w-full">
								<div className="rounded-md bg-slate-700 h-full w-24"></div>
								<div className="flex-1 space-y-6 py-1">
									<div className="h-2 bg-slate-700 rounded"></div>
									<div className="space-y-3">
										<div className="grid grid-cols-3 gap-4">
											<div className="h-2 bg-slate-700 rounded col-span-2"></div>
											<div className="h-2 bg-slate-700 rounded col-span-1"></div>
										</div>
										<div className="grid grid-cols-3 gap-4">
											<div className="h-2 bg-slate-700 rounded col-span-2"></div>
											<div className="h-2 bg-slate-700 rounded col-span-1"></div>
										</div>
										<div className="h-2 bg-slate-700 rounded"></div>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>

				<div className="sticky top-6 rounded-lg shadow-sm h-fit w-1/3 border-[1px] py-6 px-4 flex flex-col items-center">
					<div className="w-full border-b-[1px] mb-6">
						<Link
							className={`btn ${
								cartItemsInfo.numItems === 0 ? "btn-disabled" : "btn-primary"
							}  rounded-full mb-6 w-full `}
							to={"/checkout/shipping"}
						>
							Continue to checkout
						</Link>
					</div>

					<div className="w-full border-b-[1px] mb-6">
						<button
							className={`btn ${
								cartItemsInfo.numItems === 0 ? "btn-disabled" : "btn-primary"
							}  rounded-full btn-info mb-6 w-full `}
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

					<div className="w-full flex items-center justify-between border-b-[1px] pb-6 mb-6">
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

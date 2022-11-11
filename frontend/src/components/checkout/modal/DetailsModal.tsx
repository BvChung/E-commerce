import { CartCheckoutInfo } from "../../../interfaces/cartInterface";

export default function DetailsModal({ numItems, subTotal }: CartCheckoutInfo) {
	return (
		<div className="md:hidden w-full">
			<div className="rounded-lg shadow-sm h-fit w-full md:w-1/3 lg:max-w-[350px] border-[1px] py-6 px-4 flex flex-col items-center mb-6 md:mb-0">
				<div className="w-full flex items-center justify-between">
					<div>
						<span className="font-semibold mr-2 ">View Checkout Details</span>
					</div>
					<label
						htmlFor="payment-modal"
						className="modal-button cursor-pointer"
					>
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
								d="M12 4.5v15m7.5-7.5h-15"
							/>
						</svg>
					</label>
				</div>
			</div>

			<input type="checkbox" id="payment-modal" className="modal-toggle" />
			<label
				htmlFor="payment-modal"
				className="modal modal-bottom sm:modal-middle cursor-pointer"
			>
				<label className="modal-box relative" htmlFor="">
					<label
						className="btn btn-sm btn-circle absolute right-2 top-2"
						htmlFor="payment-modal"
					>
						✕
					</label>

					<h3 className="text-xl font-bold mb-6 border-b-2 border-gray-800 pb-2">
						Checkout Details
					</h3>

					<div className="h-fit w-full flex flex-col items-center">
						<div className="w-full flex items-center justify-between mb-6">
							<div>
								<span className="font-semibold mr-2 ">Subtotal</span>
								<span className="text-gray-700">({numItems} items)</span>
							</div>
							<div className="text-gray-700">${subTotal}</div>
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
								${(subTotal * 0.0625).toFixed(2)}
							</div>
						</div>

						<div className="w-full flex items-center justify-between">
							<div className="md:text-lg font-semibold ">Estimated total</div>
							<div className="md:text-lg font-semibold">
								${(subTotal + subTotal * 0.0625).toFixed(2)}
							</div>
						</div>
					</div>
				</label>
			</label>
		</div>
	);
}

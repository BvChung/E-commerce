import { useParams } from "react-router-dom";
import { useGetProductInfo } from "../../hooks/products/useGetProductInfo";
import { useCartContext } from "../../hooks/context/useCartContext";
import { toast } from "react-toastify";

export default function ProductInfo() {
	const params = useParams();
	const {
		addCartItem,
		findCartItem,
		incrementCartQuantity,
		decrementCartQuantity,
	} = useCartContext();

	const { isSuccess, data: productInfo } = useGetProductInfo(params.id);

	const foundItem = findCartItem(productInfo?._id);

	return (
		<div className="flex flex-col items-center justify-center my-8 md:my-10 mx-2">
			{isSuccess && (
				<div className="flex flex-col items-center justify-center w-full lg:max-w-5xl xl:max-w-6xl">
					<div className="flex flex-col-reverse md:flex-row w-full gap-8 md:gap-20 md:justify-between mb-8 md:mb-10">
						<div className="flex justify-center">
							<img
								className="h-[300px] w-full sm:w-[500px] md:w-[700px] md:h-[500px] xl:w-[800px] object-fill "
								src={productInfo.image}
								alt="Product"
							></img>
						</div>
						<div className="flex flex-col w-full md:w-80 h-fit p-4 border-[1px] rounded-lg shadow-sm md:shadow-md">
							<p className="font-semibold text-xl text-gray-800 mb-4">
								{productInfo.name}
							</p>
							<p className="font-bold text-xl text-gray-900 mb-4">
								${productInfo.price.toFixed(2)}
							</p>
							<div className="md:border-b-[1px] pb-0 md:pb-4 mb-0 md:mb-4">
								{!foundItem ? (
									<button
										onClick={() => {
											if (!productInfo) return;

											addCartItem({
												_id: productInfo._id,
												price: productInfo.price,
												quantity: 1,
											});

											toast.success(
												`${productInfo.name} has been added to your cart.`
											);
										}}
										className="btn btn-primary h-11 md:h-12 w-full rounded-full"
									>
										Add to cart
									</button>
								) : (
									<div className="btn-group">
										<button
											className={`btn btn-md  ${
												foundItem?.quantity === 0 && "btn-disabled"
											} `}
											onClick={() => {
												decrementCartQuantity(productInfo._id);
											}}
										>
											«
										</button>
										<button className="btn btn-md">
											{foundItem.quantity !== 9
												? `${foundItem?.quantity} Added`
												: `Max ${foundItem?.quantity}`}
										</button>
										<button
											onClick={() => {
												incrementCartQuantity(productInfo._id);
											}}
											className={`btn btn-md ${
												foundItem?.quantity === 9 && "btn-disabled"
											} `}
										>
											»
										</button>
									</div>

									// flex bg-gray-100 text-base font-semibold text-gray-800 items-center justify-center w-28 md:w-[98px] px-4
								)}
							</div>

							<div className="hidden md:flex md:flex-col gap-5">
								<div className="flex items-center gap-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="w-6 h-6 stroke-amber-400"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
										/>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M6 6h.008v.008H6V6z"
										/>
									</svg>

									<p className="text-sm">{productInfo.category}</p>
								</div>

								<div className="flex gap-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="w-6 h-6 stroke-stone-500"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
										/>
									</svg>

									<p className="text-sm">{productInfo.name.split(" ")[1]}</p>
								</div>

								<div className="flex items-center gap-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="w-6 h-6 stroke-emerald-600"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
										/>
									</svg>

									<p className="text-sm">
										Pickup, <b>tomorrow</b> at Modernfy
									</p>
								</div>

								<div className="flex gap-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="w-6 h-6 stroke-sky-600"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
										/>
									</svg>

									<p className="text-sm">Free shipping</p>
								</div>

								<div className="flex gap-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="w-6 h-6 stroke-pink-600"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
										/>
									</svg>

									<p className="text-sm">Add to list</p>
								</div>

								<div className="flex gap-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="w-6 h-6 stroke-purple-500"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
										/>
									</svg>

									<p className="text-sm">Add to registry</p>
								</div>
							</div>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-y-4 gap-x-6 mb-6 px-4 w-full md:hidden">
						<div className="flex items-center gap-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6 stroke-amber-400"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
								/>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M6 6h.008v.008H6V6z"
								/>
							</svg>

							<p className="text-sm">{productInfo.category}</p>
						</div>

						<div className="flex gap-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6 stroke-stone-500"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
								/>
							</svg>

							<p className="text-sm">{productInfo.name.split(" ")[1]}</p>
						</div>

						<div className="flex items-center gap-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6 stroke-emerald-600"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
								/>
							</svg>

							<p className="text-sm">
								Pickup, <b>tomorrow</b>
							</p>
						</div>

						<div className="flex gap-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6 stroke-sky-600"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
								/>
							</svg>

							<p className="text-sm">Free shipping</p>
						</div>

						<div className="flex gap-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6 stroke-pink-600"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
								/>
							</svg>

							<p className="text-sm">Add to list</p>
						</div>

						<div className="flex gap-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6 stroke-purple-500"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
								/>
							</svg>

							<p className="text-sm">Add to registry</p>
						</div>
					</div>

					<div className="w-full border-y-[1px] lg:max-w-5xl xl:max-w-7xl p-4">
						<h1 className="font-semibold text-xl mb-4">About the Product</h1>
						<p>{productInfo.description}</p>
					</div>
				</div>
			)}
		</div>
	);
}

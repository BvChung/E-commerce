import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useGetProductInfo } from "../../hooks/products/useGetProductInfo";
import { useUpdateProduct } from "../../hooks/admin/useUpdateProduct";
import { ProductForm } from "../../interfaces/productInterface";

export default function ProductUpdate() {
	const params = useParams();
	const { isSuccess, data: productInfo } = useGetProductInfo(params.id);
	const { mutate } = useUpdateProduct(params.id);
	const imageRef = useRef<HTMLInputElement>(null);

	const [productFormData, setProductFormData] = useState<ProductForm>({
		name: "",
		description: "",
		price: "",
		category: "",
	});

	useEffect(() => {
		if (!productInfo) return;

		setProductFormData({
			name: productInfo.name,
			description: productInfo.description,
			price: String(productInfo.price),
			category: productInfo.category,
		});
	}, [isSuccess]);

	const [file, setFile] = useState<File | null>(null);
	const [image, setImage] = useState<string | null>(null);

	function handleChange(
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLTextAreaElement>
			| React.ChangeEvent<HTMLSelectElement>
	): void {
		const { name, value } = e.target;

		setProductFormData((prev) => {
			return {
				...prev,
				[name]: value,
			};
		});
	}

	function readFile(file: File) {
		const reader = new FileReader();
		reader.readAsDataURL(file);

		reader.onloadend = () => {
			setImage(reader.result?.toString()!);
		};
	}

	function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
		if (!e.target.files) return;

		// file size measured in bytes: max size of 5 MB
		if (e.target.files[0].size <= 5 * 10 ** 6) {
			const productImageFile = e.target.files[0];
			setFile(productImageFile);
			readFile(productImageFile);
		} else {
			if (imageRef.current) {
				imageRef.current.value = "";
			}

			return toast.error("File must be less than 5 MB");
		}
	}

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (!file) {
			mutate({
				...productFormData,
				price: +productFormData.price,
			});
		} else {
			mutate({
				...productFormData,
				price: +productFormData.price,
				image,
				fileName: file.name,
			});
		}

		if (imageRef.current) {
			imageRef.current.value = "";
		}
		if (file || image) {
			setFile(null);
			setImage(null);
		}
	}

	return (
		<div className="flex flex-col items-center justify-center mb-6 mx-4 lg:mx-0">
			<div className="flex items-center gap-2 w-full mt-8 mb-6 pb-2 border-b-[1px] border-gray-200 lg:max-w-5xl xl:max-w-6xl">
				<Link to={"/admin/updateproduct"} className="mr-2 cursor-pointer">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={2}
						stroke="currentColor"
						className="w-5 h-5 md:w-5 md:h-5"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
						/>
					</svg>
				</Link>
				<span className="font-semibold text-xl sm:text-2xl">
					Update Product
				</span>
			</div>

			<div className="flex items-center gap-2 w-full mb-2 lg:max-w-5xl xl:max-w-6xl">
				<span className="font-medium text-sm md:text-base mb-1">
					Item #{productInfo?._id}
				</span>
			</div>

			<div className="flex items-center h-max w-full mb-4 lg:max-w-5xl xl:max-w-6xl ">
				<form
					onSubmit={handleSubmit}
					className="flex flex-col justify-center gap-5 w-full md:w-fit"
				>
					<div className="form-control w-full">
						<label className="label">
							<span className="label-text ">Name</span>
						</label>
						<input
							type="text"
							placeholder="Name"
							className="input input-bordered w-full md:w-[688px]"
							name="name"
							value={productFormData.name}
							onChange={handleChange}
							required
						/>
					</div>

					<div className="form-control w-full">
						<label className="label">
							<span className="label-text">Category</span>
						</label>
						<select
							name="category"
							value={productFormData.category}
							onChange={handleChange}
							className="select select-bordered w-full md:w-[688px]"
							required
						>
							<option disabled value="">
								Assign category
							</option>
							<option value="Sofa">Sofa</option>
							<option value="Table">Table</option>
							<option value="Chair">Chair</option>
							<option value="Desk">Desk</option>
							<option value="Drawer">Drawer</option>
							<option value="Shelf">Shelf</option>
						</select>
					</div>

					<div className="form-control w-full ">
						<label className="label">
							<span className="label-text">Price</span>
						</label>
						<input
							type="text"
							placeholder="Price"
							className="input input-bordered w-full md:w-[688px]"
							name="price"
							value={productFormData.price}
							onChange={handleChange}
							required
						/>
					</div>

					<div className="form-control w-full ">
						<label className="label">
							<span className="label-text">Description</span>
						</label>
						<textarea
							className="textarea textarea-bordered overflow-auto resize w-full md:w-[688px] h-36"
							placeholder="Description"
							name="description"
							value={productFormData.description}
							onChange={handleChange}
							required
						></textarea>
					</div>

					<div className="form-control w-full max-w-[26rem] mb-4">
						<span className="label label-text">Upload Image</span>
						<label htmlFor="image" className="cursor-pointer">
							<div className="relative">
								<img
									src={image ? image : productInfo?.image}
									alt="Product"
									className="rounded-md w-full h-72 object-cover"
								/>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-12 h-12 bg-offwhite rounded-full border-[1px] border-gray-900 p-2 absolute right-1 bottom-1 stroke-gray-900"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
									/>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
									/>
								</svg>
							</div>
						</label>

						<input
							className="file-input hidden"
							ref={imageRef}
							type="file"
							id="image"
							name="image"
							accept=".png,.jpeg,.jpg"
							onChange={handleFile}
						/>
					</div>

					<button className="btn btn-primary w-fit px-8 self-end">
						Save Changes
					</button>
				</form>
			</div>
		</div>
	);
}

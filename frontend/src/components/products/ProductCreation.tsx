import React, { useState } from "react";
import { useCreateProduct } from "../../hooks/products/useCreateProduct";

interface UploadedFile {
	name: string;
}

interface ProductForm {
	name: string;
	description: string;
	price: string;
	category: string;
	image: File | string | null;
	file: UploadedFile | File | null;
}

export default function ProductCreation() {
	const { isSuccess, mutate } = useCreateProduct();

	const [productFormData, setProductFormData] = useState<ProductForm>({
		name: "",
		description: "",
		price: "",
		category: "",
		image: null,
		file: null,
	});
	console.log(productFormData);

	const [file, setFile] = useState<UploadedFile | File | null>(null);
	const [image, setImage] = useState<string | null>(null);

	function handleChange(
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLTextAreaElement>
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
		if (e.target.files) {
			console.log(e.target.files[0]);
			const productImageFile = e.target.files[0];
			setFile(productImageFile);
			readFile(productImageFile);
		}
	}

	function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
		e.preventDefault();

		if (file) {
			mutate({ image, fileName: file.name });
		}
	}

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-4">
			<h1>ProductCreation</h1>
			<div className="form-control w-full max-w-sm">
				<label className="label">
					<span className="label-text">Name</span>
				</label>
				<input
					type="text"
					placeholder="Enter product name"
					className="input input-bordered w-full max-w-sm "
					name="name"
					value={productFormData.name}
					onChange={handleChange}
				/>
			</div>
			<div className="form-control">
				<label className="label">
					<span className="label-text">Description</span>
				</label>
				<textarea
					className="textarea textarea-bordered w-full max-w-sm "
					placeholder="Enter product description"
					name="description"
					value={productFormData.description}
					onChange={handleChange}
				></textarea>
			</div>
			<div className="form-control w-full max-w-sm">
				<label className="label">
					<span className="label-text">Price</span>
				</label>
				<input
					type="number"
					placeholder="Enter product price"
					className="input input-bordered w-full max-w-sm "
					name="price"
					value={productFormData.price}
					onChange={handleChange}
				/>
			</div>
			<div className="form-control w-full max-w-sm">
				<label className="label">
					<span className="label-text">Upload Image</span>
				</label>
				<input
					className="file-input"
					type="file"
					id="image"
					name="image"
					accept=".png,.jpeg,.jpg,.gif"
					onChange={handleFile}
				/>
			</div>

			{image && (
				<img src={image} className="object-fill w-52 h-52" alt="Avatar" />
			)}

			<button className="btn btn-primary">submit image</button>
		</form>
	);
}

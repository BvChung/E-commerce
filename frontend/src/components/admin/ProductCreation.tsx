import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import { useCreateProduct } from "../../hooks/admin/useCreateProduct";
import { ProductForm } from "../../interfaces/productInterface";

export default function ProductCreation() {
	const { mutate } = useCreateProduct();
	const imageRef = useRef<HTMLInputElement>(null);

	const [productFormData, setProductFormData] = useState<ProductForm>({
		name: "",
		description: "",
		price: "",
		category: "",
	});

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

		if (!file) return toast.error("Missing image file.");

		mutate({
			...productFormData,
			price: +productFormData.price,
			image,
			fileName: file.name,
		});

		if (imageRef.current) {
			imageRef.current.value = "";
		}

		setProductFormData({
			name: "",
			description: "",
			price: "",
			category: "",
		});
		setImage(null);
		setFile(null);
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
					required
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
					required
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
					required
				/>
			</div>

			<div className="form-control w-full max-w-xs">
				<label className="label">
					<span className="label-text">Product Category</span>
				</label>
				<select
					name="category"
					value={productFormData.category}
					onChange={handleChange}
					className="select select-bordered"
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

			<div className="form-control w-full max-w-sm">
				<label className="label">
					<span className="label-text">Upload Image</span>
				</label>
				<input
					className="file-input"
					ref={imageRef}
					type="file"
					id="image"
					name="image"
					accept=".png,.jpeg,.jpg"
					onChange={handleFile}
					required
				/>
			</div>

			{image && (
				<img src={image} className="object-fill w-52 h-52" alt="Avatar" />
			)}

			<button className="btn btn-primary">Create Product</button>
		</form>
	);
}

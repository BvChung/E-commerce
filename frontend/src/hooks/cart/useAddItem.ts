import React from "react";
import ProductCreation from "../../components/products/ProductCreation";

interface Cart {
	_id: string;
	quantity: number;
}

export const useAddItem = () => {};

export const addCart = (addedItem: Cart) => {
	const cartArr = JSON.parse(localStorage.getItem("cart")! || "[]");

	const foundItem = cartArr.find(
		(product: Cart) => product._id === addedItem._id
	);

	if (foundItem) {
		const updatedCart = cartArr.map((product: Cart) => {
			if (product._id === addedItem._id) {
				return {
					...product,
					quantity: product.quantity + addedItem.quantity,
				};
			} else {
				return { ...product };
			}
		});

		return localStorage.setItem("cart", JSON.stringify(updatedCart));
	} else {
		cartArr.push(addedItem);

		return localStorage.setItem("cart", JSON.stringify(cartArr));
	}
};

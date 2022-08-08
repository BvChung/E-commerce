import React, { createContext, useEffect, useState } from "react";
import { CartStorageData } from "../interfaces/cartInterface";

interface CartContextInterface {
	myCart: CartStorageData[];
	setMyCart: React.Dispatch<React.SetStateAction<CartStorageData[]>>;
	addCartItem: any;
	updateCartItemQuantity: any;
	clearMyCart: any;
}

interface AuthProviderProps {
	children: React.ReactNode;
}

const CartContext = createContext({} as CartContextInterface);

export const CartProvider = ({ children }: AuthProviderProps) => {
	const [myCart, setMyCart] = useState<CartStorageData[]>(
		JSON.parse(localStorage.getItem("cart")!) || []
	);

	function addCartItem(newItem: CartStorageData) {
		const foundItem = myCart.find(
			(product: CartStorageData) => product._id === newItem._id
		);

		if (foundItem) {
			const updatedCart = myCart.map((product: CartStorageData) => {
				if (product._id === newItem._id) {
					return {
						...product,
						quantity: product.quantity + newItem.quantity,
					};
				} else {
					return { ...product };
				}
			});

			return setMyCart(updatedCart);
		} else {
			return setMyCart((prev: CartStorageData[]) => [...prev, newItem]);
		}
	}

	function updateCartItemQuantity() {}

	function clearMyCart() {
		setMyCart([]);
	}

	useEffect(() => {
		localStorage.setItem("cart", JSON.stringify(myCart));
	}, [myCart]);

	return (
		<CartContext.Provider
			value={{
				myCart,
				setMyCart,
				addCartItem,
				updateCartItemQuantity,
				clearMyCart,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

export default CartContext;

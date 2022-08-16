import React, { createContext, useEffect, useState } from "react";
import { CartStorageData, CartItemsInfo } from "../interfaces/cartInterface";

interface CartContextInterface {
	myCart: CartStorageData[];
	setMyCart: React.Dispatch<React.SetStateAction<CartStorageData[]>>;
	cartItemsInfo: CartItemsInfo;
	setCartItemsInfo: React.Dispatch<React.SetStateAction<CartItemsInfo>>;
	addCartItem(newItem: CartStorageData): void;
	removeCartItem(removedItem: CartStorageData): void;
	updateCartItemQuantity(updatedItem: CartStorageData): void;
	clearMyCart(): void;
}

interface AuthProviderProps {
	children: React.ReactNode;
}

const CartContext = createContext({} as CartContextInterface);

export const CartProvider = ({ children }: AuthProviderProps) => {
	const [myCart, setMyCart] = useState<CartStorageData[]>(
		JSON.parse(localStorage.getItem("cart")!) || []
	);

	const [cartItemsInfo, setCartItemsInfo] = useState<CartItemsInfo>({
		subTotal: 0,
		numItems: 0,
	});

	function addCartItem(newItem: CartStorageData) {
		const foundItem = myCart.find(
			(product: CartStorageData) => product._id === newItem._id
		);

		if (foundItem) {
			return setMyCart((prev) => {
				return prev.map((item) => {
					if (item._id === newItem._id) {
						return {
							...item,
							quantity: item.quantity + newItem.quantity,
						};
					} else {
						return { ...item };
					}
				});
			});
		} else {
			return setMyCart((prev) => [...prev, newItem]);
		}
	}

	function removeCartItem(removedItem: CartStorageData) {
		return setMyCart((prev) =>
			prev.filter((item) => item._id !== removedItem._id)
		);
	}

	function updateCartItemQuantity(updatedItem: CartStorageData) {
		return setMyCart((prev) => {
			return prev.map((item) => {
				if (item._id === updatedItem._id) {
					return {
						...item,
						quantity: updatedItem.quantity,
					};
				} else {
					return { ...item };
				}
			});
		});
	}

	function clearMyCart() {
		setMyCart([]);
	}

	useEffect(() => {
		localStorage.setItem("cart", JSON.stringify(myCart));
		setCartItemsInfo(() => {
			return {
				subTotal: myCart.reduce(
					(prev, curr) => prev + curr.price * curr.quantity,
					0
				),
				numItems: myCart.reduce((prev, curr) => prev + curr.quantity, 0),
			};
		});
	}, [myCart]);

	return (
		<CartContext.Provider
			value={{
				myCart,
				setMyCart,
				cartItemsInfo,
				setCartItemsInfo,
				addCartItem,
				removeCartItem,
				updateCartItemQuantity,
				clearMyCart,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

export default CartContext;

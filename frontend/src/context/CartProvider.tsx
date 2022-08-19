import React, { createContext, useEffect, useState } from "react";
import { CartStorageData, CartCheckoutInfo } from "../interfaces/cartInterface";

interface CartContextInterface {
	myCart: CartStorageData[];
	setMyCart: React.Dispatch<React.SetStateAction<CartStorageData[]>>;
	cartItemsInfo: CartCheckoutInfo;
	setCartItemsInfo: React.Dispatch<React.SetStateAction<CartCheckoutInfo>>;
	addCartItem(newItem: CartStorageData): void;
	incrementCartQuantity(_id: string): void;
	decrementCartQuantity(_id: string): void;
	findCartItem(_id: string | undefined): CartStorageData | undefined;
	removeCartItem(_id: string): void;
	updateCartQuantity(updatedItem: CartStorageData): void;
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

	const [cartItemsInfo, setCartItemsInfo] = useState<CartCheckoutInfo>({
		subTotal: 0,
		numItems: 0,
	});

	function findCartItem(_id: string | undefined) {
		return myCart.find((item) => item._id === _id);
	}

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

		// return setMyCart((prev) => [...prev, newItem]);
	}

	function removeCartItem(_id: string) {
		return setMyCart((prev) => prev.filter((item) => item._id !== _id));
	}

	function updateCartQuantity(updatedItem: CartStorageData) {
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

	function incrementCartQuantity(_id: string) {
		return setMyCart((prev) => {
			return prev.map((item) => {
				if (item._id === _id) {
					return {
						...item,
						quantity: (item.quantity += 1),
					};
				} else {
					return { ...item };
				}
			});
		});
	}

	function decrementCartQuantity(_id: string) {
		const foundItem = myCart.find(
			(product: CartStorageData) => product._id === _id
		);

		if (foundItem?.quantity === 1) {
			return removeCartItem(_id);
		} else {
			return setMyCart((prev) => {
				return prev.map((item) => {
					if (item._id === _id) {
						return {
							...item,
							quantity: (item.quantity -= 1),
						};
					} else {
						return { ...item };
					}
				});
			});
		}
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
				incrementCartQuantity,
				decrementCartQuantity,
				findCartItem,
				removeCartItem,
				updateCartQuantity,
				clearMyCart,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

export default CartContext;

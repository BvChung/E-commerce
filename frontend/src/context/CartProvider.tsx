import React, { createContext, useState } from "react";
import Cart from "../components/cart/Cart";

interface CartContextInterface {
	myCart: Cart | null;
	setMyCart: React.Dispatch<React.SetStateAction<Cart[]>>;
	addCartItem: any;
}

interface AuthProviderProps {
	children: React.ReactNode;
}

interface Cart {
	_id: string;
	quantity: number;
}

const CartContext = createContext({} as CartContextInterface);

export const CartProvider = ({ children }: AuthProviderProps) => {
	const [myCart, setMyCart] = useState(
		JSON.parse(localStorage.getItem("cart")!) || []
	);

	function addCartItem(newItem: Cart) {
		const foundItem = myCart.find(
			(product: Cart) => product._id === newItem._id
		);

		if (foundItem) {
			const updatedCart = myCart.map((product: Cart) => {
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
			return setMyCart((prev: Cart[]) => [...prev, newItem]);
		}
	}

	return (
		<CartContext.Provider value={{ myCart, setMyCart, addCartItem }}>
			{children}
		</CartContext.Provider>
	);
};

export default CartContext;

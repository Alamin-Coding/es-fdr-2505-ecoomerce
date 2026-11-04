import { createContext, useState } from "react";

export const ThemeContext = createContext();

const ContextProvider = ({ children }) => {
	const [number, setNumber] = useState(0);
	const [cart, setCart] = useState([]);
	const [wishlist, setWishlist] = useState([]);
	return (
		<ThemeContext value={{ number, cart, wishlist, setCart }}>{children}</ThemeContext>
	);
};

export default ContextProvider;

import { useState } from "react";
import { ThemeContext } from "./ThemeContextValue";

const ContextProvider = ({ children }) => {
	const [cart, setCart] = useState([]);
	const [wishlist, setWishlist] = useState([]);
	const [compare, setCompare] = useState([]);
	const [giftWrap, setGiftWrap] = useState(false);
	return (
		<ThemeContext
			value={{
				cart,
				setCart,
				wishlist,
				setWishlist,
				compare,
				setCompare,
				giftWrap,
				setGiftWrap,
			}}
		>
			{children}
		</ThemeContext>
	);
};

export default ContextProvider;

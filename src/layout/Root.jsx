import { useState } from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";

const Root = () => {
	const [cartItems, setCartItems] = useState([]);
	return (
		<main>
			<ToastContainer />
			<Navbar
				onOpenCart={() => setIsCartOpen(true)}
				cartCount={cartItems.length}
			/>
			<Outlet />
			<Footer />
		</main>
	);
};

export default Root;

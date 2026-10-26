import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";

const Root = () => {
	return (
		<main>
			<ToastContainer />
			<Navbar />
			<Outlet />
			<Footer />
		</main>
	);
};

export default Root;

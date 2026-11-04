import { useContext, useState } from "react";
import { FiHeart, FiSearch, FiShoppingBag, FiUser } from "react-icons/fi";
import { Link, useNavigate } from "react-router";
import { ThemeContext } from "../../context/ThemeContext";

const AuthNavbar = () => {
	// const [cart, setCart] = useState([]);
	const { cart } = useContext(ThemeContext);
	const navigate = useNavigate();

	const handleAddToCart = (product) => {
		setCart((prev) => [...prev, product]);
		toast.success(`${product.title} karte jukta kora hoyeche!`, {
			position: "bottom-right",
			autoClose: 2000,
		});
	};
	return (
		<header className="fixed top-0 left-0 w-full border-b border-gray-100 py-6 bg-white z-100">
			<div className="container">
				<div className="flex items-center justify-between">
					<Link
						to={"/"}
						className="w-[171px] text-3xl font-extrabold tracking-widest text-black font-volkhov"
					>
						<img src="FASCO.svg" alt="logo" />
					</Link>

					<nav className="hidden md:flex space-x-10 text-sm font-medium text-gray-600">
						<Link to="/" className="hover:text-black transition">
							Home
						</Link>
						<Link to="/shop" className="text-black font-semibold">
							Shop
						</Link>
						<Link to="#" className="hover:text-black transition">
							Products
						</Link>
						<Link to="#" className="hover:text-black transition">
							Pages
						</Link>
					</nav>

					<div className="w-[182px] flex items-center justify-end space-x-5 text-xl text-gray-800">
						<button className="hover:opacity-75">
							<FiSearch />
						</button>
						<button className="hover:opacity-75">
							<FiUser />
						</button>
						<button className="hover:opacity-75">
							<FiHeart />
						</button>
						<button
							onClick={() => navigate(`/cart`)}
							className="relative hover:opacity-75"
						>
							<FiShoppingBag />
							<span className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
								{cart.length}
							</span>
						</button>
					</div>
				</div>
			</div>
		</header>
	);
};

export default AuthNavbar;

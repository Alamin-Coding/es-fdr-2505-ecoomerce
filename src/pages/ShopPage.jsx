import React, { useState } from "react";
import {
	FiSearch,
	FiUser,
	FiHeart,
	FiShoppingBag,
	FiCheckCircle,
	FiShield,
	FiTruck,
	FiHeadphones,
} from "react-icons/fi";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const products = [
	{
		id: 1,
		title: "Rounded Red Hat",
		price: 8.0,
		oldPrice: null,
		image: "/1.png",
		colors: ["#e63946", "#000000"],
	},
	{
		id: 2,
		title: "Linen Blend Shirt",
		price: 17.0,
		oldPrice: null,
		image: "/2.png",
		colors: ["#f4a261", "#e76f51"],
	},
	{
		id: 3,
		title: "Long-sleeve Coat",
		price: 106.0,
		oldPrice: null,
		image: "/3.png",
		colors: ["#000000", "#2a9d8f"],
	},
	{
		id: 4,
		title: "Boxy Denim Hat",
		price: 25.0,
		oldPrice: null,
		image: "/4.png",
		colors: ["#a8ded6", "#1d3557"],
	},
	{
		id: 5,
		title: "Linen Plain Top",
		price: 25.0,
		oldPrice: null,
		image: "/5.png",
		colors: ["#d8e2dc", "#84a59d"],
	},
	{
		id: 6,
		title: "Oversized T-shirt",
		price: 11.0,
		oldPrice: 14.0,
		image: "/6.png",
		colors: ["#ffb703", "#fb8500"],
	},
	{
		id: 7,
		title: "Polarized Sunglasses",
		price: 18.0,
		oldPrice: 21.0,
		image: "/7.png",
		colors: ["#e63946", "#457b9d"],
	},
	{
		id: 8,
		title: "Rockstar Jacket",
		price: 22.0,
		oldPrice: null,
		image: "/8.png",
		colors: ["#2b2d42", "#8d99ae"],
	},
	{
		id: 9,
		title: "Dotted Black Dress",
		price: 20.0,
		oldPrice: null,
		image: "/9.png",
		colors: ["#111111", "#555555"],
	},
];

const ShopPage = () => {
	const [cart, setCart] = useState([]);

	const handleAddToCart = (product) => {
		setCart((prev) => [...prev, product]);
		toast.success(`${product.title} karte jukta kora hoyeche!`, {
			position: "bottom-right",
			autoClose: 2000,
		});
	};

	const handleFilterClick = (type, value) => {
		Swal.fire({
			title: "Filter select kora hoyeche",
			text: `${type}: ${value}`,
			icon: "info",
			confirmButtonText: "Thik ache",
			confirmButtonColor: "#000000",
		});
	};

	return (
		<div className="w-full min-h-screen bg-white">
			<ToastContainer />

			{/* HEADER SECTION */}
			<header className="max-w-[1280px] mx-auto px-6 py-6 flex items-center justify-between border-b border-gray-100">
				<div className="w-[171px] text-3xl font-extrabold tracking-widest text-black font-volkhov">
					FASCO
				</div>

				<nav className="hidden md:flex space-x-10 text-sm font-medium text-gray-600">
					<a href="/" className="hover:text-black transition">
						Home
					</a>
					<a href="/shop" className="text-black font-semibold">
						Shop
					</a>
					<a href="#" className="hover:text-black transition">
						Products
					</a>
					<a href="#" className="hover:text-black transition">
						Pages
					</a>
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
					<button className="relative hover:opacity-75">
						<FiShoppingBag />
						{cart.length > 0 && (
							<span className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
								{cart.length}
							</span>
						)}
					</button>
				</div>
			</header>

			{/* BREADCRUMB & TITLE */}
			<div className="text-center py-10">
				<h1 className="text-4xl font-serif font-bold tracking-tight text-gray-900">
					Fashion
				</h1>
				<p className="text-xs text-gray-400 mt-2">
					Home &gt; <span className="text-gray-800 font-medium">Fashion</span>
				</p>
			</div>

			{/* MAIN CONTAINER */}
			<div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-4 gap-10 pb-20">
				{/* SIDEBAR FILTERS */}
				<aside className="lg:col-span-1 space-y-8">
					<div className="bg-white p-6 border border-gray-200 rounded-lg">
						<h3 className="text-xl font-bold text-gray-900 mb-6 font-volkhov">
							Filters
						</h3>

						{/* Size Filter */}
						<div className="mb-6">
							<h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-3">
								Size
							</h4>
							<div className="grid grid-cols-4 gap-2">
								{["S", "M", "L", "XL"].map((size) => (
									<button
										key={size}
										onClick={() => handleFilterClick("Size", size)}
										className="border border-gray-300 text-xs font-medium py-1.5 rounded hover:border-black transition"
									>
										{size}
									</button>
								))}
							</div>
						</div>

						{/* Colors Filter */}
						<div className="mb-6">
							<h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-3">
								Colors
							</h4>
							<div className="grid grid-cols-7 gap-2">
								{[
									"#ff6b6b",
									"#ff7a3d",
									"#ffe066",
									"#a9ef35",
									"#51cf66",
									"#63e6be",
									"#70c1ff",
									"#38d9a9",
									"#63c5ff",
									"#5c7cfa",
									"#748ffc",
									"#9775fa",
									"#f06595",
									"#ff6b6b",
								].map((color, index) => (
									<span
										key={index}
										className="w-5 h-5 rounded-full cursor-pointer border border-gray-300 shadow-sm hover:scale-110 transition"
										style={{ backgroundColor: color }}
									></span>
								))}
							</div>
						</div>

						{/* Prices Filter */}
						<div className="mb-6">
							<h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-3">
								Prices
							</h4>
							<ul className="space-y-2 text-xs text-gray-600">
								<li className="cursor-pointer hover:text-black">$0-$50</li>
								<li className="cursor-pointer hover:text-black">$50-$100</li>
								<li className="cursor-pointer hover:text-black">$100-$150</li>
								<li className="cursor-pointer hover:text-black">$150-$200</li>
								<li className="cursor-pointer hover:text-black">$300-$400</li>
							</ul>
						</div>

						{/* Brands Filter */}
						<div className="mb-6">
							<div className="flex justify-between items-center mb-3">
								<h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">
									Brands
								</h4>
								<span className="text-xs cursor-pointer text-gray-500">▲</span>
							</div>
							<ul className="space-y-2 text-xs text-gray-600">
								<li className="cursor-pointer hover:text-black">Minimog</li>
								<li className="cursor-pointer hover:text-black">Retrolie</li>
								<li className="cursor-pointer hover:text-black">Brook</li>
								<li className="cursor-pointer hover:text-black">Leorts</li>
								<li className="cursor-pointer hover:text-black">Vagabond</li>
								<li className="cursor-pointer hover:text-black">Abby</li>
							</ul>
						</div>

						{/* Collections Filter */}
						<div className="mb-6">
							<div className="flex justify-between items-center mb-3">
								<h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">
									Collections
								</h4>
								<span className="text-xs cursor-pointer text-gray-500">▲</span>
							</div>
							<ul className="space-y-2 text-xs text-gray-600">
								<li className="cursor-pointer font-medium text-black">
									All products
								</li>
								<li className="cursor-pointer hover:text-black">
									Best sellers
								</li>
								<li className="cursor-pointer hover:text-black">
									New arrivals
								</li>
								<li className="cursor-pointer hover:text-black">Accessories</li>
							</ul>
						</div>

						{/* Tags Filter */}
						<div>
							<h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-3">
								Tags
							</h4>
							<div className="flex flex-wrap gap-2 text-xs text-gray-600">
								{[
									"Fashion",
									"Hats",
									"Sandal",
									"Belt",
									"Bags",
									"Sunglasses",
									"Beachwear",
								].map((tag, idx) => (
									<span
										key={idx}
										className="border border-gray-200 px-2.5 py-1 rounded cursor-pointer hover:border-black"
									>
										{tag}
									</span>
								))}
							</div>
						</div>
					</div>
				</aside>

				{/* PRODUCT GRID SECTION */}
				<main className="lg:col-span-3">
					{/* Top Control Bar: Showing results strictly LEFT, Best Selling & Icons strictly RIGHT */}
					<div className="flex flex-wrap justify-between items-center mb-6 gap-4">
						<div className="text-xs text-gray-500">
							Showing 1–9 of 18 results
						</div>

						<div className="flex items-center space-x-4 ml-auto">
							<div className="flex items-center space-x-2 text-xs font-medium cursor-pointer border border-gray-200 px-3 py-2 rounded bg-white">
								<span>Best selling</span>
								<span>▼</span>
							</div>

							<div className="hidden md:flex items-center space-x-1 border border-gray-200 rounded p-1 bg-white">
								<button className="p-1.5 text-gray-800 hover:bg-gray-100 rounded">
									<span className="block w-3 h-3 border-t-2 border-b-2 border-black"></span>
								</button>
								<button className="p-1.5 text-gray-400 hover:bg-gray-100 rounded">
									<span className="flex space-x-0.5">
										<span className="w-1 h-3 border-r border-gray-400"></span>
										<span className="w-1 h-3 border-r border-gray-400"></span>
									</span>
								</button>
								<button className="p-1.5 text-gray-400 hover:bg-gray-100 rounded">
									<span className="flex space-x-0.5">
										<span className="w-0.5 h-3 bg-gray-400"></span>
										<span className="w-0.5 h-3 bg-gray-400"></span>
										<span className="w-0.5 h-3 bg-gray-400"></span>
									</span>
								</button>
								<button className="p-1.5 text-gray-400 hover:bg-gray-100 rounded">
									<span className="flex space-x-0.5">
										<span className="w-0.5 h-3 bg-gray-400"></span>
										<span className="w-0.5 h-3 bg-gray-400"></span>
										<span className="w-0.5 h-3 bg-gray-400"></span>
										<span className="w-0.5 h-3 bg-gray-400"></span>
									</span>
								</button>
								<button className="p-1.5 text-gray-400 hover:bg-gray-100 rounded">
									<span className="flex space-x-0.5">
										<span className="w-0.5 h-3 bg-gray-400"></span>
										<span className="w-0.5 h-3 bg-gray-400"></span>
										<span className="w-0.5 h-3 bg-gray-400"></span>
										<span className="w-0.5 h-3 bg-gray-400"></span>
										<span className="w-0.5 h-3 bg-gray-400"></span>
									</span>
								</button>
							</div>
						</div>
					</div>

					{/* Grid Items */}
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
						{products.map((product) => (
							<div key={product.id} className="group flex flex-col">
								<div className="relative overflow-hidden bg-gray-100 rounded mb-3 aspect-[3/4]">
									<img
										src={product.image}
										alt={product.title}
										className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-500"
									/>
									<button
										onClick={() => handleAddToCart(product)}
										className="absolute bottom-3 left-3 right-3 bg-black text-white text-xs py-2.5 rounded opacity-0 group-hover:opacity-100 transition duration-300 font-medium"
									>
										Add to Cart
									</button>
								</div>
								<div>
									<h3 className="text-xs font-semibold text-gray-900 mb-1">
										{product.title}
									</h3>
									<div className="flex items-center space-x-2 mb-2">
										<span className="text-xs font-bold text-gray-900">
											${product.price.toFixed(2)}
										</span>
										{product.oldPrice && (
											<span className="text-[10px] text-gray-400 line-through">
												${product.oldPrice.toFixed(2)}
											</span>
										)}
									</div>
									<div className="flex space-x-2">
										{product.colors.map((c, i) => (
											<span
												key={i}
												className="w-5 h-5 rounded-full border border-gray-300 shadow-sm"
												style={{ backgroundColor: c }}
											/>
										))}
									</div>
								</div>
							</div>
						))}
					</div>

					{/* Pagination */}
					<div className="flex justify-center items-center space-x-2 mt-12">
						<button className="w-8 h-8 border border-black bg-black text-white rounded text-xs font-semibold">
							1
						</button>
						<button className="w-8 h-8 border border-gray-200 text-gray-700 rounded text-xs hover:border-black">
							2
						</button>
						<button className="w-8 h-8 border border-gray-200 text-gray-700 rounded text-xs hover:border-black">
							&gt;
						</button>
					</div>
				</main>
			</div>

			{/* FOOTER */}
			<footer className="py-6 text-center text-xs text-gray-400">
				© Copyright FASCO. All Rights Reserved.
			</footer>
		</div>
	);
};

export default ShopPage;

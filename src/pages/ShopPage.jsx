import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router";
import { ThemeContext } from "../context/ThemeContextValue";

// const products = [
// 	{
// 		id: 1,
// 		title: "Rounded Red Hat",
// 		price: 8.0,
// 		oldPrice: null,
// 		image: "/1.png",
// 		colors: ["#e63946", "#000000"],
// 	},
// 	{
// 		id: 2,
// 		title: "Linen Blend Shirt",
// 		price: 17.0,
// 		oldPrice: null,
// 		image: "/2.png",
// 		colors: ["#f4a261", "#e76f51"],
// 	},
// 	{
// 		id: 3,
// 		title: "Long-sleeve Coat",
// 		price: 106.0,
// 		oldPrice: null,
// 		image: "/3.png",
// 		colors: ["#000000", "#2a9d8f"],
// 	},
// 	{
// 		id: 4,
// 		title: "Boxy Denim Hat",
// 		price: 25.0,
// 		oldPrice: null,
// 		image: "/4.png",
// 		colors: ["#a8ded6", "#1d3557"],
// 	},
// 	{
// 		id: 5,
// 		title: "Linen Plain Top",
// 		price: 25.0,
// 		oldPrice: null,
// 		image: "/5.png",
// 		colors: ["#d8e2dc", "#84a59d"],
// 	},
// 	{
// 		id: 6,
// 		title: "Oversized T-shirt",
// 		price: 11.0,
// 		oldPrice: 14.0,
// 		image: "/6.png",
// 		colors: ["#ffb703", "#fb8500"],
// 	},
// 	{
// 		id: 7,
// 		title: "Polarized Sunglasses",
// 		price: 18.0,
// 		oldPrice: 21.0,
// 		image: "/7.png",
// 		colors: ["#e63946", "#457b9d"],
// 	},
// 	{
// 		id: 8,
// 		title: "Rockstar Jacket",
// 		price: 22.0,
// 		oldPrice: null,
// 		image: "/8.png",
// 		colors: ["#2b2d42", "#8d99ae"],
// 	},
// 	{
// 		id: 9,
// 		title: "Dotted Black Dress",
// 		price: 20.0,
// 		oldPrice: null,
// 		image: "/9.png",
// 		colors: ["#111111", "#555555"],
// 	},
// ];

const PRODUCTS_PER_PAGE = 9;

const ShopPage = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [retryCount, setRetryCount] = useState(0);
	const [pageResult, setPageResult] = useState({
		page: 0,
		retryCount: -1,
		products: [],
		total: 0,
		error: "",
	});

	const { cart, setCart } = useContext(ThemeContext);

	useEffect(() => {
		const controller = new AbortController();

		fetch(
			`https://dummyjson.com/products?limit=${PRODUCTS_PER_PAGE}&skip=${(currentPage - 1) * PRODUCTS_PER_PAGE}`,
			{ signal: controller.signal },
		)
			.then((response) => {
				if (!response.ok) {
					throw new Error("Unable to load products. Please try again.");
				}
				return response.json();
			})
			.then((data) => {
				if (!Array.isArray(data.products) || !Number.isFinite(data.total)) {
					throw new Error("The product service returned an invalid response.");
				}
				setPageResult({
					page: currentPage,
					retryCount,
					products: data.products,
					total: data.total,
					error: "",
				});
			})
			.catch((error) => {
				if (error.name !== "AbortError") {
					setPageResult({
						page: currentPage,
						retryCount,
						products: [],
						total: 0,
						error: error.message || "Unable to load products. Please try again.",
					});
				}
			});

		return () => controller.abort();
	}, [currentPage, retryCount]);

	const isCurrentResult =
		pageResult.page === currentPage && pageResult.retryCount === retryCount;
	const products = isCurrentResult ? pageResult.products : [];
	const totalProducts = pageResult.total;
	const loadError = isCurrentResult ? pageResult.error : "";
	const isLoading = !isCurrentResult;
	const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);
	const firstVisiblePage = Math.max(1, Math.min(currentPage - 2, totalPages - 4));
	const visiblePages = Array.from(
		{ length: Math.min(5, totalPages) },
		(_, index) => firstVisiblePage + index,
	);

	const goToPage = (page) => {
		if (page < 1 || page > totalPages || page === currentPage || isLoading) {
			return;
		}
		setCurrentPage(page);
		document.getElementById("shop-products")?.scrollIntoView({ behavior: "smooth", block: "start" });
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

	const handleAddToCart = (product) => {
		const existingItem = cart.find((item) => item.id === product.id);
		if (existingItem && existingItem.quantity >= product.stock) {
			Swal.fire({
				title: "Stock limit reached",
				text: "The maximum available quantity is already in your cart.",
				icon: "info",
				confirmButtonText: "OK",
			});
			return;
		}

		setCart((items) => {
			const index = items.findIndex((item) => item.id === product.id);
			if (index === -1) {
				return [...items, { ...product, quantity: 1 }];
			}
			return items.map((item, itemIndex) =>
				itemIndex === index ? { ...item, quantity: item.quantity + 1 } : item,
			);
		});
		Swal.fire({
			title: existingItem ? "Cart quantity updated" : "Product added successfully",
			icon: "success",
			confirmButtonText: "OK",
		});
	};

	return (
		<div className="w-full min-h-screen bg-white">
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
					<div id="shop-products" />
					{/* Top Control Bar: Showing results strictly LEFT, Best Selling & Icons strictly RIGHT */}
					<div className="flex flex-wrap justify-between items-center mb-6 gap-4">
						<div className="text-xs text-gray-500">
							{isLoading ? "Loading products..." :
								totalProducts === 0 ? "No products found" :
									`Showing ${(currentPage - 1) * PRODUCTS_PER_PAGE + 1}–${Math.min(
										currentPage * PRODUCTS_PER_PAGE,
										totalProducts,
									)} of ${totalProducts} results`}
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
					{loadError ?
						<div className="py-16 text-center" role="alert">
							<p className="mb-4 text-sm text-red-600">{loadError}</p>
							<button
								type="button"
								onClick={() => setRetryCount((count) => count + 1)}
								className="rounded border border-black px-4 py-2 text-sm hover:bg-black hover:text-white"
							>
								Retry
							</button>
						</div>
					: isLoading ?
						<div className="py-16 text-center text-sm text-gray-500" role="status">
							Loading products...
						</div>
					:	<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
						{products.map((product) => (
							<div key={product.id} className="group flex flex-col relative">
								<Link
									to={`/product/${product.id}`}
									className="relative overflow-hidden bg-gray-100 rounded mb-3 aspect-[3/4]"
								>
									<img
										src={product.thumbnail}
										alt={product.title}
										className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-500"
									/>
								</Link>
								<button
									onClick={() => handleAddToCart(product)}
									className="absolute bottom-18 cursor-pointer left-3 right-3 bg-black text-white text-xs py-2.5 rounded opacity-0 group-hover:opacity-100 transition duration-300 font-medium"
								>
									Add to Cart
								</button>
								<div>
									<h3 className="text-xs font-semibold text-gray-900 mb-1">
										{product.title}
									</h3>
									<div className="flex items-center space-x-2 mb-2">
										<span className="text-xs font-bold text-gray-900">
											${product.price.toFixed(2)}
										</span>
										{product.discountPercentage && (
											<span className="text-[10px] text-gray-400 line-through">
												$
												{(
													product.price /
													(1 - product.discountPercentage / 100)
												).toFixed(2)}
											</span>
										)}
									</div>
									<div className="flex space-x-2">
										{/* {product.colors.map((c, i) => (
											<span
												key={i}
												className="w-5 h-5 rounded-full border border-gray-300 shadow-sm"
												style={{ backgroundColor: c }}
											/>
										))} */}
									</div>
								</div>
							</div>
						))}
					</div>}

					{/* Pagination */}
					{!loadError && totalPages > 1 && (
						<nav className="mt-12 flex flex-wrap items-center justify-center gap-2" aria-label="Product pages">
							<button
								type="button"
								onClick={() => goToPage(currentPage - 1)}
								disabled={currentPage === 1 || isLoading}
								className="h-9 rounded border border-gray-200 px-3 text-xs text-gray-700 hover:border-black disabled:cursor-not-allowed disabled:opacity-40"
							>
								Previous
							</button>
							{firstVisiblePage > 1 && (
								<>
									<button
										type="button"
										onClick={() => goToPage(1)}
										aria-label="Page 1"
										className="h-9 w-9 rounded border border-gray-200 text-xs text-gray-700 hover:border-black"
									>
										1
									</button>
									{firstVisiblePage > 2 && <span className="px-1 text-gray-400" aria-hidden="true">…</span>}
								</>
							)}
							{visiblePages.map((page) => (
								<button
									key={page}
									type="button"
									onClick={() => goToPage(page)}
									aria-label={`Page ${page}`}
									aria-current={currentPage === page ? "page" : undefined}
									disabled={isLoading}
									className={`h-9 w-9 rounded border text-xs font-semibold transition disabled:cursor-wait ${
										currentPage === page ?
											"border-black bg-black text-white"
										:	"border-gray-200 text-gray-700 hover:border-black"
									}`}
								>
									{page}
								</button>
							))}
							{visiblePages[visiblePages.length - 1] < totalPages && (
								<>
									{visiblePages[visiblePages.length - 1] < totalPages - 1 && (
										<span className="px-1 text-gray-400" aria-hidden="true">…</span>
									)}
									<button
										type="button"
										onClick={() => goToPage(totalPages)}
										aria-label={`Page ${totalPages}`}
										className="h-9 w-9 rounded border border-gray-200 text-xs text-gray-700 hover:border-black"
									>
										{totalPages}
									</button>
								</>
							)}
							<button
								type="button"
								onClick={() => goToPage(currentPage + 1)}
								disabled={currentPage === totalPages || isLoading}
								className="h-9 rounded border border-gray-200 px-3 text-xs text-gray-700 hover:border-black disabled:cursor-not-allowed disabled:opacity-40"
							>
								Next
							</button>
						</nav>
					)}
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

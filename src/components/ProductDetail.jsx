import { useContext, useEffect, useState } from "react";
import {
	FiHeart,
	FiShare2,
	FiTruck,
	FiRotateCcw,
	FiHelpCircle,
	FiMinus,
	FiPlus,
} from "react-icons/fi";
import { AiOutlineSwap, AiFillStar } from "react-icons/ai";
import { HiOutlineShieldCheck } from "react-icons/hi";
import {
	FaCcVisa,
	FaCcMastercard,
	FaCcAmex,
	FaCcDiscover,
	FaCcJcb,
} from "react-icons/fa";
import { useParams } from "react-router";
import { ThemeContext } from "../context/ThemeContextValue";
import Swal from "sweetalert2";

const sizes = ["M", "L", "XL", "XXL"];
const colors = [
	{ name: "Blue", className: "bg-sky-300" },
	{ name: "Black", className: "bg-black" },
	{ name: "Pink", className: "bg-pink-200" },
];

const ProductDetail = ({ onAddToCart }) => {
	const { id } = useParams();
	const { wishlist, setWishlist, compare, setCompare } = useContext(ThemeContext);
	const [productResult, setProductResult] = useState({
		id: null,
		attempt: -1,
		product: null,
		error: "",
	});
	const [selectedImage, setSelectedImage] = useState("");
	const [selectedSize, setSelectedSize] = useState("M");
	const [selectedColor, setSelectedColor] = useState("Blue");
	const [quantity, setQuantity] = useState(1);
	const [activeTab, setActiveTab] = useState("description");
	const [retry, setRetry] = useState(0);

	useEffect(() => {
		const controller = new AbortController();
		fetch(`https://dummyjson.com/products/${id}`, {
			signal: controller.signal,
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("We couldn't find this product.");
				}
				return response.json();
			})
			.then((data) => {
				setProductResult({ id, attempt: retry, product: data, error: "" });
				setSelectedImage(data.images?.[0] ?? data.thumbnail ?? "");
				setQuantity(1);
			})
			.catch((fetchError) => {
				if (fetchError.name !== "AbortError") {
					setProductResult({
						id,
						attempt: retry,
						product: null,
						error: fetchError.message || "Unable to load this product.",
					});
				}
			});

		return () => controller.abort();
	}, [id, retry]);

	const isLoading = productResult.id !== id || productResult.attempt !== retry;
	const product = isLoading ? null : productResult.product;
	const error = isLoading ? "" : productResult.error;

	if (isLoading) {
		return (
			<div className="mx-auto max-w-7xl px-4 py-24 text-center text-gray-500" role="status">
				Loading product details...
			</div>
		);
	}

	if (error || !product) {
		return (
			<div className="mx-auto max-w-7xl px-4 py-24 text-center">
				<p className="mb-4 text-gray-700">{error || "Product details are unavailable."}</p>
				<button
					type="button"
					onClick={() => setRetry((attempt) => attempt + 1)}
					className="rounded bg-black px-5 py-2 text-white hover:bg-gray-800"
				>
					Try again
				</button>
			</div>
		);
	}

	const isWishlisted = wishlist.some((item) => item.id === product.id);
	const isCompared = compare.some((item) => item.id === product.id);
	const reviews = product.reviews ?? [];
	const rating = Number(product.rating) || 0;
	const discount = Number(product.discountPercentage) || 0;
	const originalPrice = discount < 100 ? product.price / (1 - discount / 100) : product.price;
	const supportsVariants =
		/clothing|dress|shirt|top|shoe|footwear|fashion|jacket|coat|jeans|pants|sweater|apparel|skirt/i.test(
			`${product.category} ${product.title}`,
		);

	const changeQuantity = (amount) => {
		setQuantity((current) => Math.min(product.stock, Math.max(1, current + amount)));
	};

	const toggleWishlist = () => {
		setWishlist((current) =>
			isWishlisted ?
				current.filter((item) => item.id !== product.id)
			:	[...current, product],
		);
	};

	const toggleCompare = () => {
		setCompare((current) =>
			isCompared ?
				current.filter((item) => item.id !== product.id)
			:	[...current, product],
		);
	};

	const shareProduct = async () => {
		const shareData = {
			title: product.title,
			text: `Take a look at ${product.title}`,
			url: window.location.href,
		};

		try {
			if (navigator.share) {
				await navigator.share(shareData);
			} else {
				await navigator.clipboard.writeText(shareData.url);
				await Swal.fire({ title: "Link copied", text: "Product link copied to clipboard.", icon: "success" });
			}
		} catch (shareError) {
			if (shareError.name !== "AbortError") {
				await Swal.fire({ title: "Unable to share", text: "Please try copying the page URL from your browser.", icon: "error" });
			}
		}
	};

	return (
		<div className="mx-auto max-w-7xl px-4 py-8 font-sans text-gray-800 sm:px-6 lg:px-8">
			<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
				<div className="flex flex-col-reverse gap-4 sm:flex-row">
					<div className="flex gap-3 overflow-x-auto sm:flex-col">
						{(product.images?.length ? product.images : [product.thumbnail]).map((image, index) => (
							<button
								key={`${image}-${index}`}
								type="button"
								onClick={() => setSelectedImage(image)}
								aria-label={`View product image ${index + 1}`}
								aria-pressed={selectedImage === image}
								className={`h-20 w-16 shrink-0 overflow-hidden rounded border transition ${
									selectedImage === image ? "border-2 border-black" : "border-gray-200 opacity-70 hover:opacity-100"
								}`}
							>
								<img src={image} alt="" className="h-full w-full object-cover" />
							</button>
						))}
					</div>
					<div className="relative min-h-[360px] flex-1 overflow-hidden rounded bg-gray-100 sm:min-h-[520px]">
						<img
							src={selectedImage || product.thumbnail}
							alt={product.title}
							className="h-full min-h-[360px] w-full object-contain sm:min-h-[520px]"
						/>
					</div>
				</div>

				<div className="flex flex-col">
					<div className="mb-1 flex items-center justify-between">
						<span className="text-sm uppercase tracking-wide text-gray-500">
							{product.brand || product.category}
						</span>
						<button
							type="button"
							onClick={toggleWishlist}
							aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
							aria-pressed={isWishlisted}
							className={`rounded p-2 transition hover:bg-gray-100 ${isWishlisted ? "text-red-600" : "text-gray-600 hover:text-black"}`}
						>
							<FiHeart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
						</button>
					</div>
					<h1 className="mb-2 text-2xl text-black lg:text-3xl">{product.title}</h1>
					<div className="mb-4 flex items-center gap-1" aria-label={`Rated ${rating.toFixed(1)} out of 5`}>
						{Array.from({ length: 5 }, (_, index) => (
							<AiFillStar key={index} className={`h-4 w-4 ${index < Math.round(rating) ? "text-amber-500" : "text-gray-300"}`} />
						))}
						<span className="ml-1 text-sm text-gray-500">
							{rating.toFixed(1)} ({reviews.length} reviews)
						</span>
					</div>
					<div className="mb-4 flex flex-wrap items-center gap-3">
						<span className="text-2xl text-black">${Number(product.price).toFixed(2)}</span>
						{discount > 0 && (
							<>
								<span className="text-gray-500 line-through">${originalPrice.toFixed(2)}</span>
								<span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-700">
									SAVE {discount.toFixed(0)}%
								</span>
							</>
						)}
					</div>
					<p className="mb-5 text-sm text-gray-600">{product.description}</p>

					<div className="mb-6">
						<div className="mb-2 flex justify-between text-sm text-gray-600">
							<span>{product.stock > 0 ? `${product.stock} item(s) in stock` : "Out of stock"}</span>
							<span>{product.availabilityStatus}</span>
						</div>
						<div className="h-1.5 overflow-hidden rounded-full bg-gray-200">
							<div
								className={`h-full rounded-full ${product.stock <= 10 ? "bg-red-500" : "bg-green-600"}`}
								style={{ width: `${Math.min(100, Math.max(0, product.stock))}%` }}
							/>
						</div>
					</div>

					{supportsVariants && (
						<div className="mb-5">
						<p className="mb-2 text-sm font-semibold">Size: <span className="font-normal">{selectedSize}</span></p>
						<div className="flex gap-2">
							{sizes.map((size) => (
								<button
									key={size}
									type="button"
									onClick={() => setSelectedSize(size)}
									aria-pressed={selectedSize === size}
									className={`h-10 w-11 rounded border text-sm transition ${
										selectedSize === size ? "border-black bg-black text-white" : "border-gray-300 bg-gray-50 hover:border-black"
									}`}
								>
									{size}
								</button>
							))}
						</div>
						</div>
					)}

					{supportsVariants && (
						<div className="mb-6">
						<p className="mb-2 text-sm font-semibold">Color: <span className="font-normal">{selectedColor}</span></p>
						<div className="flex gap-3">
							{colors.map((color) => (
								<button
									key={color.name}
									type="button"
									onClick={() => setSelectedColor(color.name)}
									aria-label={`Select ${color.name}`}
									aria-pressed={selectedColor === color.name}
									className={`h-7 w-7 rounded-full border ${color.className} ${
										selectedColor === color.name ? "ring-2 ring-black ring-offset-2" : "border-gray-300"
									}`}
								/>
							))}
						</div>
						</div>
					)}

					<div className="mb-6">
						<label className="mb-2 block text-sm font-semibold" htmlFor="product-quantity">Quantity</label>
						<div className="flex gap-3">
							<div className="flex w-32 items-center justify-between rounded border border-gray-300 px-3 py-2">
								<button type="button" onClick={() => changeQuantity(-1)} disabled={quantity <= 1} aria-label="Decrease quantity" className="text-gray-500 hover:text-black disabled:opacity-40">
									<FiMinus className="h-3.5 w-3.5" />
								</button>
								<input
									id="product-quantity"
									type="number"
									min="1"
									max={product.stock}
									value={quantity}
									onChange={(event) => {
										const nextQuantity = Number(event.target.value);
										if (Number.isInteger(nextQuantity) && nextQuantity >= 1) {
											setQuantity(Math.min(product.stock, nextQuantity));
										}
									}}
									className="w-10 appearance-none text-center text-sm font-medium outline-none"
								/>
								<button type="button" onClick={() => changeQuantity(1)} disabled={quantity >= product.stock} aria-label="Increase quantity" className="text-gray-500 hover:text-black disabled:opacity-40">
									<FiPlus className="h-3.5 w-3.5" />
								</button>
							</div>
							<button
								type="button"
								onClick={() =>
									onAddToCart({
										...product,
										quantity,
										...(supportsVariants && { selectedSize, selectedColor }),
									})
								}
								disabled={product.stock < 1}
								className="flex-1 rounded border border-black bg-black py-2.5 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
							>
								{product.stock > 0 ? "Add to cart" : "Out of stock"}
							</button>
						</div>
					</div>

					<div className="mb-6 flex flex-wrap items-center gap-5 border-y border-gray-200 py-4 text-sm text-gray-600">
						<button type="button" onClick={toggleCompare} aria-pressed={isCompared} className="flex items-center gap-1.5 hover:text-black">
							<AiOutlineSwap className="h-4 w-4" /> {isCompared ? "Remove compare" : "Compare"}
						</button>
						<a
							href={`mailto:?subject=${encodeURIComponent(`Question about ${product.title}`)}&body=${encodeURIComponent(`I have a question about ${product.title}: `)}`}
							className="flex items-center gap-1.5 hover:text-black"
						>
							<FiHelpCircle className="h-4 w-4" /> Ask a question
						</a>
						<button type="button" onClick={shareProduct} className="flex items-center gap-1.5 hover:text-black">
							<FiShare2 className="h-4 w-4" /> Share
						</button>
					</div>

					<div className="mb-6 space-y-3 text-sm text-gray-700">
						<div className="flex items-center gap-3"><FiTruck className="h-5 w-5 text-gray-500" /><span><strong>Shipping:</strong> {product.shippingInformation || "Standard delivery available"}</span></div>
						<div className="flex items-center gap-3"><FiRotateCcw className="h-5 w-5 text-gray-500" /><span><strong>Returns:</strong> {product.returnPolicy || "See store return policy"}</span></div>
					</div>

					<div className="rounded-md border border-gray-100 bg-gray-50 p-4 text-center">
						<div className="mb-2 flex justify-center gap-3 text-2xl text-gray-700">
							<FaCcVisa /><FaCcMastercard /><FaCcAmex /><FaCcJcb /><FaCcDiscover />
						</div>
						<p className="flex items-center justify-center gap-1 text-xs text-gray-500">
							<HiOutlineShieldCheck className="h-4 w-4" /> Guarantee safe & secure checkout
						</p>
					</div>
				</div>
			</div>

			<section className="mt-12 border-t border-gray-200 pt-8">
				<div className="mb-6 flex flex-wrap justify-center gap-6 border-b border-gray-200">
					{[
						["description", "Description"],
						["specifications", "Specifications"],
						["reviews", `Reviews (${reviews.length})`],
					].map(([tab, label]) => (
						<button
							key={tab}
							type="button"
							onClick={() => setActiveTab(tab)}
							aria-pressed={activeTab === tab}
							className={`border-b-2 px-2 pb-3 text-sm font-medium ${
								activeTab === tab ? "border-black text-black" : "border-transparent text-gray-500 hover:text-black"
							}`}
						>
							{label}
						</button>
					))}
				</div>
				{activeTab === "description" && <p className="mx-auto max-w-3xl text-center leading-7 text-gray-600">{product.description}</p>}
				{activeTab === "specifications" && (
					<dl className="mx-auto grid max-w-3xl grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
						{[
							["Category", product.category],
							["Brand", product.brand || "—"],
							["SKU", product.sku || "—"],
							["Availability", product.availabilityStatus || "—"],
							["Weight", product.weight ? `${product.weight} kg` : "—"],
							["Dimensions", product.dimensions ? `${product.dimensions.width} × ${product.dimensions.height} × ${product.dimensions.depth} cm` : "—"],
						].map(([label, value]) => (
							<div key={label} className="flex justify-between border-b border-gray-100 py-2 text-sm">
								<dt className="font-medium text-gray-700">{label}</dt>
								<dd className="text-right text-gray-500">{value}</dd>
							</div>
						))}
					</dl>
				)}
				{activeTab === "reviews" && (
					<div className="mx-auto max-w-3xl">
						{reviews.length ?
							<div className="space-y-4">
								{reviews.map((review, index) => (
									<article key={`${review.reviewerEmail}-${index}`} className="border-b border-gray-100 pb-4">
										<div className="mb-1 flex items-center justify-between gap-3">
											<h3 className="font-medium">{review.reviewerName || "Customer"}</h3>
											<span className="text-sm text-amber-600">{Number(review.rating).toFixed(1)} / 5</span>
										</div>
										<p className="text-sm text-gray-600">{review.comment}</p>
									</article>
								))}
							</div>
						:	<p className="text-center text-gray-500">No reviews yet.</p>}
					</div>
				)}
			</section>
		</div>
	);
};

export default ProductDetail;

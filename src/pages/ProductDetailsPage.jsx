import { useContext, useState } from "react";
import { Link } from "react-router";
import { FiMinus, FiPlus } from "react-icons/fi";
import Swal from "sweetalert2";
import ProductDetail from "../components/ProductDetail";
import { ThemeContext } from "../context/ThemeContextValue";

const ProductDetailsPage = () => {
	const { cart, setCart, giftWrap, setGiftWrap } = useContext(ThemeContext);
	const [isCartOpen, setIsCartOpen] = useState(false);

	const handleAddToCart = (product) => {
		const lineId = `${product.id}-${product.selectedSize}-${product.selectedColor}`;
		const currentItem = cart.find(
			(item) =>
				(item.lineId ?? `${item.id}-${item.selectedSize ?? ""}-${item.selectedColor ?? ""}`) === lineId,
		);
		const availableStock = Math.max(0, product.stock - (currentItem?.quantity ?? 0));

		if (availableStock === 0) {
			Swal.fire({
				title: "Stock limit reached",
				text: "The requested quantity is not available in stock.",
				icon: "info",
				confirmButtonText: "OK",
			});
			return;
		}

		const quantityToAdd = Math.min(product.quantity, availableStock);
		setCart((items) => {
			const index = items.findIndex(
				(item) =>
					(item.lineId ?? `${item.id}-${item.selectedSize ?? ""}-${item.selectedColor ?? ""}`) === lineId,
			);

			if (index === -1) {
				return [...items, { ...product, lineId, quantity: quantityToAdd }];
			}

			return items.map((item, itemIndex) =>
				itemIndex === index ?
					{ ...item, quantity: item.quantity + quantityToAdd }
				:	item,
			);
		});
		setIsCartOpen(true);
	};

	const updateCartQuantity = (lineId, delta) => {
		setCart((items) =>
			items.map((item) => {
				const itemLineId =
					item.lineId ?? `${item.id}-${item.selectedSize ?? ""}-${item.selectedColor ?? ""}`;
				if (itemLineId !== lineId) {
					return item;
				}
				return {
					...item,
					quantity: Math.min(item.stock ?? Infinity, Math.max(1, item.quantity + delta)),
				};
			}),
		);
	};

	const itemsSubtotal = cart.reduce(
		(total, item) => total + Number(item.price) * item.quantity,
		0,
	);
	const wrapCost = giftWrap && cart.length > 0 ? 10 : 0;

	return (
		<>
			<ProductDetail onAddToCart={handleAddToCart} />

			{isCartOpen && (
				<div
					className="fixed inset-0 z-50 flex justify-end bg-black/50"
					onMouseDown={(event) => {
						if (event.target === event.currentTarget) {
							setIsCartOpen(false);
						}
					}}
				>
					<aside
						role="dialog"
						aria-modal="true"
						aria-labelledby="cart-drawer-title"
						className="flex h-full w-full max-w-md flex-col bg-white p-6 shadow-2xl"
					>
						<div className="flex items-center justify-between border-b pb-4">
							<h2 id="cart-drawer-title" className="text-2xl font-bold text-gray-900">
								Shopping Cart ({cart.reduce((count, item) => count + item.quantity, 0)})
							</h2>
							<button
								type="button"
								onClick={() => setIsCartOpen(false)}
								aria-label="Close shopping cart"
								className="p-1 text-xl text-gray-500 hover:text-black"
							>
								×
							</button>
						</div>

						{cart.length > 0 && (
							<p className="border-b py-3 text-sm text-gray-700">
								{itemsSubtotal >= 75 ?
									"You qualify for free shipping."
								:	`Add $${(75 - itemsSubtotal).toFixed(2)} more for free shipping.`}
							</p>
						)}

						<div className="flex-1 space-y-5 overflow-y-auto py-4">
							{cart.length === 0 ?
								<p className="mt-16 text-center text-gray-500">Your cart is empty.</p>
							:	cart.map((item) => {
									const lineId =
										item.lineId ?? `${item.id}-${item.selectedSize ?? ""}-${item.selectedColor ?? ""}`;
									return (
										<div key={lineId} className="flex items-start gap-4 border-b pb-4">
											<img
												src={item.thumbnail ?? item.images?.[0]}
												alt={item.title}
												className="h-24 w-20 rounded border object-cover"
											/>
											<div className="min-w-0 flex-1">
												<h3 className="font-semibold text-gray-900">{item.title}</h3>
												{(item.selectedSize || item.selectedColor) && (
													<p className="mt-1 text-xs text-gray-500">
														{item.selectedColor && `Color: ${item.selectedColor}`}
														{item.selectedColor && item.selectedSize && " | "}
														{item.selectedSize && `Size: ${item.selectedSize}`}
													</p>
												)}
												<p className="mt-1 font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
												<div className="mt-2 flex w-24 items-center justify-between rounded border px-2 py-1">
													<button
														type="button"
														onClick={() => updateCartQuantity(lineId, -1)}
														disabled={item.quantity <= 1}
														aria-label={`Decrease ${item.title} quantity`}
														className="text-gray-500 hover:text-black disabled:opacity-40"
													>
														<FiMinus className="h-3 w-3" />
													</button>
													<span className="text-xs font-semibold">{item.quantity}</span>
													<button
														type="button"
														onClick={() => updateCartQuantity(lineId, 1)}
														disabled={item.quantity >= (item.stock ?? Infinity)}
														aria-label={`Increase ${item.title} quantity`}
														className="text-gray-500 hover:text-black disabled:opacity-40"
													>
														<FiPlus className="h-3 w-3" />
													</button>
												</div>
												<button
													type="button"
													onClick={() => setCart((items) => items.filter((cartItem) =>
														(cartItem.lineId ?? `${cartItem.id}-${cartItem.selectedSize ?? ""}-${cartItem.selectedColor ?? ""}`) !== lineId,
													))}
													className="mt-2 text-xs text-gray-500 underline hover:text-black"
												>
													Remove
												</button>
											</div>
										</div>
									);
								})
							}
						</div>

						<label className="flex items-center gap-3 border-y py-3 text-sm text-gray-700">
							<input
								type="checkbox"
								checked={giftWrap}
								onChange={(event) => setGiftWrap(event.target.checked)}
								disabled={cart.length === 0}
								className="h-4 w-4 accent-black"
							/>
							For <strong>$10.00</strong> please wrap the products
						</label>

						<div className="flex items-center justify-between py-4 text-lg">
							<span>Subtotal</span>
							<strong>${(itemsSubtotal + wrapCost).toFixed(2)}</strong>
						</div>
						<Link
							to="/cart"
							onClick={() => setIsCartOpen(false)}
							className="rounded-lg bg-black py-3 text-center text-sm font-semibold text-white transition hover:bg-gray-800"
						>
							View cart
						</Link>
					</aside>
				</div>
			)}
		</>
	);
};

export default ProductDetailsPage;

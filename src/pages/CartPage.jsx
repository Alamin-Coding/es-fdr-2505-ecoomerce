import { useContext } from "react";
import { Link } from "react-router";
import { ThemeContext } from "../context/ThemeContextValue";

const WRAP_PRICE = 10;

const formatPrice = (value) => `$${Number(value).toFixed(2)}`;

export default function CartPage() {
	const { cart, setCart, giftWrap, setGiftWrap } = useContext(ThemeContext);

	const updateQuantity = (lineId, delta) => {
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

	const subtotal = cart.reduce(
		(total, item) => total + Number(item.price) * item.quantity,
		0,
	);
	const total = subtotal + (giftWrap && cart.length > 0 ? WRAP_PRICE : 0);

	return (
		<div className="mx-auto w-full max-w-5xl bg-white px-4 py-10 text-black">
			<div className="mb-10 text-center">
				<h1 className="text-4xl font-medium">Shopping Cart</h1>
				<nav className="mt-3 flex items-center justify-center gap-2 text-xs">
					<Link to="/" className="hover:underline">Home</Link>
					<span className="text-gray-500">&rsaquo;</span>
					<span>Your Shopping Cart</span>
				</nav>
			</div>

			<div className="hidden grid-cols-12 border-b border-gray-300 pb-4 text-base md:grid">
				<div className="col-span-5">Product</div>
				<div className="col-span-2">Price</div>
				<div className="col-span-3">Quantity</div>
				<div className="col-span-2 text-right">Total</div>
			</div>

			{cart.length === 0 ?
				<div className="border-b border-gray-300 py-16 text-center">
					<p className="mb-5 text-gray-500">Your cart is empty.</p>
					<Link to="/shop" className="rounded bg-black px-5 py-3 text-sm text-white hover:bg-gray-800">
						Continue shopping
					</Link>
				</div>
			:	cart.map((item) => {
					const lineId =
						item.lineId ?? `${item.id}-${item.selectedSize ?? ""}-${item.selectedColor ?? ""}`;
					return (
						<div
							key={lineId}
							className="grid grid-cols-1 items-start gap-4 border-b border-gray-300 py-6 md:grid-cols-12 md:pb-10"
						>
							<div className="flex gap-4 md:col-span-5">
								<img
									src={item.thumbnail ?? item.images?.[0]}
									alt={item.title}
									className="h-32 w-24 shrink-0 bg-gray-100 object-cover"
								/>
								<div>
									<h2 className="max-w-[14rem] text-base leading-snug">{item.title}</h2>
									{(item.selectedColor || item.selectedSize) && (
										<p className="mt-3 text-sm text-gray-500">
											{item.selectedColor && `Color: ${item.selectedColor}`}
											{item.selectedColor && item.selectedSize && " | "}
											{item.selectedSize && `Size: ${item.selectedSize}`}
										</p>
									)}
									<button
										type="button"
										onClick={() => setCart((items) => items.filter((cartItem) =>
											(cartItem.lineId ?? `${cartItem.id}-${cartItem.selectedSize ?? ""}-${cartItem.selectedColor ?? ""}`) !== lineId,
										))}
										className="mt-3 text-sm text-gray-500 underline hover:text-black"
									>
										Remove
									</button>
								</div>
							</div>

							<div className="md:col-span-2">{formatPrice(item.price)}</div>
							<div className="md:col-span-3">
								<div className="inline-flex items-center rounded border border-gray-400 text-sm">
									<button
										type="button"
										onClick={() => updateQuantity(lineId, -1)}
										disabled={item.quantity <= 1}
										className="px-2 py-1 hover:bg-gray-100 disabled:opacity-40"
										aria-label={`Decrease ${item.title} quantity`}
									>
										-
									</button>
									<span className="w-10 text-center text-gray-700">{item.quantity}</span>
									<button
										type="button"
										onClick={() => updateQuantity(lineId, 1)}
										disabled={item.quantity >= (item.stock ?? Infinity)}
										className="px-2 py-1 hover:bg-gray-100 disabled:opacity-40"
										aria-label={`Increase ${item.title} quantity`}
									>
										+
									</button>
								</div>
							</div>
							<div className="md:col-span-2 md:text-right">{formatPrice(item.price * item.quantity)}</div>
						</div>
					);
				})
			}

			{cart.length > 0 && (
				<div className="mt-6 md:ml-auto md:w-7/12 lg:w-1/2">
					<label className="flex cursor-pointer items-center gap-3 border-b border-gray-300 pb-5">
						<input
							type="checkbox"
							checked={giftWrap}
							onChange={(event) => setGiftWrap(event.target.checked)}
							className="h-5 w-5 accent-black"
						/>
						<span className="text-sm text-gray-500">
							For <span className="text-black">{formatPrice(WRAP_PRICE)}</span> please wrap the products
						</span>
					</label>

					<div className="flex items-center justify-between py-5 text-base">
						<span>Subtotal</span>
						<span>{formatPrice(total)}</span>
					</div>
					<p className="mb-4 text-right text-xs text-gray-500">Shipping and taxes calculated at checkout.</p>
					<Link
						to="/checkout"
						className="block w-full rounded-lg bg-black py-4 text-center text-xs text-white transition hover:bg-gray-800"
					>
						Proceed to checkout
					</Link>
				</div>
			)}
		</div>
	);
}

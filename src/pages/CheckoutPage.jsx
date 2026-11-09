import { useContext, useMemo, useState } from "react";
import { Link } from "react-router";
import { ThemeContext } from "../context/ThemeContextValue";

/* ------------------------------------------------------------------ */
/* Dummy data (replace images / products later)                        */
/* ------------------------------------------------------------------ */
const SHIPPING_FEE = 40;
const GIFT_WRAP_FEE = 10;

const DISCOUNT_CODES = {
	FASCO10: { type: "percent", value: 10, label: "10% off" },
	FASCO20: { type: "percent", value: 20, label: "20% off" },
	SAVE15: { type: "fixed", value: 15, label: "$15 off" },
};

const COUNTRIES = [
	"Bangladesh",
	"United States",
	"United Kingdom",
	"Canada",
	"Australia",
	"Germany",
	"France",
	"India",
	"Japan",
	"Singapore",
	"United Arab Emirates",
];

const PAYMENT_METHODS = [
	{ value: "card", label: "Credit Card (Demo)" },
	{ value: "paypal", label: "PayPal (Demo)" },
	{ value: "cod", label: "Cash on Delivery (Demo)" },
];

const NEWSLETTER_IMG_LEFT =
	"https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=500&q=80";
const NEWSLETTER_IMG_RIGHT =
	"https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80";

const STORAGE_KEY = "fasco_checkout_saved";

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */
const money = (n) => `$${Number(n).toFixed(2)}`;
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const initialForm = {
	email: "",
	country: "",
	firstName: "",
	lastName: "",
	address: "",
	city: "",
	postal: "",
	saveDelivery: false,
	paymentMethod: "card",
	cardNumber: "",
	expiry: "",
	cvc: "",
	cardName: "",
};

const getInitialCheckoutState = () => {
	try {
		const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
		if (saved && typeof saved === "object" && !Array.isArray(saved)) {
			const savedFields = [
				"email",
				"country",
				"firstName",
				"lastName",
				"address",
				"city",
				"postal",
			];
			const deliveryInfo = Object.fromEntries(
				savedFields
					.filter((field) => typeof saved[field] === "string")
					.map((field) => [field, saved[field]]),
			);
			return {
				form: { ...initialForm, ...deliveryInfo, saveDelivery: true },
				warning: "",
			};
		}
		return { form: initialForm, warning: "" };
	} catch {
		return {
			form: initialForm,
			warning: "Saved checkout details could not be loaded from this browser.",
		};
	}
};

const luhnValid = (num) => {
	const digits = num.replace(/\D/g, "");
	if (digits.length < 13) return false;
	let sum = 0;
	let alt = false;
	for (let i = digits.length - 1; i >= 0; i--) {
		let d = parseInt(digits[i], 10);
		if (alt) {
			d *= 2;
			if (d > 9) d -= 9;
		}
		sum += d;
		alt = !alt;
	}
	return sum % 10 === 0;
};

const formatCardNumber = (v) =>
	v
		.replace(/\D/g, "")
		.slice(0, 16)
		.replace(/(.{4})/g, "$1 ")
		.trim();

const formatExpiry = (v) => {
	const d = v.replace(/\D/g, "").slice(0, 4);
	return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
};

const expiryValid = (v) => {
	const m = /^(\d{2})\/(\d{2})$/.exec(v);
	if (!m) return false;
	const month = parseInt(m[1], 10);
	const year = 2000 + parseInt(m[2], 10);
	if (month < 1 || month > 12) return false;
	const now = new Date();
	const endOfMonth = new Date(year, month, 0, 23, 59, 59);
	return endOfMonth >= now;
};

/* ------------------------------------------------------------------ */
/* Icons                                                               */
/* ------------------------------------------------------------------ */
const Svg = ({ children, className = "w-5 h-5" }) => (
	<svg
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="1.8"
		strokeLinecap="round"
		strokeLinejoin="round"
		className={className}
		aria-hidden="true"
	>
		{children}
	</svg>
);

const BagIcon = () => (
	<Svg>
		<path d="M5 8h14l-1 12H6L5 8Z" />
		<path d="M9 8V6a3 3 0 0 1 6 0v2" />
	</Svg>
);
const ChevronDown = ({ className = "w-4 h-4" }) => (
	<Svg className={className}>
		<path d="m6 9 6 6 6-6" />
	</Svg>
);
const LockIcon = () => (
	<svg
		viewBox="0 0 24 24"
		className="w-5 h-5 text-gray-500"
		fill="currentColor"
	>
		<path d="M17 9h-1V7a4 4 0 0 0-8 0v2H7a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2Zm-7-2a2 2 0 0 1 4 0v2h-4V7Z" />
	</svg>
);
const CheckIcon = () => (
	<Svg className="w-4 h-4">
		<path d="m5 12 5 5 9-10" />
	</Svg>
);

const CardBrand = ({ method }) => {
	if (method === "paypal")
		return (
			<span className="text-[13px] font-bold italic text-[#003087]">
				Pay<span className="text-[#009cde]">Pal</span>
			</span>
		);
	if (method === "cod") return <span className="text-lg">💵</span>;
	return (
		<span className="relative inline-block w-9 h-6 rounded bg-[#0b2a5b]">
			<span className="absolute left-1.5 top-1 w-4 h-4 rounded-full bg-[#eb001b]" />
			<span className="absolute left-3.5 top-1 w-4 h-4 rounded-full bg-[#f79e1b] opacity-90" />
		</span>
	);
};

/* ------------------------------------------------------------------ */
/* Reusable field                                                      */
/* ------------------------------------------------------------------ */
const Field = ({ error, className = "", children }) => (
	<div className={className}>
		{children}
		{error && <p className="mt-1 text-xs text-red-600">{error}</p>}
	</div>
);

const inputCls = (error) =>
	`w-full h-[58px] px-5 bg-white border text-[15px] font-[Poppins,sans-serif] text-gray-800 placeholder-gray-500 outline-none transition-colors focus:border-black ${
		error ? "border-red-500" : "border-gray-400"
	}`;

/* ------------------------------------------------------------------ */
/* Main component                                                      */
/* ------------------------------------------------------------------ */
export default function CheckoutPage() {
	const { cart, setCart, giftWrap, setGiftWrap } = useContext(ThemeContext);
	const [initialCheckout] = useState(getInitialCheckoutState);
	const [form, setForm] = useState(initialCheckout.form);
	const [storageWarning, setStorageWarning] = useState(initialCheckout.warning);
	const [errors, setErrors] = useState({});
	const [discountInput, setDiscountInput] = useState("");
	const [discount, setDiscount] = useState(null); // { code, ...def }
	const [discountMsg, setDiscountMsg] = useState(null); // { type, text }
	const [order, setOrder] = useState(null);

	const [newsletterEmail, setNewsletterEmail] = useState("");
	const [newsletterMsg, setNewsletterMsg] = useState(null);

	/* Totals */
	const subtotal = useMemo(
		() =>
			cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0),
		[cart],
	);
	const discountAmount = useMemo(() => {
		if (!discount) return 0;
		const raw =
			discount.type === "percent" ?
				(subtotal * discount.value) / 100
			:	discount.value;
		return Math.min(raw, subtotal);
	}, [discount, subtotal]);
	const shipping = cart.length ? SHIPPING_FEE : 0;
	const giftWrapCost = cart.length && giftWrap ? GIFT_WRAP_FEE : 0;
	const total = subtotal - discountAmount + shipping + giftWrapCost;
	const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

	/* Handlers */
	const setField = (name, value) => {
		setForm((f) => ({ ...f, [name]: value }));
		if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }));
	};
	const onChange = (e) => {
		const { name, value, type, checked } = e.target;
		setField(name, type === "checkbox" ? checked : value);
	};

	const getLineId = (item) =>
		item.lineId ??
		`${item.id}-${item.selectedSize ?? ""}-${item.selectedColor ?? ""}`;
	const changeQty = (lineId, delta) =>
		setCart((items) =>
			items.map((item) =>
				getLineId(item) === lineId ?
					{
						...item,
						quantity: Math.min(
							item.stock ?? Infinity,
							Math.max(1, item.quantity + delta),
						),
					}
				:	item,
			),
		);
	const removeItem = (lineId) =>
		setCart((items) => items.filter((item) => getLineId(item) !== lineId));

	const applyDiscount = () => {
		const code = discountInput.trim().toUpperCase();
		if (!code) {
			setDiscountMsg({ type: "error", text: "Enter a discount code." });
			return;
		}
		const def = DISCOUNT_CODES[code];
		if (!def) {
			setDiscount(null);
			setDiscountMsg({ type: "error", text: "Invalid discount code." });
			return;
		}
		setDiscount({ code, ...def });
		setDiscountMsg({
			type: "success",
			text: `${code} applied (${def.label}).`,
		});
	};
	const removeDiscount = () => {
		setDiscount(null);
		setDiscountInput("");
		setDiscountMsg(null);
	};

	const validate = () => {
		const e = {};
		if (!form.email.trim()) e.email = "Email is required.";
		else if (!emailRe.test(form.email)) e.email = "Enter a valid email.";
		if (!form.country) e.country = "Select a country.";
		if (!form.firstName.trim()) e.firstName = "First name is required.";
		if (!form.lastName.trim()) e.lastName = "Last name is required.";
		if (!form.address.trim()) e.address = "Address is required.";
		if (!form.city.trim()) e.city = "City is required.";
		if (!form.postal.trim()) e.postal = "Postal code is required.";

		if (form.paymentMethod === "card") {
			if (!luhnValid(form.cardNumber))
				e.cardNumber = "Enter a valid card number.";
			if (!expiryValid(form.expiry)) e.expiry = "Use a valid MM/YY.";
			if (!/^\d{3,4}$/.test(form.cvc)) e.cvc = "3–4 digit code.";
			if (!form.cardName.trim()) e.cardName = "Card holder name is required.";
		}
		return e;
	};

	const handleSubmit = (ev) => {
		ev.preventDefault();
		if (!cart.length) return;
		const e = validate();
		setErrors(e);
		if (Object.keys(e).length) {
			const first = document.querySelector("[data-error='true']");
			first?.scrollIntoView({ behavior: "smooth", block: "center" });
			return;
		}

		setStorageWarning("");
		try {
			if (form.saveDelivery) {
				const { email, country, firstName, lastName, address, city, postal } =
					form;
				localStorage.setItem(
					STORAGE_KEY,
					JSON.stringify({
						email,
						country,
						firstName,
						lastName,
						address,
						city,
						postal,
					}),
				);
			} else {
				localStorage.removeItem(STORAGE_KEY);
			}
		} catch (storageError) {
			console.error("Unable to save checkout details.", storageError);
			setStorageWarning(
				"Your order can continue, but saved checkout details could not be updated.",
			);
		}

		setOrder({
			id: `FS-${Math.floor(100000 + Math.random() * 900000)}`,
			total,
			email: form.email,
			paymentMethod: form.paymentMethod,
		});
		setForm((current) => ({
			...current,
			cardNumber: "",
			expiry: "",
			cvc: "",
			cardName: "",
		}));
		setCart([]);
		setGiftWrap(false);
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const subscribe = (ev) => {
		ev.preventDefault();
		if (!emailRe.test(newsletterEmail)) {
			setNewsletterMsg({ type: "error", text: "Please enter a valid email." });
			return;
		}
		// TODO: call newsletter API
		setNewsletterMsg({ type: "success", text: "Thanks for subscribing!" });
		setNewsletterEmail("");
	};

	const errProps = (name) => ({
		"data-error": errors[name] ? "true" : "false",
	});

	/* ---------------------------------------------------------------- */
	return (
		<div className="dark:bg-slate-600 dark:text-slate-50 min-h-screen bg-white text-gray-900 font-[Poppins,sans-serif]">
			{/* ---------------- Header ---------------- */}
			<header className="max-w-[1200px] mx-auto px-5 pt-12 pb-6 flex items-center justify-between">
				<Link
					to="/"
					className="font-[Georgia,serif] text-[44px] leading-none tracking-wide text-gray-700"
				>
					FASCO
				</Link>
				<nav className="hidden md:flex items-center gap-12 text-[15px] text-gray-800">
					<Link to="/" className="hover:text-black">
						Home
					</Link>
					<Link to="/shop" className="hover:text-black">
						Shop
					</Link>
				</nav>
				<div className="flex items-center gap-6 text-gray-800">
					<Link to="/cart" aria-label="Cart" className="relative">
						<BagIcon />
						{cartCount > 0 && (
							<span className="absolute -top-3 -right-3 w-5 h-5 rounded-full bg-red-600 text-white text-[11px] flex items-center justify-center">
								{cartCount}
							</span>
						)}
					</Link>
				</div>
			</header>

			<h1 className="text-center font-[Georgia,serif] text-[38px] md:text-[44px] py-8">
				Checkout
			</h1>
			<p className="mx-auto max-w-[1200px] px-5 pb-5 text-sm text-gray-600">
				Demo checkout only. No payment will be collected or order sent to a
				store.
			</p>
			<div className="border-t border-gray-400" />

			{/* ---------------- Success state ---------------- */}
			{order ?
				<main className="max-w-[640px] mx-auto px-5 py-24 text-center">
					<div className="mx-auto w-16 h-16 rounded-full bg-black text-white flex items-center justify-center mb-6">
						<Svg className="w-8 h-8">
							<path d="m5 12 5 5 9-10" />
						</Svg>
					</div>
					<h2 className="font-[Georgia,serif] text-4xl mb-3">
						Thank you for your order!
					</h2>
					<p className="text-gray-600 mb-1">
						Order <strong>{order.id}</strong> has been placed.
					</p>
					<p className="text-gray-600 mb-2">
						Demo order total: {money(order.total)}. No payment was collected.
					</p>
					{storageWarning && (
						<p role="status" className="mb-2 text-sm text-amber-700">
							{storageWarning}
						</p>
					)}
					<p className="text-gray-600 mb-8">
						Order confirmation details are shown here for {order.email}.
					</p>
					<Link
						to="/shop"
						className="inline-block bg-black text-white px-10 py-4 rounded-lg"
					>
						Continue Shopping
					</Link>
				</main>
			:	/* ---------------- Checkout ---------------- */
				<div className="grid lg:grid-cols-2">
					{/* LEFT: form */}
					<form
						onSubmit={handleSubmit}
						noValidate
						className="lg:border-r lg:border-gray-400 px-5 lg:pl-[max(20px,calc((100vw-1200px)/2+20px))] lg:pr-[60px] py-16"
					>
						{/* Contact */}
						<div className="flex items-end justify-between mb-8">
							<h2 className="font-[Georgia,serif] text-[38px] text-gray-700">
								Contact
							</h2>
							<p className="text-sm">
								Have an account?{" "}
								<Link to="/login" className="text-blue-600 hover:underline">
									Create Account
								</Link>
							</p>
						</div>
						<Field error={errors.email}>
							<input
								{...errProps("email")}
								type="email"
								name="email"
								autoComplete="email"
								placeholder="Email Address"
								value={form.email}
								onChange={onChange}
								className={inputCls(errors.email)}
							/>
						</Field>

						{/* Delivery */}
						<h2 className="font-[Georgia,serif] text-[38px] text-gray-700 mt-16 mb-8">
							Delivery
						</h2>
						<div className="space-y-3">
							<Field error={errors.country}>
								<div className="relative">
									<select
										{...errProps("country")}
										name="country"
										autoComplete="country-name"
										value={form.country}
										onChange={onChange}
										className={`${inputCls(errors.country)} appearance-none pr-12 ${
											form.country ? "" : "text-gray-500"
										}`}
									>
										<option value="" disabled>
											Country / Region
										</option>
										{COUNTRIES.map((c) => (
											<option key={c} value={c} className="text-gray-800">
												{c}
											</option>
										))}
									</select>
									<span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2">
										<ChevronDown />
									</span>
								</div>
							</Field>

							<div className="grid grid-cols-2 gap-3">
								<Field error={errors.firstName}>
									<input
										{...errProps("firstName")}
										name="firstName"
										autoComplete="given-name"
										placeholder="First Name"
										value={form.firstName}
										onChange={onChange}
										className={inputCls(errors.firstName)}
									/>
								</Field>
								<Field error={errors.lastName}>
									<input
										{...errProps("lastName")}
										name="lastName"
										autoComplete="family-name"
										placeholder="Last Name"
										value={form.lastName}
										onChange={onChange}
										className={inputCls(errors.lastName)}
									/>
								</Field>
							</div>

							<Field error={errors.address}>
								<input
									{...errProps("address")}
									name="address"
									autoComplete="street-address"
									placeholder="Address"
									value={form.address}
									onChange={onChange}
									className={inputCls(errors.address)}
								/>
							</Field>

							<div className="grid grid-cols-2 gap-3">
								<Field error={errors.city}>
									<input
										{...errProps("city")}
										name="city"
										autoComplete="address-level2"
										placeholder="City"
										value={form.city}
										onChange={onChange}
										className={inputCls(errors.city)}
									/>
								</Field>
								<Field error={errors.postal}>
									<input
										{...errProps("postal")}
										name="postal"
										autoComplete="postal-code"
										placeholder="Postal Code"
										value={form.postal}
										onChange={onChange}
										className={inputCls(errors.postal)}
									/>
								</Field>
							</div>
						</div>

						<label className="mt-6 flex items-center gap-3 cursor-pointer select-none text-[15px] text-gray-600">
							<input
								type="checkbox"
								name="saveDelivery"
								checked={form.saveDelivery}
								onChange={onChange}
								className="peer sr-only"
							/>
							<span className="w-[26px] h-[26px] border-2 border-black bg-white flex items-center justify-center peer-checked:bg-black text-white peer-focus-visible:ring-2 ring-offset-2 ring-black">
								{form.saveDelivery && <CheckIcon />}
							</span>
							Save This Info For Future
						</label>

						{/* Payment */}
						<h2 className="font-[Georgia,serif] text-[38px] text-gray-700 mt-16 mb-8">
							Payment
						</h2>
						<div className="relative">
							<select
								name="paymentMethod"
								value={form.paymentMethod}
								onChange={onChange}
								className="w-full h-[58px] pl-5 pr-24 bg-white border border-gray-400 text-[15px] appearance-none outline-none focus:border-black"
							>
								{PAYMENT_METHODS.map((m) => (
									<option key={m.value} value={m.value}>
										{m.label}
									</option>
								))}
							</select>
							<span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 flex items-center gap-3">
								<CardBrand method={form.paymentMethod} />
								<ChevronDown />
							</span>
						</div>

						{form.paymentMethod === "card" && (
							<div className="bg-[#f4f4f4] p-5 space-y-2">
								<Field error={errors.cardNumber}>
									<div className="relative">
										<input
											{...errProps("cardNumber")}
											name="cardNumber"
											inputMode="numeric"
											autoComplete="cc-number"
											placeholder="Demo card number (test only)"
											value={form.cardNumber}
											onChange={(e) =>
												setField("cardNumber", formatCardNumber(e.target.value))
											}
											className={`${inputCls(errors.cardNumber)} !h-[54px] pr-12`}
										/>
										<span className="absolute right-5 top-1/2 -translate-y-1/2">
											<LockIcon />
										</span>
									</div>
								</Field>
								<p className="text-xs text-gray-600">
									Demo only: do not enter real payment details. Card information
									is not transmitted or saved.
								</p>

								<div className="grid grid-cols-2 gap-2">
									<Field error={errors.expiry}>
										<input
											{...errProps("expiry")}
											name="expiry"
											inputMode="numeric"
											autoComplete="cc-exp"
											placeholder="Expiration Date (MM/YY)"
											value={form.expiry}
											onChange={(e) =>
												setField("expiry", formatExpiry(e.target.value))
											}
											className={`${inputCls(errors.expiry)} !h-[54px]`}
										/>
									</Field>
									<Field error={errors.cvc}>
										<input
											{...errProps("cvc")}
											name="cvc"
											inputMode="numeric"
											autoComplete="cc-csc"
											placeholder="Security Code"
											value={form.cvc}
											onChange={(e) =>
												setField(
													"cvc",
													e.target.value.replace(/\D/g, "").slice(0, 4),
												)
											}
											className={`${inputCls(errors.cvc)} !h-[54px]`}
										/>
									</Field>
								</div>

								<Field error={errors.cardName}>
									<input
										{...errProps("cardName")}
										name="cardName"
										autoComplete="cc-name"
										placeholder="Card Holder Name"
										value={form.cardName}
										onChange={onChange}
										className={`${inputCls(errors.cardName)} !h-[54px]`}
									/>
								</Field>
							</div>
						)}

						{form.paymentMethod === "paypal" && (
							<p className="bg-[#f4f4f4] p-5 text-sm text-gray-600">
								PayPal is a demo option here; payment provider integration is
								not configured.
							</p>
						)}
						{form.paymentMethod === "cod" && (
							<p className="bg-[#f4f4f4] p-5 text-sm text-gray-600">
								Cash on delivery is shown for demonstration; no order will be
								sent to a store.
							</p>
						)}

						<button
							type="submit"
							disabled={!cart.length}
							className="mt-6 w-full h-[62px] rounded-lg bg-black text-white text-[15px] shadow-[0_15px_25px_rgba(0,0,0,0.2)] hover:bg-gray-900 disabled:opacity-60 disabled:cursor-not-allowed transition"
						>
							Place Demo Order
						</button>
						{storageWarning && (
							<p
								role="status"
								className="mt-3 text-center text-sm text-amber-700"
							>
								{storageWarning}
							</p>
						)}

						<p className="mt-8 text-center text-xs">
							Copyright © 2022 FASCO . All Rights Reseved.
						</p>
					</form>

					{/* RIGHT: summary */}
					<aside className="px-5 lg:pr-[max(20px,calc((100vw-1200px)/2+20px))] lg:pl-[60px] py-16 lg:py-[0px]">
						<div className="bg-[#f4f4f4] lg:mt-5 p-8 lg:px-[85px] lg:py-[50px] min-h-[200px] lg:sticky lg:top-4">
							{cart.length === 0 && (
								<div className="py-10 text-center text-gray-600">
									<p className="mb-4">Your cart is empty.</p>
									<Link to="/shop" className="text-black underline">
										Continue shopping
									</Link>
								</div>
							)}

							{cart.map((item) => {
								const lineId = getLineId(item);
								return (
									<div key={lineId} className="flex gap-5 mb-6">
										<div className="relative shrink-0">
											<img
												src={item.thumbnail ?? item.images?.[0]}
												alt={item.title}
												className="w-[112px] h-[112px] object-cover"
											/>
											<span className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-red-600 text-white text-xs flex items-center justify-center">
												{item.quantity}
											</span>
										</div>
										<div className="flex-1">
											<h3 className="font-[Georgia,serif] text-[17px] mb-1">
												{item.title}
											</h3>
											<div className="flex justify-between text-sm text-gray-700">
												<span>
													{[item.selectedColor, item.selectedSize]
														.filter(Boolean)
														.join(" / ")}
												</span>
												<span>{money(item.price * item.quantity)}</span>
											</div>
											<div className="mt-3 flex items-center gap-3 text-sm">
												<div className="inline-flex items-center border border-gray-400 bg-white">
													<button
														type="button"
														aria-label={`Decrease ${item.title} quantity`}
														disabled={item.quantity <= 1}
														onClick={() => changeQty(lineId, -1)}
														className="w-7 h-7 hover:bg-gray-100"
													>
														−
													</button>
													<span className="w-8 text-center">
														{item.quantity}
													</span>
													<button
														type="button"
														aria-label={`Increase ${item.title} quantity`}
														disabled={item.quantity >= (item.stock ?? Infinity)}
														onClick={() => changeQty(lineId, 1)}
														className="w-7 h-7 hover:bg-gray-100 disabled:opacity-40"
													>
														+
													</button>
												</div>
												<button
													type="button"
													onClick={() => removeItem(lineId)}
													className="text-gray-500 underline hover:text-black"
												>
													Remove
												</button>
											</div>
										</div>
									</div>
								);
							})}

							{cart.length > 0 && (
								<label className="mb-6 flex cursor-pointer items-center gap-3 text-sm text-gray-700">
									<input
										type="checkbox"
										checked={giftWrap}
										onChange={(event) => setGiftWrap(event.target.checked)}
										className="h-4 w-4 accent-black"
									/>
									Add gift wrap ({money(GIFT_WRAP_FEE)})
								</label>
							)}

							{/* Discount */}
							<div className="flex gap-3 items-stretch">
								<input
									value={discountInput}
									disabled={!cart.length}
									onChange={(e) => setDiscountInput(e.target.value)}
									onKeyDown={(e) => {
										if (e.key === "Enter") {
											e.preventDefault();
											applyDiscount();
										}
									}}
									placeholder="Discount code"
									className="flex-1 h-[58px] px-6 bg-white text-[15px] outline-none placeholder-gray-700 focus:ring-1 ring-black min-w-0"
								/>
								<button
									type="button"
									onClick={applyDiscount}
									disabled={!cart.length}
									className="w-[130px] h-[58px] rounded-lg bg-black text-white text-[15px] shadow-[0_10px_20px_rgba(0,0,0,0.25)] hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
								>
									Apply
								</button>
							</div>
							{discountMsg && (
								<p
									className={`mt-2 text-xs ${
										discountMsg.type === "error" ?
											"text-red-600"
										:	"text-green-700"
									}`}
								>
									{discountMsg.text}{" "}
									{discountMsg.type === "success" && (
										<button
											type="button"
											onClick={removeDiscount}
											className="underline"
										>
											Remove
										</button>
									)}
								</p>
							)}
							<p className="mt-1 text-[11px] text-gray-400">
								Try: FASCO10, FASCO20, SAVE15
							</p>

							{/* Totals */}
							<dl className="mt-8 space-y-4 text-[15px] text-gray-800">
								<div className="flex justify-between">
									<dt>Subtotal</dt>
									<dd>{money(subtotal)}</dd>
								</div>
								{giftWrapCost > 0 && (
									<div className="flex justify-between">
										<dt>Gift wrap</dt>
										<dd>{money(giftWrapCost)}</dd>
									</div>
								)}
								{discountAmount > 0 && (
									<div className="flex justify-between text-green-700">
										<dt>Discount ({discount.code})</dt>
										<dd>−{money(discountAmount)}</dd>
									</div>
								)}
								<div className="flex justify-between">
									<dt>Shipping</dt>
									<dd>
										{shipping ?
											`${money(shipping)} (flat rate)`
										:	money(shipping)}
									</dd>
								</div>
								<div className="flex justify-between text-black font-medium">
									<dt>Total</dt>
									<dd>{money(total)}</dd>
								</div>
							</dl>
						</div>
					</aside>
				</div>
			}

			<div className="border-t border-gray-400" />

			{/* ---------------- Newsletter ---------------- */}
			<section className="relative max-w-[1300px] mx-auto px-5 py-16 min-h-[640px] flex items-center justify-center overflow-hidden">
				<img
					src={NEWSLETTER_IMG_LEFT}
					alt=""
					className="hidden lg:block absolute left-0 bottom-0 h-[560px] w-[320px] object-cover object-top"
				/>
				<img
					src={NEWSLETTER_IMG_RIGHT}
					alt=""
					className="hidden lg:block absolute right-0 bottom-0 h-[560px] w-[320px] object-cover object-top"
				/>
				<form
					onSubmit={subscribe}
					className="relative max-w-[520px] w-full text-center"
				>
					<h2 className="font-[Georgia,serif] text-[38px] md:text-[44px] text-gray-700">
						Subscribe To Our Newsletter
					</h2>
					<p className="mt-6 text-[15px] text-gray-500 leading-7">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque
						duis ultrices sollicitudin aliquam sem. Scelerisque duis ultrices
						sollicitudin
					</p>
					<input
						type="email"
						value={newsletterEmail}
						onChange={(e) => {
							setNewsletterEmail(e.target.value);
							setNewsletterMsg(null);
						}}
						placeholder="michael@ymail.com"
						className="mt-8 w-full h-[68px] px-6 text-xl text-gray-600 bg-white shadow-[0_20px_40px_rgba(0,0,0,0.08)] outline-none placeholder-gray-500"
					/>
					{newsletterMsg && (
						<p
							className={`mt-2 text-sm ${newsletterMsg.type === "error" ? "text-red-600" : "text-green-700"}`}
						>
							{newsletterMsg.text}
						</p>
					)}
					<button
						type="submit"
						className="mt-8 h-[58px] px-10 rounded-lg bg-black text-white text-[15px] shadow-[0_15px_25px_rgba(0,0,0,0.25)] hover:bg-gray-900"
					>
						Subscribe Now
					</button>
				</form>
			</section>
		</div>
	);
}

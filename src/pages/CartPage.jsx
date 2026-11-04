import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";

const INITIAL_ITEM = {
  id: 1,
  name: "Mini Dress With Ruffled Straps",
  color: "Red",
  price: 14.9,
  quantity: 1,
  image:
    "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=400&q=80",
};

const WRAP_PRICE = 10;

const formatPrice = (value) => `$${value}`;

export default function CartPage() {
  const [items, setItems] = useState([INITIAL_ITEM]);
  const [wrap, setWrap] = useState(false);

  const {cart} = useContext(ThemeContext)
  console.log(cart)

  const updateQuantity = (id, delta) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal =
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0) +
    (wrap && items.length > 0 ? WRAP_PRICE : 0);

  return (
    <div className="mx-auto w-full max-w-5xl bg-white px-4 py-10 font-sans text-black">
      {/* Heading + breadcrumb */}
      <div className="mb-10 text-center">
        <h1 className="font-serif text-4xl font-medium">Shopping Cart</h1>
        <nav className="mt-3 flex items-center justify-center gap-2 text-xs">
          <a href="/" className="hover:underline">
            Home
          </a>
          <span className="text-gray-500">&rsaquo;</span>
          <span>Your Shopping Cart</span>
        </nav>
      </div>

      {/* Table header */}
      <div className="hidden grid-cols-12 border-b border-gray-300 pb-4 font-serif text-base md:grid">
        <div className="col-span-5">Product</div>
        <div className="col-span-2">Price</div>
        <div className="col-span-3">Quantity</div>
        <div className="col-span-2 text-right">Total</div>
      </div>

      {/* Items */}
      {cart.length === 0 ? (
        <p className="border-b border-gray-300 py-16 text-center text-gray-500">
          Your cart is empty.
        </p>
      ) : (
        cart?.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-1 items-start gap-4 border-b border-gray-300 py-6 md:grid-cols-12 md:pb-16"
          >
            {/* Product */}
            <div className="flex gap-4 md:col-span-5">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="h-32 w-24 flex-shrink-0 bg-gray-200 object-cover"
              />
              <div>
                <h2 className="max-w-[10rem] font-serif text-base leading-snug">
                  {item.title}
                </h2>
                <p className="mt-4 text-sm text-gray-500">
                  Color : red
                </p>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="mt-4 text-sm text-gray-500 underline hover:text-black"
                >
                  Remove
                </button>
              </div>
            </div>

            {/* Price */}
            <div className="font-serif text-base md:col-span-2">
              {formatPrice(item.price)}
            </div>

            {/* Quantity */}
            <div className="md:col-span-3">
              <div className="inline-flex items-center rounded border border-gray-400 text-sm">
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, -1)}
                  className="px-2 py-1 hover:bg-gray-100"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="w-10 text-center text-gray-500">
                  {String(item.quantity).padStart(2, "0")}
                </span>
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, 1)}
                  className="px-2 py-1 hover:bg-gray-100"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            {/* Total */}
            <div className="font-serif text-base md:col-span-2 md:text-right">
              {formatPrice(item.price * item.quantity)}
            </div>
          </div>
        ))
      )}

      {/* Summary */}
      <div className="mt-6 md:ml-auto md:w-7/12 lg:w-1/2">
        <label className="flex cursor-pointer items-center gap-3 border-b border-gray-300 pb-5">
          <input
            type="checkbox"
            checked={wrap}
            onChange={(e) => setWrap(e.target.checked)}
            className="h-5 w-5 cursor-pointer appearance-none border-2 border-black bg-white checked:bg-black"
          />
          <span className="text-sm text-gray-500">
            For <span className="text-black">{formatPrice(WRAP_PRICE)}</span>{" "}
            Please Wrap The Product
          </span>
        </label>

        <div className="flex items-center justify-between py-5 font-serif text-base">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>

        <button
          type="button"
          className="w-full rounded-lg bg-black py-4 text-xs text-white shadow-xl transition hover:bg-gray-800"
        >
          Checkout
        </button>

        <div className="mt-4 text-center">
          <a href="/cart" className="font-serif text-sm underline">
            View Cart
          </a>
        </div>
      </div>
    </div>
  );
}
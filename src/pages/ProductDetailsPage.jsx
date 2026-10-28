import React, { useState } from "react";

import { FiMinus, FiPlus } from "react-icons/fi";
import ProductDetail from "../components/ProductDetail";

const ProductDetailsPage = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [isWrapped, setIsWrapped] = useState(false);

    // 🛒 Add to cart হ্যান্ডলার
    const handleAddToCart = (product) => {
        setCartItems((prevItems) => {
            // যদি একই প্রোডাক্ট আগে থেকেই থাকে, তবে কোয়ান্টিটি বাড়াবে
            const existingIndex = prevItems.findIndex(
                (item) => item.size === product.size && item.color === product.color
            );
            if (existingIndex > -1) {
                const newItems = [...prevItems];
                newItems[existingIndex].quantity += product.quantity;
                return newItems;
            }
            return [...prevItems, product];
        });
        setIsCartOpen(true); // 🚀 সাইডবার ওপেন হবে
    };

    // কার্টের ভেতরে কোয়ান্টিটি বাড়ানোর বা কমানোর হ্যান্ডলার
    const handleItemQuantity = (index, type) => {
        setCartItems((prevItems) => {
            const newItems = [...prevItems];
            if (type === "increase") {
                newItems[index].quantity += 1;
            } else if (type === "decrease" && newItems[index].quantity > 1) {
                newItems[index].quantity -= 1;
            }
            return newItems;
        });
    };

    // সাবটোটাল ক্যালকুলেশন (গিফট র‍্যাপ সহ যদি সিলেক্ট থাকে)
    const itemsSubtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const wrapCost = isWrapped ? 10.00 : 0.00;
    const totalAmount = itemsSubtotal - wrapCost;

    return (
        <>
        <ProductDetail onAddToCart={handleAddToCart} />

            {/* 🛒 Minichart Sidebar Drawer (Matched with design) */}
            {isCartOpen && (
                <div className="fixed inset-0 z-50 flex justify-end bg-black/50 transition-opacity">
                    <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col p-6 relative animate-slide-left font-sans">
                        
                        {/* Header: Shopping Cart & Close Button */}
                        <div className="flex justify-between items-center pb-4 border-b">
                            <h2 className="text-2xl font-serif font-bold text-gray-900 font-volkhov">Shopping Cart</h2>
                            <button 
                                onClick={() => setIsCartOpen(false)}
                                className="text-gray-400 hover:text-black text-xl cursor-pointer p-1"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Free Shipping Banner Text */}
                        <div className="py-3 text-sm text-gray-800 border-b font-poppins">
                            Buy <span className="font-bold">$122.35</span> More And Get <span className="font-bold">Free Shipping</span>
                        </div>
                        
                        {/* Cart Product List */}
                        <div className="flex-1 overflow-y-auto py-4 space-y-6">
                            {cartItems.length === 0 ? (
                                <p className="text-gray-500 text-center mt-20 font-poppins">Your cart is empty</p>
                            ) : (
                                cartItems.map((item, index) => (
                                    <div key={index} className="flex gap-4 pb-4 border-b items-start">
                                        <img src={item.image} alt={item.title} className="w-20 h-24 object-cover rounded-md border" />
                                        <div className="flex-1">
                                            <div className="flex justify-between">
                                                <h4 className="font-semibold text-gray-900 font-volkhov">{item.title}</h4>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-0.5 font-poppins">Color : {item.color} | Size : {item.size}</p>
                                            <p className="font-bold text-gray-900 mt-1 font-volkhov">${(item.price * item.quantity).toFixed(2)}</p>

                                            {/* Quantity Counter Inside Cart */}
                                            <div className="flex items-center border border-gray-200 rounded bg-gray-50 w-24 justify-between px-2 py-1 mt-2">
                                                <button 
                                                    onClick={() => handleItemQuantity(index, "decrease")}
                                                    className="text-gray-500 hover:text-black cursor-pointer"
                                                >
                                                    <FiMinus className="w-3 h-3" />
                                                </button>
                                                <span className="text-xs font-semibold">{item.quantity < 10 ? `0${item.quantity}` : item.quantity}</span>
                                                <button 
                                                    onClick={() => handleItemQuantity(index, "increase")}
                                                    className="text-gray-500 hover:text-black cursor-pointer"
                                                >
                                                    <FiPlus className="w-3 h-3" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Gift Wrap Checkbox Option */}
                        <div className="py-3 border-t border-b flex items-center gap-3 text-sm font-poppins">
                            <input 
                                type="checkbox" 
                                id="giftWrap" 
                                checked={isWrapped}
                                onChange={(e) => setIsWrapped(e.target.checked)}
                                className="w-4 h-4 accent-black cursor-pointer" 
                            />
                            <label htmlFor="giftWrap" className="text-gray-700 cursor-pointer text-xs sm:text-sm">
                                For <span className="font-semibold text-black">$10.00</span> Please Wrap The Product
                            </label>
                        </div>

                        {/* Subtotal Section */}
                        <div className="py-4 flex justify-between items-center font-volkhov">
                            <span className="text-lg font-medium text-gray-800">Subtotal</span>
                            <span className="text-lg font-bold text-gray-900">${totalAmount.toFixed(2)}</span>
                        </div>

                        {/* Checkout & View Cart Buttons */}
                        <div className="space-y-2 pt-2">
                            <button className="w-full bg-black text-white py-3 rounded-[10px] font-semibold hover:bg-gray-800 transition shadow-[0_10px_20px_rgba(0,0,0,0.15)] cursor-pointer font-poppins text-sm">
                                Checkout
                            </button>
                            <button 
                                onClick={() => setIsCartOpen(false)}
                                className="w-full text-center text-sm font-semibold text-black py-2 hover:underline cursor-pointer font-poppins"
                            >
                                View Cart
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </>
    );
};

export default ProductDetailsPage;
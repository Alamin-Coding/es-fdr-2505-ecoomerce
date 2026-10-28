import React, { useState } from "react";
import {
  FiHeart,
  FiEye,
  FiShare2,
  FiTruck,
  FiRotateCcw,
  FiHelpCircle,
  FiMinus,
  FiPlus,
} from "react-icons/fi";
import { AiOutlineSwap, AiFillStar, AiOutlineStar } from "react-icons/ai";
import { HiOutlineShieldCheck } from "react-icons/hi";
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcDiscover,
  FaCcJcb,
} from "react-icons/fa";

import product1 from "../../image/product-2.jpg";
import product2 from "../../image/product-1.jpg";
import product3 from "../../image/product-3.jpg";
import product4 from "../../image/product-4.jpg";
import product5 from "../../image/product-5.jpg";
import product6 from "../../image/product-6.jpg";
import product7 from "../../image/product-7.jpg";

const ProductDetail = ({ onAddToCart }) => {
  // লোকাল ইম্পোর্ট করা ইমেজের অ্যারে
  const images = [
    product1,
    product2,
    product3,
    product4,
    product5,
    product6,
    product7,
  ];

  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("Blue");
  const [quantity, setQuantity] = useState(1);

  const sizes = ["M", "L", "XL", "XXL"];
  const colors = [
    { name: "Blue", class: "bg-sky-300" },
    { name: "Black", class: "bg-black" },
    { name: "Pink", class: "bg-pink-200" },
  ];

  const handleQuantityChange = (type) => {
    if (type === "decrease" && quantity > 1) {
      setQuantity(quantity - 1);
    } else if (type === "increase") {
      setQuantity(quantity + 1);
    }
  };

  // 🛒 Add to Cart & Open Sidebar Handler
  const handleAddToCart = () => {
    const itemData = {
      id: "denim-jacket-1",
      title: "Denim Jacket",
      price: 39.0,
      image: selectedImage, // বর্তমানে সিলেক্ট থাকা ছবি
      size: selectedSize,
      color: selectedColor,
      quantity: quantity,
    };

    // যদি প্যারেন্ট কম্পোনেন্ট বা Context থেকে ফাংশন পাঠানো থাকে
    if (onAddToCart) {
      onAddToCart(itemData);
    } else {
      console.log("Item added to cart:", itemData);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 font-sans text-gray-800">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Column: Image Gallery */}
        <div className="flex gap-4">
          {/* Thumbnails */}
          <div className="flex flex-col gap-3">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(img)}
                className={`w-16 h-20 border rounded overflow-hidden transition-all cursor-pointer ${
                  selectedImage === img
                    ? "border-black border-2"
                    : "border-gray-200 opacity-70 hover:opacity-100"
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1 bg-gray-100 rounded-md overflow-hidden relative">
            <img
              src={selectedImage}
              alt="Denim Jacket"
              className="w-full h-[600px] object-cover"
            />
          </div>
        </div>

        {/* Right Column: Product Info */}
        <div className="flex flex-col">
          {/* Brand & Wishlist Header */}
          <div className="flex justify-between items-center mb-1">
            <span className="text-[14px] text-[#666666] uppercase font-volkhov">
              FASCO
            </span>
            <button className="text-gray-600 hover:text-black transition p-1 cursor-pointer">
              <FiHeart className="w-5 h-5" />
            </button>
          </div>

          {/* Title */}
          <h1 className="text-2xl lg:text-[30px] text-black mb-2 font-volkhov">
            Denim Jacket
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-4">
            <div className="flex text-black">
              {[...Array(4)].map((_, i) => (
                <AiFillStar key={i} className="w-4 h-4" />
              ))}
              <AiOutlineStar className="w-4 h-4 text-gray-400" />
            </div>
            <span className="text-sm text-gray-500 ml-1">(3)</span>
          </div>

          {/* Price & Discount */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[24px] text-black font-volkhov">$39.00</span>
            <span className="text-[16px] text-[#666666] line-through font-jost">
              $59.00
            </span>
            <span className="bg-red text-white text-[11px] font-semibold px-2 py-0.5 rounded-full font-jost">
              SAVE 33%
            </span>
          </div>

          {/* Live Viewers Count */}
          <div className="flex items-center gap-2 text-[16px] text-[#8A8A8A] mb-6 font-poppins">
            <FiEye className="w-4 h-4" />
            <span>24 people are viewing this right now</span>
          </div>

          {/* Countdown Timer Banner */}
          <div className="bg-pink-50 border border-pink-100 rounded-md p-3 mb-6 flex items-center justify-between">
            <span className="text-[#FF706B] text-[18px] font-volkhov">
              Hurry up! Sale ends in:
            </span>
            <div className="flex gap-1 text-[#FF706B] text-[18px] font-volkhov">
              <span>00</span> : <span>05</span> : <span>59</span> :{" "}
              <span>47</span>
            </div>
          </div>

          {/* Stock Info */}
          <div className="mb-6">
            <p className="text-[16px] text-[#666666] font-jost mb-2">
              Only <span className="font-bold">9</span> item(s) left in stock!
            </p>
            <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
              <div className="bg-red-500 h-full w-[25%] rounded-full"></div>
            </div>
          </div>

          {/* Size Selection */}
          <div className="mb-6 font-poppins">
            <label className="block text-sm font-bold mb-2">
              Size: <span className="font-normal">{selectedSize}</span>
            </label>
            <div className="flex gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-10 h-10 flex items-center justify-center border text-sm font-medium rounded transition cursor-pointer ${
                    selectedSize === size
                      ? "bg-black text-white border-black"
                      : "bg-[#EEEEEE] text-gray-700 border-gray-300 hover:border-black"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div className="mb-6 font-volkhov">
            <label className="block text-[16px] font-bold text-black mb-2">
              Color: <span className="font-normal">{selectedColor}</span>
            </label>
            <div className="flex gap-3">
              {colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={`w-7 h-7 rounded-full flex items-center justify-center border cursor-pointer ${
                    color.class
                  } ${
                    selectedColor === color.name
                      ? "ring-2 ring-offset-2 ring-black"
                      : "border-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Quantity & Add to Cart */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">Quantity</label>
            <div className="flex gap-4">
              <div className="flex items-center border border-gray-300 rounded w-32 justify-between px-3 py-2">
                <button
                  onClick={() => handleQuantityChange("decrease")}
                  className="text-gray-500 hover:text-black cursor-pointer"
                >
                  <FiMinus className="w-3.5 h-3.5" />
                </button>
                <span className="text-sm font-medium">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange("increase")}
                  className="text-gray-500 hover:text-black cursor-pointer"
                >
                  <FiPlus className="w-3.5 h-3.5" />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-white border border-black text-black font-semibold py-2.5 rounded hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer"
              >
                Add to cart
              </button>
            </div>
          </div>

          {/* Action Links */}
          <div className="flex items-center gap-6 text-sm text-gray-600 border-t border-b border-gray-200 py-4 mb-6">
            <button className="flex items-center gap-1.5 hover:text-black cursor-pointer">
              <AiOutlineSwap className="w-4 h-4" /> Compare
            </button>
            <button className="flex items-center gap-1.5 hover:text-black cursor-pointer">
              <FiHelpCircle className="w-4 h-4" /> Ask a question
            </button>
            <button className="flex items-center gap-1.5 hover:text-black cursor-pointer">
              <FiShare2 className="w-4 h-4" /> Share
            </button>
          </div>

          {/* Delivery & Shipping Info */}
          <div className="space-y-3 text-sm text-gray-700 mb-6">
            <div className="flex items-center gap-3">
              <FiTruck className="w-5 h-5 text-gray-500" />
              <span>
                <strong className="font-semibold">Estimated Delivery:</strong>{" "}
                Jul 30 - Aug 03
              </span>
            </div>
            <div className="flex items-center gap-3">
              <FiRotateCcw className="w-5 h-5 text-gray-500" />
              <span>
                <strong className="font-semibold">
                  Free Shipping & Returns:
                </strong>{" "}
                On all orders over $75
              </span>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-gray-50 p-4 rounded-md text-center border border-gray-100">
            <div className="flex justify-center items-center gap-3 mb-2 text-2xl text-gray-700">
              <FaCcVisa className="hover:text-blue-600 transition" />
              <FaCcMastercard className="hover:text-red-500 transition" />
              <FaCcAmex className="hover:text-blue-400 transition" />
              <FaCcJcb className="hover:text-green-600 transition" />
              <FaCcDiscover className="hover:text-orange-500 transition" />
            </div>
            <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
              <HiOutlineShieldCheck className="w-4 h-4 text-gray-400" />{" "}
              Guarantee safe & secure checkout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
import { useState } from "react";

import product_1 from "../assets/NAProduct-1 .png"
import product_2 from "../assets/NAProduct-2.png"
import product_3 from "../assets/NAProduct-3.png"
import product_4 from "../assets/NAProduct-4.png"
import product_5 from "../assets/NAProduct-5.png"
import product_6 from "../assets/NAProduct-6.png"
/*
  Setup:
  1. Add fonts to your index.html <head>:
     <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&family=Merriweather:wght@400;700&display=swap" rel="stylesheet">
  2. (Optional) tailwind.config.js -> theme.extend.fontFamily:
       poppins: ["Poppins", "sans-serif"],
       serif: ["Merriweather", "serif"],
     Below, arbitrary values are used so no config is required.
  3. Put the images in /public/images/product-1.jpg ... product-6.jpg
*/

const TABS = [
  "Men’s Fashion",
  "Women’s Fashion",
  "Women Accessories",
  "Men Accessories",
  "Discount Deals",
];

const PRODUCTS = [
  {
    id: 1,
    name: "Shiny Dress",
    brand: "Al Karam",
    image: product_1,
  },
  {
    id: 2,
    name: "Long Dress",
    brand: "Al Karam",
    image: product_2,
  },
  {
    id: 3,
    name: "Full Sweater",
    brand: "Al Karam",
    image: product_3,
  },
  {
    id: 4,
    name: "White Dress",
    brand: "Al Karam",
    image: product_4,
  },
  {
    id: 5,
    name: "Colorful Dress",
    brand: "Al Karam",
    image: product_5,
  },
  {
    id: 6,
    name: "White Shirt",
    brand: "Al Karam",
    image: product_6,
  },
].map((p) => ({
  ...p,
  reviews: "4.1k",
  price: "$95.50",
  status: "Almost Sold Out",
}));

function Star({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 1.8l3.1 6.6 7.2.9-5.3 5 1.4 7.2L12 17.9l-6.4 3.6L7 14.3 1.7 9.3l7.2-.9L12 1.8z" />
    </svg>
  );
}

function Stars({ count = 5 }) {
  return (
    <div
      className="flex items-center gap-[1px] text-[#FF9A1F]"
      aria-label={`${count} out of 5 stars`}
    >
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="h-[22px] w-[22px]" />
      ))}
    </div>
  );
}

function ProductCard({ product }) {
  return (
    <article className="rounded-[10px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.07)]">
      <div className=" pt-[15px] pb-[36px] px-[25px]">
        <img
        src={product.image}
        alt={product.name}
        className="h-[230px] w-full rounded-[10px] overflow-hidden object-cover"
      />

      <div className="mt-[12px] flex items-start justify-between">
        <div>
          <h3 className="font-poppins text-[20px] font-medium leading-auto text-[#484848]">
            {product.name}
          </h3>
          <p className="mt-[1px] font-poppins text-[12px] leading-[12px] text-[#8A8A8A]">
            {product.brand}
          </p>
        </div>
        <Stars />
      </div>

      <p className="mt-[25px] font-poppins text-[12px] font-medium text-[#484848]">
        ({product.reviews}) Customer Reviews
      </p>

      <div className="mt-[25px] flex items-center justify-between">
        <span className="font-poppins text-[24px] font-medium leading-[20px] tracking-[-1%] text-[#484848]">
          {product.price}
        </span>
        <span className="font-poppins text-[12px] leading-[20px] tracking-[-1%] text-[#FF4646]">
          {product.status}
        </span>
      </div>
      </div>
    </article>
  );
}

export default function Arrivals() {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <>
      {/* Tabs */}
      <div className="mx-auto mt-[50px] flex max-w-[1155px] flex-wrap items-center justify-between gap-[30px]">
        {TABS.map((tab, i) => {
          const active = i === activeTab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(i)}
              className={`h-[56px] w-[207px] cursor-pointer  rounded-lg text-[16px] font-poppins transition-all ${
                active
                  ? "bg-black text-white shadow-[0_18px_30px_rgba(0,0,0,0.25)]"
                  : "bg-[#FAFAFA] text-[#8A8A8A] shadow-[0_4px_12px_rgba(0,0,0,0.02)] hover:bg-[#F0F0F0F0]"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="mx-auto mt-[50px] grid max-w-[1280px] grid-cols-1 gap-x-[61px] gap-y-[60px] md:grid-cols-2 lg:grid-cols-3">
        {PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* View more */}
      <div className="mt-[50px] flex justify-center">
        <button type="button" className="common_button_black">
          View More
        </button>
      </div>
    </>
  );
}

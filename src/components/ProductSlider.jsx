import { useState } from "react";
import Product_1 from "../assets/Product 1.png"
import Product_2 from "../assets/Product 2.png"
import Product_3 from "../assets/Product 3.png"



/**
 * ProductSlider
 * Pixel-matched to the reference (1185 x 597 canvas).
 *
 * Setup:
 * 1. Tailwind CSS must be installed.
 * 2. Add Poppins to your project, e.g. in index.html:
 *    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap" rel="stylesheet" />
 * 3. Replace the `image` paths below with your own product photos.
 */

const slides = [
  {
    id: 1,
    image: Product_1,
    // bg: "bg-[#e4dfd8]",
    // width: "w-[404px]",
    // height: "h-[582px]",
    badge: { index: "01", label: "Spring Sale", title: "30% OFF" },
  },
  {
    id: 2,
    image: Product_2,
    // bg: "bg-[#ebecf1]",
    // width: "w-[372px]",
    // height: "h-[486px]",
  },
  {
    id: 3,
    image: Product_3,
    // bg: "bg-[#c4b2b3]",
    // width: "w-[372px]",
    // height: "h-[486px]",
  },
];

const ArrowLeft = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 5l-7 7 7 7" />
  </svg>
);

const ArrowRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 5l7 7-7 7" />
  </svg>
);

export default function ProductSlider() {
  const [active, setActive] = useState(0);
  const total = 4;

  const prev = () => setActive((i) => Math.max(0, i - 1));
  const next = () => setActive((i) => Math.min(total - 1, i + 1));

  return (
    <div
      className="relative h-[582px] w-[1332px] max-w-full overflow-hidden bg-transparent font-poppins"
      aria-roledescription="carousel"
      aria-label="Spring collection"
    >
      {/* Slides */}
      <div className="absolute left-[151px] top-0 flex items-start gap-6">
        {slides.map((slide) => (
          <article
            key={slide.id}
            className={`relative shrink-0 overflow-hidden ${slide.width} ${slide.height} ${slide.bg}`}
          >
            <img
              src={slide.image}
              alt=""
              className="h-full w-full object-cover overflow-hidden"
              draggable={false}
            />

            {slide.badge && (
              <div className="absolute bottom-6 left-6 flex h-[130px] w-[217px] flex-col justify-center gap-2 bg-white px-8">
                <div className="flex items-center text-[16px] font-normal leading-[150%] text-[#484848]">
                  <span>{slide.badge.index}</span>
                  <span className="mx-2.5 block bg-[#484848]" />
                  <span>{slide.badge.label}</span>
                </div>
                <p className="text-[28px] font-light leading-[120%] tracking-[0.2px] text-[#484848]">
                  {slide.badge.title}
                </p>
              </div>
            )}
          </article>
        ))}
      </div>

      {/* Prev / Next */}
      <div className="absolute bottom-[1px] left-[15px] flex gap-4">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous slide"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#b5b5b5] shadow-[0_4px_14px_rgba(0,0,0,0.12)] transition-colors hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          <ArrowLeft />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next slide"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black shadow-[0_4px_14px_rgba(0,0,0,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          <ArrowRight />
        </button>
      </div>

      {/* Pagination dots */}
      <div className="absolute bottom-[15px] left-[579px] flex items-center gap-[20px]">
        {Array.from({ length: total }).map((_, i) => {
          const isActive = i === active;
          return (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={isActive}
              className={
                isActive
                  ? "flex h-[27px] w-[27px] items-center justify-center rounded-full border border-black"
                  : "h-2.5 w-2.5 rounded-full bg-[#B6B6B6]"
              }
            >
              {isActive && <span className="block h-2.5 w-2.5 rounded-full bg-black" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
/**
 * UltimateSaleBanner
 * Pass your own image URLs through props. Without a src, a neutral placeholder is shown.
 *
 * Font: add Poppins to your project, e.g. in index.html:
 * <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap" rel="stylesheet" />
 */
import bannerLeftTop from "../assets/BannerLeftTop.png";
import bannerLeft from "../assets/BannerLeft.png";
import bannerTop from "../assets/BannerTop.png";
import bannerRight from "../assets/BannerRight.png";
import bannerRightTop from "../assets/BannerRightTop.png";
import bannerButtom from "../assets/BannerButtom.png";

const Photo = ({ src, alt, className = "", imgClassName = "" }) => (
  <div className={`overflow-hidden rounded-[10px] ${className}`}>
    {src ? (
      <img
        src={src}
        alt={alt}
        className={`h-full w-full ${imgClassName}`}
        draggable={false}
      />
    ) : (
      <div
        role="img"
        aria-label={alt}
        className="flex h-full w-full items-center justify-center text-[10px] text-neutral-400"
      >
        {alt}
      </div>
    )}
  </div>
);

const Banner = ({ onShopNow = () => {} }) => {
  return (
    <section
      className="mx-auto w-[1281px] bg-[#FFFFFF] pt-[94px] font-['Poppins',sans-serif]"
      aria-label="Ultimate sale"
    >
      <div className="conatainer">
        <div className="grid h-full w-full grid-cols-[195fr_212fr_195fr] gap-x-[17px]">
          {/* Left panel */}
          <div className="relative">
            <img
              src={bannerLeft}
              alt=""
              className="relative z-0 object-cover rounded-[10px]"
            />

            <Photo
              src={bannerLeftTop}
              alt="Man sitting on a wooden crate"
              className="absolute z-10 top-[185px]"
            />
          </div>
          {/* Center column */}
          <div className="grid h-full grid-row-3 justify-between gap-[36px]">
            <Photo
              src={bannerTop}
              alt="Group of four women"
              imgClassName="object-cover object-top"
            />

            <div className=" flex flex-col items-center">
              <h2 className="text-[91px] font-medium leading-none tracking-[-0.04em] text-[#484848]">
                ULTIMATE
              </h2>

              <p
                className="text-[187px] text-[#484848] font-poppins font-medium leading-[100%] tracking-[-5.5%] text-transparent"
                style={{ WebkitTextStroke: "1px #4a4a4a" }}
              >
                SALE
              </p>

              <p className="pb-[19px] text-[20px] font-poppins font-normal tracking-[10%] text-[#484848]">
                NEW COLLECTION
              </p>

              <button
                type="button"
                onClick={onShopNow}
                className="common_button_black"
              >
                SHOP NOW
              </button>
            </div>

            <Photo
              src={bannerButtom}
              alt="Two smiling women on a pink background"
              imgClassName="object-cover object-top"
            />
          </div>

          {/* Right panel */}
          <div className="relative">
            <img
              src={bannerRight}
              alt=""
              className="relative z-0 object-cover rounded-[10px]"
            />

            <Photo
              src={bannerRightTop}
              alt="Man in a rust turtleneck sitting on a stool"
              className="absolute z-10 top-[189px] right-[92px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;

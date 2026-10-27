import LogoLoop from "./BrandLoop";

import brand_1 from "../assets/brand1.png";
import brand_2 from "../assets/brand2.png";
import brand_3 from "../assets/brand3.png";
import brand_4 from "../assets/brand4.png";

const Brand_1 = () => {
  return <img src={brand_1} alt="brand_logo" />;
};
const Brand_2 = () => {
  return <img src={brand_2} alt="brand_logo" />;
};
const Brand_3 = () => {
  return <img src={brand_3} alt="brand_logo" />;
};
const Brand_4 = () => {
  return <img src={brand_4} alt="brand_logo" />;
};

const techLogos = [
  {
    node: <Brand_1 />,
    title: "Brand 1",
  },
  {
    node: <Brand_2 />,
    title: "Brand 2",
  },
  {
    node: <Brand_3 />,
    title: "Brand 3",
  },
  {
    node: <Brand_4 />,
    title: "Brand 4",
  },
];

const Brand = () => {
  return (
    <div className="mt-[27px]" style={{ height: "200px", display:"flex", alignItems:"center",overflow: "hidden" }}>
      <LogoLoop
        logos={techLogos}
        speed={60}
        direction="left"
        logoHeight={33}
        gap={70}
        hoverSpeed={0}
        scaleOnHover
        ariaLabel="Technology partners"
      />
    </div>
  );
};

export default Brand;

import Clock from "../components/Clock";
import ProductSlider from "../components/ProductSlider";
import SectionHeading from "../components/SectionHeading";

const Deals = () => {
  return (
    <section className="pt-25 pb-[145px] bg-[#FAFAFA]">
      <div className="container">
        <div className="pt-[55px] flex flex-col items-start gap-[50px]">
          <div>
            <SectionHeading
              className={"w-[444px]"}
              subHeading={"Deals Of The Month"}
              heading={
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis ultrices sollicitudin aliquam sem. Scelerisque duis ultrices sollicitudin "
              }
            />
            <button className="common_button_black mt-10">Buy Now</button>
          </div>
          <Clock />
        </div>

        <div className="mt-[-750px] ml-100">
          <ProductSlider />
        </div>
      </div>
    </section>
  );
};

export default Deals;

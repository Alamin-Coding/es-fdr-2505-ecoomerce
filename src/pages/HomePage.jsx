import Brand from "../components/Brand";
import Banner from "../components/Banner";
import Deals from "../pages/Deals"
import NewArraivals from "./NewArraivals";


const HomePage = () => {
  return (
    <>
      <Banner />
      <Brand />

      <Deals/>
      <NewArraivals/>
    </>
  );
};

export default HomePage;

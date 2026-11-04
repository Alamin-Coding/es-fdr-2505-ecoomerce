import Brand from "../components/Brand";
import Banner from "../components/Banner";
import Deals from "../pages/Deals"
import NewArraivals from "./NewArraivals";


const HomePage = () => {
  const testData = 10
  return (
    <>
      <Banner />
      <Brand />

      <Deals/>
      <NewArraivals dataProps={testData}/>
    </>
  );
};

export default HomePage;

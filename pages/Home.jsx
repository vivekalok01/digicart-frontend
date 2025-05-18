import React from "react";
import MainBanner from "../components/MainBanner";
import Categories from "../components/Categories";
import BestSeller from "../components/BestSeller";
import BottomBanner from "../components/BottomBanner";
import NewLetter from "../components/NewLetter";

const Home = () => {
  return (
    <div className="mt-10">
      <MainBanner></MainBanner>
      <Categories></Categories>
      <BestSeller></BestSeller>
      <BottomBanner></BottomBanner>
      <NewLetter></NewLetter>
    </div>
  );
};

export default Home;

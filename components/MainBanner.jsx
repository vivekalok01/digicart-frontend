import React from "react";
import { assets } from "../src/assets/assets";
import { Link } from "react-router-dom";

const MainBanner = () => {
  return (
    <>
    <div className="realtive ">
      <img
        src="https://img.freepik.com/free-photo/flat-lay-vegetables-frame_23-2148516769.jpg"
        alt="banner"
        className="w-full h-96 hidden md:block"
      />
      <img
        src={assets.main_banner_bg_sm}
        alt="banner"
        className="w-full md:hidden"
      />
      <div className="absolute inset-0 flex flex-col items-center md:items-start  justify-end md:justify-center pb-24 md:pb-12  px-4 md:pl-24 lg:pl-52 ">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left max-w-72 md:max-w-80 lg:max-w-105 ">
          Frenshnes You can Trust, Saving You will Love!
        </h1>

        <div className="flex items-center mt-6 font-medium">
          <Link
            to="/products"
            className="group flex items-center gap-2 px-7 md:px-7 py-3 bg-blue-400 hover:bg-blue-500 transition rounded text-white cursor-pointer"
          >
            Shop Now{" "}
            <img
              className="md:hidden transition group-focus:translate-x-1 "
              src={assets.white_arrow_icon}
              alt="arrow"
            />
          </Link>

          <Link
            to="/products"
            className="group hidden md:flex items-center gap-2 px-9 py-3 cursor-pointer"
          >
            Explore deals{" "}
            <img
              className=" transition group-hover:translate-x-1 "
              src={assets.black_arrow_icon}
              alt="arrow"
            />
          </Link>
        </div>
      </div>
      </div>
      
    </>
  );
};

export default MainBanner;

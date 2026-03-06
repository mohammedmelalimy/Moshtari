import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";

import { ChevronsDown, ChevronsUp } from "lucide-react";
import { Features } from "../../Components/Features/Features";
import { Newsletter } from "../../Components/Newsletter/Newsletter";
import Promo from "../../Components/Promo/Promo";
import MainProducts from "../Products/MainProducts";
import Products from "../Products/Products";
import CategoriesSlider from "./CategoriesSlider";
import HomeSlider from "./HomeSlider";

const Home = () => {

  const token = localStorage.getItem("token");
  const [Show,setShow]=useState(8);
  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-in-out",
      once: false,
      offset: 120,
    });
  }, []);

  return (
    <div className="bg-gray-100 dark:bg-black dark:text-white min-h-screen ">

      {/* Main Slider Section */}
      <div data-aos="fade-up" className="flex flex-col lg:flex-row items-start lg:items-center justify-center gap-6">
        <div data-aos="zoom-in" className="flex-1 w-full lg:w-4/5">
          <HomeSlider />
        </div>
      </div>

      {/* Categories Slider */}
      <div data-aos="fade-right" className="px-4 lg:px-10 py-3 container mx-auto">
        <h3 className="text-3xl font-bold p-3">
          {token ? "Our Categories" : null}
        </h3> 
        {token ? <CategoriesSlider /> : null}
      </div>

      {/* Products Section */}
      <div data-aos="fade-up" className="px-4 lg:px-10 pb-10 container mx-auto">

        <div className="flex justify-between">
          <h3 className="text-3xl font-bold p-3">
            {token ? "Our Products" : "Trending Products"}
          </h3>
        </div>
        {token ? <Products show={Show} /> : <MainProducts show={Show} />}        
        <div className="flex justify-center">
          {Show > 40 ? (
              <button
              onClick={() => setShow(8)}
              className="flex items-center gap-2 px-4 py-2 mb-4 transition-all hover:text-red-400">
                <span className="text-lg font-semibold">Show Less</span>
              <ChevronsUp size={50} className="transition-transform duration-300 hover:-translate-y-1"/>
              </button>
              ) : (
              <button onClick={() => setShow(Show + 8)}
              className="flex items-center gap-2 px-4 py-2 mb-4 transition-all hover:text-green-500">
                <span className="text-lg font-semibold">Load More</span>
                <ChevronsDown size={50} className="transition-transform duration-300 hover:translate-y-1"/>
              </button>
          )}
          </div>
      </div>
      {/* Promo Section */}
      {!token ? (
        <div data-aos="fade-up" className="px-4 lg:px-10 py-3 container mx-auto">
          <Promo />
        </div>
      ) : null}

      {/* Features Section */}
      <Features />
      
      {/* NewsLetter Section */}
      <Newsletter/>

    </div>
  );
};

export default Home;
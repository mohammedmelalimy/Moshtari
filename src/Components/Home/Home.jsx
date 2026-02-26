import image1 from "../../assets/slide-2.jpg";
import image2 from "../../assets/slide-3.png";
import Products from "../Products/Products";
import CategoriesSlider from "./CategoriesSlider";
import HomeSlider from "./HomeSlider";

const Home = () => {
  return (
    <div className="container mx-auto  dark:bg-gray-900 dark:text-white">
      
      {/* Slider + Side Images */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-center gap-4 py-6 px-4 lg:px-10">
        
        {/* Main Slider */}
        <div className="flex-1 w-full lg:w-3/5">
          <HomeSlider />
        </div>

        {/* Side Images */}
        <div className="hidden lg:flex flex-col w-1/5 gap-4">
          <div className="overflow-hidden h-[30%] rounded-2xl">
            <img 
              src={image1} 
              alt="side image" 
              className="w-full h-52 object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="overflow-hidden h-[30%] rounded-2xl">
            <img 
              src={image2} 
              alt="side image" 
              className="w-full h-52 object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

      </div>
      <div>
        <CategoriesSlider/>
      </div>
      {/* Products Section */}
      <div className="px-4 lg:px-10 pb-10">
        <Products />
      </div>

    </div>
  );
};

export default Home;
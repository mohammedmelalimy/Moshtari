import Contact from "../../Components/Contact/Contact";
import MainProducts from "../Products/MainProducts";
import Products from "../Products/Products";
import CategoriesSlider from "./CategoriesSlider";
import HomeSlider from "./HomeSlider";

const Home = () => {
  const token = localStorage.getItem("token");
  return (
    <div className="bg-gray-100 dark:bg-gray-900 dark:text-white min-h-screen">
      
      {/* Slider Section */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-center gap-6 py-3 px-4 lg:px-10">
        {/* Main Slider */}
        <div className="flex-1 w-full lg:w-4/5">
          <HomeSlider />
        </div>
      </div>

      {/* Categories Slider */}
      <div className="px-4 lg:px-10 py-3">
        {token ? <CategoriesSlider /> : null}
      </div>

      {/* Products Section */}
      <div className="px-4 lg:px-10 pb-10">
        {token ? <Products /> : <MainProducts />}
      </div>

      {/* Contact Section */}
      {token?null:<Contact/>}
    </div>
  );
};

export default Home;
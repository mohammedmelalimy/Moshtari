import MainProducts from "../Products/MainProducts";
import Products from "../Products/Products";
import CategoriesSlider from "./CategoriesSlider";
import HomeSlider from "./HomeSlider";

const Home = () => {
  const token = localStorage.getItem("token");
  return (
    <div className="bg-gray-100 dark:bg-gray-900 dark:text-white min-h-screen">
      
      {/* Slider + Side Images */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-center gap-6 py-6 px-4 lg:px-10">
        
        {/* Main Slider */}
        <div className="flex-1 w-full lg:w-3/5">
          <HomeSlider />
        </div>
        
      </div>

      {/* Categories Slider */}
      <div className="px-4 lg:px-10 py-6">
        <CategoriesSlider />
      </div>

      {/* Products Section */}
      <div className="px-4 lg:px-10 pb-10">
        {token ? <Products /> : <MainProducts />}
      </div>

    </div>
  );
};

export default Home;
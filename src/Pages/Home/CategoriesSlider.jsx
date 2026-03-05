import { Circles } from "react-loader-spinner";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import useAllCategories from "../../customHooks/useAllCategories";

const CategoriesSlider = () => {
  const { isLoading, isError, error, data } = useAllCategories();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1280,
        settings: { slidesToShow: 5 },
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 2 },
      },
    ],
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Circles height="80" width="80" color="#4fa94d" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 py-10">{error.message}</div>
    );
  }

  return (
    <div className="dark:bg-black py-8">
      <div className="container mx-auto">
        <Slider {...settings}>
          {data.data.data.map((category) => (
            <div
              key={category._id}
              className="p-2 flex justify-center"
            >
              <div className="relative w-44 h-44 md:w-48 md:h-48 overflow-hidden rounded-xl shadow-lg hover:scale-105 transform transition duration-300 bg-gray-100 dark:bg-gray-800">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 w-full bg-black bg-opacity-50 text-white text-center py-1 text-sm font-semibold">
                  {category.name}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CategoriesSlider;
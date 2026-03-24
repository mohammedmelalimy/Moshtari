import { Circles } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import useAllCategories from '../../customHooks/useAllCategories';

const CategoriesSlider = () => {
  // Fetch categories
  const { isLoading, isError, error, data } = useAllCategories();
  const categories = data?.data?.data || [];

  // Determine slides to show
  const slidesToShow = categories.length === 1 ? 1 : 4;

  // Slider settings
  const settings = {
    dots: false,
    infinite: categories.length > 1, // إذا فيه سلايد واحد، لا نعمل infinite
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    arrows: categories.length > 1, // لو فيه سلايد واحد، نخفي الأسهم
    autoplay: categories.length > 1,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: Math.min(slidesToShow, 4) } },
      { breakpoint: 1024, settings: { slidesToShow: Math.min(slidesToShow, 3) } },
      { breakpoint: 768, settings: { slidesToShow: Math.min(slidesToShow, 2) } },
      { breakpoint: 480, settings: { slidesToShow: 1 } }
    ]
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20 animate-pulse">
        <Circles height="80" width="80" color="#4fa94d" />
      </div>
    );
  }

  // Error state
  if (isError) {
    return <div className="text-center text-red-500 py-10">{error.message}</div>;
  }

  // Render slider
  return (
    <div className="dark:bg-black py-8 w-full">
      <div className="container mx-auto w-full">
        <Slider {...settings}>
          {categories.map((category) => (
            <Link
              key={category._id}
              to={`/category/${category._id}`}
              aria-label={`Go to ${category.name} category`}
              className="p-2 flex justify-center w-full"
            >
              <div className="relative w-full h-44 md:h-48 overflow-hidden rounded-xl shadow-lg transform transition duration-300 hover:scale-105">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-110"
                />
                <div className="absolute bottom-0 w-full bg-black/70 text-white text-center py-1 text-sm font-semibold opacity-0 hover:opacity-100 transition-opacity duration-300">
                  {category.name}
                </div>
              </div>
            </Link>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CategoriesSlider;

import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import Hero1Img from '../../assets/slider1.jpg';
import Hero2Img from '../../assets/slider2.jpg';
import Hero3Img from '../../assets/slider3.jpg';
import Hero4Img from '../../assets/slider4.jpg';
import { Link } from 'react-router-dom';

export default function HomeSlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    pauseOnHover: true,
    adaptiveHeight: true
  };

  const heroes = [
    {
      img: Hero1Img,
      title: 'Discover Your Style',
      subtitle: 'Fashion • Electronics • Shoes',
      description:
        'Shop the latest trends in clothing, explore cutting-edge electronics, and find the perfect pair of shoes.',
      cta1: { text: 'Shop Now', link: '/authUser/products' },
      cta2: { text: 'Browse Categories', link: '/authUser/categories' }
    },
    {
      img: Hero2Img,
      title: 'Upgrade Your Tech',
      subtitle: 'Smartphones • Laptops • Gadgets',
      description: 'Find the newest electronics at unbeatable prices.',
      cta1: { text: 'Shop Electronics', link: '/authUser/products' },
      cta2: { text: 'See Deals', link: '/authUser/categories' }
    },
    {
      img: Hero3Img,
      title: 'Step Up Your Shoes Game',
      subtitle: 'Sneakers • Boots • Casual',
      description: 'Discover stylish footwear for every occasion.',
      cta1: { text: 'Shop Shoes', link: '/authUser/products' },
      cta2: { text: 'Browse Brands', link: '/authUser/brands' }
    },
    {
      img: Hero4Img,
      title: 'Trending Fashion Collections',
      subtitle: 'Men • Women • Kids',
      description: 'Explore seasonal collections with exclusive discounts.',
      cta1: { text: 'Shop Fashion', link: '/authUser/products' },
      cta2: { text: 'Browse Categories', link: '/authUser/categories' }
    }
  ];

  return (
    <div className="dark:bg-black ">
      <Slider {...settings}>
        {heroes.map((hero, index) => (
          <div key={index} className="relative w-full overflow-hidden">
            {/* Background image */}
            <img
              src={hero.img}
              alt={`hero-${index + 1}`}
              className="w-full h-96 md:h-130 lg:h-150 object-cover"
            />

            <div className="absolute inset-0 bg-black/40 flex flex-col gap-8 justify-start items-center text-center px-6 pt-24 md:pt-32 lg:pt-45">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-100 mb-2">
                <span className="block mb-2">{hero.title}</span>
                <span
                  className="block bg-clip-text text-transparent 
                bg-linear-to-r from-blue-500 via-indigo-500 to-purple-500 
                dark:from-purple-400 dark:via-pink-500 dark:to-red-500 drop-shadow-md"
                >
                  {hero.subtitle}
                </span>
              </h2>
              <p className="text-gray-200 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mb-6 mt-2 text-base sm:text-lg md:text-xl leading-relaxed md:leading-loose">
                {hero.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
                <Link
                  to={hero.cta1.link}
                  className="w-full sm:w-auto text-center px-5 py-3 sm:px-6 sm:py-4 
                    rounded-2xl bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 
                    text-white font-semibold uppercase tracking-wide shadow-lg 
                    hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out"
                >
                  {hero.cta1.text}
                </Link>
                <Link
                  to={hero.cta2.link}
                  className="w-full sm:w-auto text-center px-5 py-3 sm:px-6 sm:py-4 
        rounded-2xl border border-gray-300 backdrop-blur bg-white dark:bg-gray-800/30 
        text-gray-800 dark:text-gray-200 hover:bg-white/70 dark:hover:bg-purple-600/80 
        hover:text-black dark:hover:text-white shadow-md hover:shadow-lg 
        transition-all duration-300 ease-in-out uppercase font-semibold tracking-wide"
                >
                  {hero.cta2.text}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

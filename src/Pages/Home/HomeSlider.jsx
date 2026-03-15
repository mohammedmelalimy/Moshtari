import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { Link } from 'react-router-dom';
import { ChevronsDown } from 'lucide-react';

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
      title: 'Discover Your Style',
      subtitle: 'Fashion • Electronics • Shoes',
      description:
        'Shop the latest trends in clothing, explore cutting-edge electronics, and find the perfect pair of shoes.',
      cta1: { text: 'Shop Now', link: '/authUser/products' },
      cta2: { text: 'Browse Categories', link: '/authUser/categories' }
    },
    {
      title: 'Upgrade Your Tech',
      subtitle: 'Smartphones • Laptops • Gadgets',
      description: 'Find the newest electronics at unbeatable prices.',
      cta1: { text: 'Shop Electronics', link: '/authUser/products' },
      cta2: { text: 'See Deals', link: '/authUser/categories' }
    }
    // add more slides...
  ];

  return (
    <div className="relative dark:bg-black">
      <Slider {...settings}>
        {heroes.map((hero, index) => (
          <div
            key={index}
            className="relative w-full overflow-hidden h-[75vh] md:h-[80vh] bg-gray-100 dark:bg-black"
          >
            <div className="absolute inset-0 flex flex-col gap-8 justify-center items-center text-center px-6 pt-0 md:pt-32 lg:pt-40">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-gray-100 drop-shadow-xl leading-tight">
                <span className="block mb-2">{hero.title}</span>
                <span className="block bg-clip-text text-transparent bg-linear-to-r from-blue-500 via-indigo-500 to-purple-600 dark:from-purple-300 dark:via-pink-400 dark:to-red-400">
                  {hero.subtitle}
                </span>
              </h1>

              <p className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl text-base sm:text-lg md:text-xl leading-relaxed md:leading-loose text-gray-700 dark:text-gray-200 opacity-90">
                {hero.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center mb-5">
                <Link
                  to={hero.cta1.link}
                  className="w-full sm:w-auto text-center px-5 py-3 sm:px-6 sm:py-4 rounded-2xl bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-semibold uppercase tracking-wide shadow-xl hover:scale-110 hover:shadow-2xl transition-all duration-300"
                >
                  {hero.cta1.text}
                </Link>

                <Link
                  to={hero.cta2.link}
                  className="w-full sm:w-auto text-center px-5 py-3 sm:px-6 sm:py-4 rounded-2xl border border-gray-300 dark:border-gray-600 bg-white/60 dark:bg-gray-800/40 backdrop-blur text-gray-900 dark:text-gray-200 hover:bg-white/90 dark:hover:bg-purple-600/70 hover:text-black dark:hover:text-white shadow-lg hover:shadow-xl transition-all duration-300 uppercase font-semibold"
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

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
    dots: true,
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
    <div className="dark:bg-black py-6">
      <Slider {...settings}>
        {heroes.map((hero, index) => (
          <div key={index} className="px-2">
            <div className="relative w-full overflow-hidden rounded-xl shadow-lg">
              {/* Background image */}
              <img
                src={hero.img}
                alt={`hero-${index + 1}`}
                className="w-full h-96 md:h-[500px] lg:h-[600px] object-cover"
              />

              {/* Overlay content */}
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-6">
                <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-2">
                  {hero.title}
                </h2>
                <h3 className="text-xl md:text-3xl text-gray-200 mb-4">{hero.subtitle}</h3>
                <p className="text-gray-200 max-w-2xl mb-6">{hero.description}</p>

                <div className="flex gap-4">
                  <Link
                    to={hero.cta1.link}
                    className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:scale-105 transition"
                  >
                    {hero.cta1.text}
                  </Link>
                  <Link
                    to={hero.cta2.link}
                    className="px-6 py-3 border border-gray-200 rounded-xl text-white hover:bg-white/20 transition"
                  >
                    {hero.cta2.text}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

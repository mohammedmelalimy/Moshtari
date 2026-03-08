import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import { ChevronsDown, ChevronsUp } from 'lucide-react';

import { Features } from '../../components/Features/Features';
import { Newsletter } from '../../components/Newsletter/Newsletter';
import Promo from '../../components/Promo/Promo';
import MainProducts from '../Products/MainProducts';
import Products from '../Products/Products';
import CategoriesSlider from './CategoriesSlider';
import HomeSlider from './HomeSlider';
import Hero from './Hero';

const Home = () => {
  const token = localStorage.getItem('token');
  const [show, setShow] = useState(8);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: 'ease-in-out',
      once: true,
      offset: 120
    });

    // Refresh positions after window load (images)
    window.addEventListener('load', () => AOS.refresh());
  }, []);

  return (
    <div className="bg-gray-100 dark:bg-black dark:text-white min-h-screen">
      {/* Hero + Slider Section */}
      <div className="w-full">
        {/* Slider */}
        <div className="mb-6 ">
          <HomeSlider />
        </div>

        {/* Hero Section */}
        {/* <div>
          <Hero />
        </div> */}
      </div>

      {/* Categories */}
      {token && (
        <div className="px-6 md:px-24 py-6">
          <h3 className="text-4xl font-extrabold mb-4" data-aos="fade-right">
            Discover Our Categories
          </h3>
          <CategoriesSlider />
        </div>
      )}

      {/* Products */}
      <div className="px-6 md:px-24 py-6">
        <h3 className="text-4xl font-extrabold mb-4" data-aos="fade-up">
          {token ? 'Our Products' : 'Trending Products'}
        </h3>

        {token ? (
          <Products show={show} setLoading={setLoading} />
        ) : (
          <MainProducts show={show} setLoading={setLoading} />
        )}

        {/* Load More Button */}
        {!loading && (
          <div className="flex justify-center mt-4">
            {show > 40 ? (
              <button
                onClick={() => setShow(8)}
                className="flex items-center gap-2 px-4 py-2 transition-all hover:text-red-400"
              >
                <span className="text-lg font-semibold">Show Less</span>
                <ChevronsUp
                  size={40}
                  className="transition-transform duration-300 hover:-translate-y-1"
                />
              </button>
            ) : (
              <button
                onClick={() => setShow(show + 8)}
                className="flex items-center gap-2 px-4 py-2 transition-all hover:text-green-500"
              >
                <span className="text-lg font-semibold">Load More</span>
                <ChevronsDown
                  size={40}
                  className="transition-transform duration-300 hover:translate-y-1"
                />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Promo Section */}
      {!token && (
        <div className="px-4 lg:px-10 py-6">
          <Promo />
        </div>
      )}

      {/* Features */}
      <Features />

      {/* Newsletter */}
      <Newsletter />
    </div>
  );
};

export default Home;

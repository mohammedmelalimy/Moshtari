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

      {/* Slider */}
      <div className="mb-6 ">
        <HomeSlider />
      </div>

      {/* Categories */}
      {token && (
        <div className="px-6 md:px-24 py-6" data-aos="fade-right">
          <h3 className="text-2xl md:text-4xl font-extrabold mb-4">Discover Our Categories</h3>
          <CategoriesSlider />
        </div>
      )}

      {/* Products */}
      <div className="px-6 md:px-24 py-6" data-aos="fade-up" id="next-section">
        <h3 className="text-2xl md:text-4xl font-extrabold mb-4">
          {token ? 'Our Products' : 'Trending Products'}
        </h3>

        {token ? (
          <Products show={show} setLoading={setLoading} />
        ) : (
          <MainProducts show={show} setLoading={setLoading} />
        )}

        {/* Load More Button */}
        {!loading && (
          <div className="flex justify-center mt-8">
            {show > 40 ? (
              <button
                onClick={() => setShow(8)}
                className="
          group
          flex items-center gap-3 px-6 py-3
          rounded-xl border border-red-400/50
          text-red-500 font-semibold
          shadow-md shadow-red-300/20
          transition-all duration-300
          hover:bg-red-500 hover:text-white
        "
              >
                <span className="text-lg">Show Less</span>
                <ChevronsUp
                  size={32}
                  className="transition-transform duration-300 group-hover:-translate-y-1"
                />
              </button>
            ) : (
              <button
                onClick={() => setShow(show + 8)}
                className="
          group
          flex items-center gap-3 px-6 py-3
          rounded-xl border border-pink-400/50
          text-pink-200 font-semibold
          shadow-md shadow-green-300/20
          transition-all duration-300
          hover:bg-rose-500 hover:text-white
        "
              >
                <span className="text-lg">Load More</span>
                <ChevronsDown
                  size={32}
                  className="transition-transform duration-300 group-hover:translate-y-1"
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

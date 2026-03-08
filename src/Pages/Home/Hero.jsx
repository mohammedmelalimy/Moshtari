import React from 'react';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <main
      className={`
        min-h-screen
        bg-white
        dark:bg-black
      `}
    >
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6">
        <h1
          className={`
    text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl
    font-extrabold leading-snug md:leading-tight
    text-gray-900 dark:text-gray-100
    text-center
  `}
        >
          <span className="block mb-2 sm:mb-3">Discover Your Style</span>
          <span
            className="
      block
      bg-clip-text text-transparent
      bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600
      dark:from-purple-400 dark:via-pink-500 dark:to-red-500
      drop-shadow-md
    "
          >
            Fashion • Electronics • Shoes
          </span>
        </h1>

        <p
          className="
    text-center
    text-gray-600 dark:text-gray-300
    max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl
    mt-4 sm:mt-5 md:mt-6
    text-base sm:text-lg md:text-xl
    leading-relaxed md:leading-loose
  "
        >
          Shop the latest trends in clothing, explore cutting-edge electronics, and find the perfect
          pair of shoes — all in one place with amazing deals and fast delivery.
        </p>

        <div className="flex flex-wrap gap-5 mt-10 justify-center">
          {/* Shop Now Button */}
          <Link
            to="/authUser/products"
            className={`
      px-6 py-4 rounded-2xl
      bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600
      text-white font-semibold uppercase tracking-wide
      shadow-lg hover:scale-105 hover:shadow-xl
      transition-all duration-300 ease-in-out
      dark:from-purple-500 dark:via-pink-500 dark:to-red-500
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400
    `}
          >
            Shop Now
          </Link>

          {/* Show Categories Button */}
          <Link
            to="/authUser/categories"
            className={`
              px-6 py-4 rounded-2xl border border-gray-300
              backdrop-blur bg-white/30 dark:bg-gray-800/30
              text-gray-800 dark:text-gray-200
              hover:bg-white/70 dark:hover:bg-purple-600/80
              hover:text-white dark:hover:text-white
              shadow-md hover:shadow-lg
              transition-all duration-300 ease-in-out
              uppercase font-semibold tracking-wide
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-400
            `}
          >
            Show Categories
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Hero;

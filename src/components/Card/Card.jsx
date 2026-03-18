import React from 'react';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Card = ({ product, onAddToCart, onAddToWishlist }) => {
  return (
    <div className="relative border rounded-xl overflow-hidden shadow-lg bg-white dark:bg-black border-gray-200 dark:border-gray-800 transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 group">
      {/* Product Link */}
      <Link
        to={`/authUser/details/${product.id}`}
        // onClick={() => window.scrollTo(0, 0)}
        className="block h-full"
      >
        {/* Product Image */}
        <div className="relative w-full h-56 md:h-64 overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-cover rounded-t-xl transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-2 p-3">
          <h2 className="font-semibold text-lg text-gray-800 dark:text-gray-100 truncate">
            {product.title}
          </h2>

          <div className="flex flex-col justify-between bg-gray-100 dark:bg-gray-900 p-3 rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-gray-700 dark:text-gray-300 font-semibold text-sm bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded">
                {product.brand.name}
              </h4>
              <h5 className="text-gray-600 dark:text-gray-400 font-medium text-sm">
                {product.category.name}
              </h5>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span key={i} className="text-yellow-400 text-sm">
                    {product.ratingsAverage >= i ? '★' : '☆'}
                  </span>
                ))}
                <span className="text-gray-500 dark:text-gray-400 ml-1 text-sm">
                  {product.ratingsAverage.toFixed(1)}
                </span>
              </div>
              <span className="text-purple-600 dark:text-purple-400 font-bold text-lg">
                EGP {product.price}
              </span>
            </div>
          </div>
        </div>
      </Link>

      {/* Add to Cart & Wishlist Buttons */}
      <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
        {/* Add To Cart */}
        <button
          onClick={() => onAddToCart(product.id)}
          className="bg-purple-600 dark:bg-purple-500 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-purple-700 dark:hover:bg-purple-600 shadow-lg transform hover:scale-110 transition"
        >
          +
        </button>

        {/* Wishlist */}
        <button
          onClick={() => onAddToWishlist(product.id)}
          className="bg-pink-500 dark:bg-pink-600 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-pink-600 dark:hover:bg-pink-500 shadow-lg transform hover:scale-110 transition"
        >
          <Heart className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

// Memoize Card to avoid unnecessary re-renders
export default React.memo(Card);

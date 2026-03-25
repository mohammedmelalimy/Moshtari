import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ShoppingCart, Star, Heart, ArrowRight } from 'lucide-react'; // Modern icons

const Card = ({ product }) => {
  // DummyJSON usually provides 'thumbnail' as the main image
  const mainImage = product.thumbnail || product.images[0];

  return (
    <div className="group relative flex flex-col w-full bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:-translate-y-2">
      {/* --- Image Section --- */}
      <div className="relative aspect-square overflow-hidden bg-gray-50 dark:bg-zinc-800">
        {/* Discount Badge (if exists in dummy data) */}
        {product.discountPercentage > 0 && (
          <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
            -{Math.round(product.discountPercentage)}%
          </div>
        )}

        {/* Wishlist Button */}
        <button
          className="absolute top-3 right-3 z-10 p-2 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md rounded-full text-gray-400 hover:text-red-500 transition-colors shadow-sm cursor-pointer"
          onClick={(e) => {
            e.preventDefault();

            toast.info('Join Moshtari to start shopping! 🛍️');
          }}
        >
          <Heart size={18} />
        </button>

        <Link to={`/authUser/details/${product.id}`}>
          <img
            src={mainImage}
            alt={product.title}
            className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
        </Link>
      </div>

      {/* --- Content Section --- */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
            {product.category}
          </span>
          {/* Rating */}
          <div className="flex items-center gap-1 bg-gray-100 dark:bg-zinc-800 px-2 py-0.5 rounded-lg">
            <Star size={12} className="text-yellow-500 fill-yellow-500" />
            <span className="text-xs font-semibold dark:text-gray-300">
              {product.rating || 4.5}
            </span>
          </div>
        </div>

        <Link to={`/authUser/details/${product.id}`} className="block mb-2">
          <h2 className="font-bold text-gray-800 dark:text-zinc-100 group-hover:text-indigo-600 transition-colors line-clamp-1">
            {product.title}
          </h2>
        </Link>

        {/* Pricing & CTA */}
        <div className="mt-auto flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-xl font-black text-gray-900 dark:text-white">
              {product.price} <span className="text-yellow-400 text-sm">EGP</span>
            </span>
            {product.discountPercentage > 0 && (
              <span className="text-xs text-gray-400 line-through">
                ${Math.round(product.price * (1 + product.discountPercentage / 100))}
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();

              toast.info('Join Moshtari to start shopping! 🛍️');
            }}
            className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-2xl transition-all active:scale-90 cursor-pointer shadow-lg shadow-indigo-200 dark:shadow-none"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;

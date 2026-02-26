import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const Card = ({ product }) => {

  return (
    <div className="relative border rounded-xl overflow-hidden shadow-md bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-transform transform hover:scale-105 hover:shadow-xl duration-300 group">
      
      {/* Product Link */}
      <Link to={`/authUser/details/${product.id}`}>
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
        <div className="p-4 flex flex-col gap-1">
          <h2 className="font-semibold text-lg text-gray-800 dark:text-gray-100 truncate">
            {product.title}
          </h2>
          <p className="text-green-600 dark:text-green-400 font-bold">${product.price}</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{product.category}</p>
        </div>
      </Link>

      {/* Add to Cart Button */}
      <button
        onClick={()=>toast("Join us! Login or create an account to continue 🎉")}
        className="absolute top-3 right-3 bg-green-600 dark:bg-green-500 text-white rounded-full w-10 h-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-300 hover:bg-green-700 dark:hover:bg-green-600 shadow-md"
      >
        +
      </button>
    </div>
  );
};

export default Card;
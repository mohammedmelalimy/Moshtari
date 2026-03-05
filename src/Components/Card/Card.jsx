import { Heart } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { addProductToCart } from "../../store/thunk/cart/addToCart";
import { fetchUserCart } from "../../store/thunk/userCart";
import { addToWishlist, fetchUserWishlist } from "../../store/thunk/Wishlist";
const Card = ({ product }) => {
  const dispatch=useDispatch();
  const cartItems = useSelector((state) => state.cart.cart?.numberOfItems || 0);
  const wishItems = useSelector((state) => state.wishlist.wishlist);
  useEffect(() => {
    // Fetch cart whenever number of items changes
    dispatch(fetchUserCart());
  }, [dispatch, cartItems]);
  
  
  return (
    <div className="relative border rounded-xl overflow-hidden shadow-md bg-white dark:bg-black border-gray-200 dark:border-gray-700 transition-transform transform hover:scale-105 hover:shadow-xl duration-300 group">
      
      {/* Product Link */}
      <Link to={`/authUser/details/${product.id}`} onClick={() => window.scrollTo(0, 0)} className="block h-full">
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
        <div className="flex flex-col gap-1">
          <h2 className="font-semibold text-lg text-gray-800 dark:text-gray-100 truncate px-2">
            {product.title}
          </h2>

          <div className="flex flex-col justify-between bg-black dark:bg-slate-700 p-2 rounded-sm">
            <h4 className="text-white dark:text-white font-bold text-sm">{product.brand.name}</h4>
            <h5 className="text-white dark:text-white font-bold text-sm">{product.category.name}</h5>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center ">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span key={i} className={`text-yellow-400 text-sm`}>
                    {product.ratingsAverage >= i ? '★' : '☆'}
                  </span>
                ))}
                {/* Rating number */}
                <span className="text-gray-400 dark:text-gray-500 ml-1">{product.ratingsAverage}</span>
              </div>
              {/* Price */}
              <span className="text-amber-400 dark:text-green-500 font-bold text-lg ml-2">
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
          onClick={() => {
            dispatch(addProductToCart(product.id));
            dispatch(fetchUserWishlist());
            toast("Product added to cart");
          }}
          className="bg-green-600 dark:bg-green-500 text-white rounded-full w-10 h-10 flex items-center justify-center 
          hover:bg-green-700 dark:hover:bg-green-600 shadow-lg transform hover:scale-110 transition"
        >
          +
        </button>

        {/* Wishlist */}
        <button
          onClick={() => {
            dispatch(addToWishlist(product.id));
            console.log("Added to wishlist:",wishItems );
            toast("Product added to wishlist");
          }}
          className="bg-pink-500 dark:bg-pink-500 text-white rounded-full w-10 h-10 flex items-center justify-center 
          hover:bg-pink-600 shadow-lg transform hover:scale-110 transition"
        >
          <Heart className="w-6 h-6" />
        </button>

      </div>
    </div>
  );
};

export default Card;
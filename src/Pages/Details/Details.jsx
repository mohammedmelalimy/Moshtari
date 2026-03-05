import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Circles } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { addProductToCart } from "../../store/thunk/cart/addToCart";

const Details = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  
  
  const getProductById = async () => {
    const res = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
    return res.data.data;
  };
  
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["productDetails", id],
    queryFn: getProductById,
  });
  
  const getSimilarProducts = async () => {
    const res = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?category=${data?.category?._id}`);
    return res.data.data;
  };


  const { data: similarProducts } = useQuery({
    queryKey: ["similarProducts", data?.category?._id],
    queryFn: getSimilarProducts,
    enabled: !!data?.category?._id,
  });


  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Circles height="80" width="80" color="#4fa94d" />
      </div>
    );
  }

  if (isError) {
    return <div className="text-red-500">{error.message}</div>;
  }


  return (
    <div className="min-h-screen p-6 dark:bg-black dark:text-white">
      <div className="container mx-auto bg-white dark:bg-black shadow-lg p-6 rounded-lg flex flex-col md:flex-row gap-6">
        <img
          src={data.images?.[0] || data.thumbnail}
          alt={data.title}
          className="w-full md:w-1/2 h-64 md:h-80 object-cover rounded"
        />
        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-bold">{data.title}</h1>

          <p className="text-gray-600 dark:text-gray-300 text-sm">
            {data.description}
          </p>

          <p className="text-green-600 dark:text-green-400 text-2xl font-bold">
            Price: ${data.price}
          </p>

          <div className="flex items-center ">
            {[1, 2, 3, 4, 5].map((i) => (
              <span key={i} className={`text-yellow-400 text-sm`}>
                {data.ratingsAverage >= i ? '★' : '☆'}
              </span>
            ))}
            {/* Rating number */}
            <span className="text-gray-400 dark:text-gray-500 ml-1">{data.ratingsAverage}</span>
          </div>

          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Category: {data.category.name}
          </p>

          <button
            className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg 
            hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 
            transition-all duration-300 shadow"
            onClick={() => dispatch(addProductToCart(id))}
          >
            Add to Cart
          </button>
        </div>
      </div>
      {/* similar Products */}
      <h1 className="text-white text-2xl font-bold mt-6">Similar Products</h1>
        {similarProducts && similarProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            {similarProducts.map((product) => (
              <Link to={`/authUser/details/${product.id}`} key={product._id} className="bg-white dark:bg-black shadow-lg p-4 rounded-lg">
                <img
                  src={product.images?.[0] || product.thumbnail}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded"
                />
                <h2 className="text-lg font-bold mt-2">{product.title}</h2>
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
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No similar products found.</p>
        )}
    </div>
  );
};

export default Details;
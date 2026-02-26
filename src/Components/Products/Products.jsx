import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Circles } from "react-loader-spinner";
import { Link } from "react-router-dom";

const Products = () => {

  const fetchProducts = async () => {
    const res = await axios.get("https://dummyjson.com/products");
    const data = await res.data;
    return data.products;
  };

  const { data = [], isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Circles height="80" width="80" color="#4fa94d" />
      </div>
    );
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="min-h-screen p-6 dark:bg-gray-900 dark:text-white">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 shadow transition
            bg-white border-gray-200 hover:shadow-lg relative group
              dark:bg-gray-800 dark:border-gray-700 dark:hover:shadow-gray-700">
            <Link 
              to={`/authUser/details/${product.id}`}>
              <img
                src={product.images[0] || product.thumbnail}
                alt={product.title}
                className="w-full h-48 object-cover mb-2 rounded"
              />
              <h1 className="font-semibold text-lg">{product.title}</h1>
              <p className="text-green-600 font-bold">${product.price}</p>
              <p className="text-gray-500 text-sm">{product.category}</p>
              <p className="text-yellow-500">⭐ {product.rating}</p>
            </Link>
            <div>
              <button className="bg-green-600 text-white py-2 px-4 rounded mt-2 absolute top-2 right-2 
                opacity-0 
                group-hover:opacity-100  group-hover:translate-x-2
                transition-all duration-300 
                cursor-pointer hover:bg-green-700">
                +
              </button>
            </div>
          </div>

        ))}
      </div>
    </div>
  );
};

export default Products;
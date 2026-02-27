import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Circles } from "react-loader-spinner";
import { useParams } from "react-router-dom";

const Details = () => {
  const { id } = useParams();

  const getProductById = async () => {
    const res = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
    return res.data.data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["productDetails", id],
    queryFn: getProductById,
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
    <div className="min-h-screen p-6 dark:bg-gray-900 dark:text-white">
      <div className="container mx-auto bg-white dark:bg-gray-800 shadow-lg p-6 rounded-lg 
          flex flex-col md:flex-row gap-6">


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

          <p className="text-yellow-500 font-semibold">
            ⭐ Rating: {data.rating}
          </p>

          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Category: {data.category.name}
          </p>

          <button
            className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg 
            hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 
            transition-all duration-300 shadow"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Details;
import { Circles } from "react-loader-spinner";
import useAllCategories from "../../customHooks/useAllCategories";

const Categories = () => {
  
  const { isLoading, isError, error, data } = useAllCategories()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Circles height="80" width="80" color="#4fa94d" />
      </div>
    );
  }

  if (isError) {
    return <div className="text-center text-red-500">{error.message}</div>;
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 dark:text-white transition-colors">

      <h1 className="text-3xl font-bold mb-8 text-center text-green-700 dark:text-green-400">
        Our Categories
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">

        {data.data.data.map((category) => (
          <div
            key={category._id}
            className="flex flex-col items-center gap-3 p-4 rounded-xl shadow-md bg-white hover:shadow-lg
            dark:bg-gray-800 dark:hover:shadow-gray-700 transition-all duration-300 cursor-pointer"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-48 h-48 object-contain"
            />

            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              {category.name}
            </h4>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Categories;
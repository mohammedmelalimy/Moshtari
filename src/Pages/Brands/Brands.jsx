import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';
import { Circles } from 'react-loader-spinner';

const Brands = () => {
  const getAllBrands = async () => {
    const res = await axios.get('https://ecommerce.routemisr.com/api/v1/brands');
    return res.data;
  };
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ['brands'],
    queryFn: getAllBrands
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Circles height="80" width="80" color="#a94d8a" />
      </div>
    );
  }

  if (isError) {
    return <div className="text-center text-red-500">{error.message}</div>;
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-black dark:text-white transition-colors">
      <h1 className="text-3xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
        Our Brands
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {data.data.map((brand) => (
          <div
            key={brand._id}
            className="flex flex-col items-center gap-3 p-4 rounded-xl shadow-md bg-white hover:shadow-lg
            dark:bg-black dark:hover:shadow-gray-700 transition-all duration-300 cursor-pointer"
          >
            <img src={brand.image} alt={brand.name} className="w-28 h-28 object-contain" />

            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{brand.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Brands;

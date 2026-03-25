import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Circles } from 'react-loader-spinner';
import MainCard from '../../components/Card/MainCard';
import Card from '../../components/Card/MainCard';
const MainProducts = ({ show }) => {
  const fetchProducts = async () => {
    const res = await axios.get('https://dummyjson.com/products');
    return res.data;
  };

  const {
    data = [],
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['mainProducts'],
    queryFn: fetchProducts
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Circles height="80" width="80" color="#a94d8a" />
      </div>
    );
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  const displayedProducts = data.products.slice(0, show);

  return (
    <div className="min-h-screen p-6 dark:bg-black dark:text-white">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayedProducts.map((product) => (
          <div key={product.id}>
            <Card product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainProducts;

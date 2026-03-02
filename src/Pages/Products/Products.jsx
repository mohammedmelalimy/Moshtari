import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Circles } from "react-loader-spinner";
import Card from "../../Components/Card/Card";

const Products = ({show}) => {

  const fetchProducts = async () => {
    const res = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
    return res.data.data;
  };

  const { data = [], isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const displayedProducts = data.slice(0, show);
  
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
        {displayedProducts.map((product) => (
          <div key={product.id}>
            <Card product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
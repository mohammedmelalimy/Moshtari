import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { shuffle } from "lodash";
import { Circles } from "react-loader-spinner";
import { useLocation } from "react-router-dom";
import Card from "../../Components/Card/Card";
import Sidebar from "../../Components/Sidebar/Sidebar";
const Products = ({show}) => {
  const location = useLocation();
  const fetchProducts = async () => {
    const res = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
    return res.data.data;
  };

  const { data = [], isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    select: (data) => shuffle(data),
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
    <div className="min-h-screen dark:bg-black dark:text-white flex flex-col md:flex-row gap-6 transition-colors">
      
      {/* Sidebar */}
      {location.pathname === "/authUser/products" && <Sidebar />}

      {/* Products Grid */}
      <div className="flex-1 container mx-auto p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <Card product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { shuffle } from 'lodash';
import { Circles } from 'react-loader-spinner';
import { useLocation } from 'react-router-dom';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import Card from '../../components/Card/Card';
import Sidebar from '../../components/Sidebar/SideBar.jsx';
import { addProductToCart } from '../../store/thunk/cart/addToCart';
import { fetchUserCart } from '../../store/thunk/userCart';
import { addToWishlist, fetchUserWishlist } from '../../store/thunk/Wishlist';

const Products = ({ show }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const fetchProducts = async () => {
    const res = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
    return res.data.data;
  };

  const {
    data = [],
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    select: (data) => shuffle(data)
  });

  const displayedProducts = data.slice(0, show);

  // Stable add-to-cart handler
  const handleAddToCart = useCallback(
    async (id) => {
      await dispatch(addProductToCart(id));
      dispatch(fetchUserCart()); // optional: update cart UI
      toast.success('Product added to cart');
    },
    [dispatch]
  );

  // Stable add-to-wishlist handler
  const handleAddToWishlist = useCallback(
    async (id) => {
      await dispatch(addToWishlist(id));
      dispatch(fetchUserWishlist());
      toast.info('Product added to wishlist');
    },
    [dispatch]
  );

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
      {location.pathname === '/authUser/products' && <Sidebar />}

      {/* Products Grid */}
      <div className="flex-1 container mx-auto p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedProducts.map((product) => (
            <Card
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onAddToWishlist={handleAddToWishlist}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;

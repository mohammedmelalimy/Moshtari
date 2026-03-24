import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Circles } from 'react-loader-spinner';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import Card from '../../components/Card/Card';
import { addProductToCart } from '../../store/thunk/cart/addToCart';
import { fetchUserCart } from '../../store/thunk/userCart';
import { toast } from 'react-toastify';
import { useCallback } from 'react';

const API = 'https://ecommerce.routemisr.com/api/v1';

/* ----------------------------------------------
   Component
------------------------------------------------ */

export default function Details() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const handleAddToCart = useCallback(
    async (id) => {
      await dispatch(addProductToCart(id));
      await dispatch(fetchUserCart());
      toast.success('Product added to cart');
    },
    [dispatch]
  );

  /* Fetch Product */
  const {
    data: product,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['productDetails', id],
    queryFn: () => axios.get(`${API}/products/${id}`).then((res) => res.data.data)
  });

  const categoryId = product?.category?._id;

  /* Fetch Similar Products */
  const { data: similarProducts = [] } = useQuery({
    queryKey: ['similarProducts', categoryId],
    queryFn: () => axios.get(`${API}/products?category=${categoryId}`).then((res) => res.data.data),
    enabled: !!categoryId,
    staleTime: 5 * 60 * 1000
  });

  /* Slider Settings */
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 4 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } }
    ]
  };

  /* Loading */
  if (isLoading)
    return (
      <div className="flex justify-center py-20">
        <Circles color="#a94d8a" />
      </div>
    );

  /* Error */
  if (isError) return <div className="text-red-500 text-center py-10">{error.message}</div>;

  return (
    <div className="min-h-screen p-6 dark:bg-black dark:text-white">
      {/* PRODUCT SECTION */}
      <div className="container mx-auto bg-white dark:bg-black p-6 rounded-lg flex flex-col md:flex-row gap-6">
        {/* Product Images */}
        <div className="w-full md:w-1/3">
          {product.images?.length > 1 ? (
            <Slider dots infinite speed={500} slidesToShow={1} slidesToScroll={1}>
              {product.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={product.title}
                  className="w-full h-64 md:h-72 object-cover rounded"
                />
              ))}
            </Slider>
          ) : (
            <img
              src={product.images?.[0] || product.thumbnail}
              alt={product.title}
              className="w-full h-64 md:h-72 object-cover rounded"
            />
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-4 justify-center">
          <h1 className="text-3xl font-bold">{product.title}</h1>

          <p className="text-gray-600 dark:text-gray-300">{product.description}</p>

          <p className="text-indigo-500 dark:text-indigo-400 text-2xl font-bold">
            Price: ${product.price}
          </p>

          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((i) => (
              <span key={i} className="text-yellow-400 text-sm">
                {product.ratingsAverage >= i ? '★' : '☆'}
              </span>
            ))}
            <span className="ml-1 text-gray-500">{product.ratingsAverage}</span>
          </div>

          <p className="text-gray-500 dark:text-gray-400">Category: {product.category?.name}</p>

          <button
            className="px-6 py-2 bg-indigo-500 text-white font-semibold rounded-lg 
                       hover:bg-indigo-700 transition-all shadow"
            onClick={() => handleAddToCart(id)}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* SIMILAR PRODUCTS */}
      <div className="container mx-auto mt-10">
        <h2 className="text-4xl font-bold mb-8">Similar Products</h2>

        {similarProducts.length > 0 ? (
          <div className="relative px-12">
            <Slider {...sliderSettings}>
              {similarProducts.map((p) => (
                <div key={p._id} className="px-2">
                  <Card product={p} />
                </div>
              ))}
            </Slider>
          </div>
        ) : (
          <p className="text-gray-500 text-center">No similar products found.</p>
        )}
      </div>
    </div>
  );
}

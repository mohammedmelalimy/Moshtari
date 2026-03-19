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
import { useCallback, useMemo } from 'react';

const API = 'https://ecommerce.routemisr.com/api/v1';

// ---------------------------
// API Services
// ---------------------------

const fetchProduct = async (id) => {
  const res = await axios.get(`${API}/products/${id}`);
  return res.data.data;
};

const fetchSimilar = async ({ queryKey }) => {
  const [, categoryId] = queryKey;
  const res = await axios.get(`${API}/products?category=${categoryId}`);
  return res.data.data;
};

// ---------------------------
// Component
// ---------------------------

export default function Details() {
  const { id } = useParams();
  const dispatch = useDispatch();

  // Add To Cart Handler (memoized)
  const handleAddToCart = useCallback(
    async (id) => {
      await dispatch(addProductToCart(id));
      await dispatch(fetchUserCart());
      toast.success('Product added to cart');
    },
    [dispatch]
  );

  // Fetch product details
  const {
    data: product,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['productDetails', id],
    queryFn: () => fetchProduct(id)
  });

  // Similar products query (dependent)
  const categoryId = product?.category?._id;

  const { data: similarProducts = [] } = useQuery({
    queryKey: ['similarProducts', categoryId],
    queryFn: fetchSimilar,
    enabled: !!categoryId,
    staleTime: 1000 * 60 * 5 // 5 min caching
  });

  const sliderSettings = useMemo(
    () => ({
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 3000,
      responsive: [
        { breakpoint: 1280, settings: { slidesToShow: 5 } },
        { breakpoint: 1024, settings: { slidesToShow: 4 } },
        { breakpoint: 768, settings: { slidesToShow: 3 } },
        { breakpoint: 480, settings: { slidesToShow: 2 } }
      ]
    }),
    []
  );

  // ---------------------------
  // Loading UI
  // ---------------------------
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Circles height="80" width="80" color="#a94d8a" />
      </div>
    );
  }

  // ---------------------------
  // Error State
  // ---------------------------
  if (isError) {
    return <div className="text-red-500">{error.message}</div>;
  }

  // ---------------------------
  // Render
  // ---------------------------
  return (
    <div className="min-h-screen p-6 dark:bg-black dark:text-white">
      <div className="container mx-auto bg-white dark:bg-black p-6 rounded-lg flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3">
          {product.images?.length > 1 ? (
            <Slider
              dots={true}
              infinite={true}
              speed={500}
              slidesToShow={1}
              slidesToScroll={1}
              autoplay={true}
              autoplaySpeed={3000}
              className="rounded"
            >
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${product.title} - ${index}`}
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

        <div className="flex flex-col gap-4  justify-center">
          <h1 className="text-3xl font-bold">{product.title}</h1>

          <p className="text-gray-600 dark:text-gray-300 text-sm">{product.description}</p>

          <p className="text-indigo-500 dark:text-indigo-400 text-2xl font-bold">
            Price: ${product.price}
          </p>

          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((i) => (
              <span key={i} className="text-yellow-400 text-sm">
                {product.ratingsAverage >= i ? '★' : '☆'}
              </span>
            ))}
            <span className="text-gray-400 dark:text-gray-500 ml-1">{product.ratingsAverage}</span>
          </div>

          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Category: {product.category?.name}
          </p>

          <button
            className="px-6 py-2 bg-indigo-500 text-white font-semibold rounded-lg 
            hover:bg-indigo-700 
            transition-all duration-300 shadow cursor-pointer"
            onClick={() => handleAddToCart(id)}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Similar products */}
      <div className="container mx-auto mt-10">
        <h2 className="text-4xl font-bold mb-8">Similar Products</h2>
      </div>

      {similarProducts.length > 0 ? (
        <div className="grid grid-cols-1 container mx-auto gap-4">
          <Slider {...sliderSettings}>
            {similarProducts.map((product) => (
              <Card key={product._id} product={product} />
            ))}
          </Slider>
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">No similar products found.</p>
      )}
    </div>
  );
}

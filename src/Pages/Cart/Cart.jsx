import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearCart } from "../../store/thunk/cart/clearCart";
import { deleteProduct } from "../../store/thunk/cart/deleteProduct";
import { updateQuantity } from "../../store/thunk/cart/updateQuantity";

const Cart = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.cart?.cart?.data?.products || []);
  const numOfCartItems = useSelector((state) => state.cart?.cart?.numOfCartItems || 0);
  const totalPrice = useSelector((state) => state.cart?.cart?.data?.totalCartPrice || 0);

  if (allProducts.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          Your cart is empty
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Looks like you haven’t added any products yet.
        </p>
        <Link
          to="/authUser/products"
          className="px-6 py-3 bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-500 text-white rounded-2xl transition-all duration-300 transform hover:scale-105"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">Your Shopping Cart</h1>

      {/* Cart Items */}
      <div className="overflow-x-auto rounded-xl shadow-md">
        <table className="min-w-full text-left text-gray-700 dark:text-gray-200">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="p-3">Product</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Price</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {allProducts.map((product) => (
              <tr
                key={product._id}
                className="bg-white dark:bg-gray-900 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <td className="flex items-center gap-3 p-3">
                  <img
                    src={product.product.imageCover}
                    alt={product.product.title}
                    className="w-16 h-16 object-contain rounded-lg"
                  />
                  <span className="font-semibold">{product.product.title}</span>
                </td>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            productId: product.product._id,
                            newCount: product.count - 1,
                          })
                        )
                      }
                      className="w-6 h-6 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                    >
                      -
                    </button>
                    <input
                      type="text"
                      value={product.count}
                      readOnly
                      className="w-12 text-center border-0 bg-transparent dark:text-gray-200 focus:outline-none"
                    />
                    <button
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            productId: product.product._id,
                            newCount: product.count + 1,
                          })
                        )
                      }
                      className="w-6 h-6 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="p-3 font-semibold">${(product.price || 0) * (product.count || 0)}</td>
                <td className="p-3">
                  <button
                    onClick={() => dispatch(deleteProduct(product.product._id))}
                    className="text-red-600 dark:text-red-400 hover:underline"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Invoice-style Summary Section */}
      <div className="max-w-3xl mx-auto mt-8 p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Order Summary</h2>

        {/* Totals */}
        <div className="flex flex-col gap-3">
          <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
            <span className="font-medium text-gray-700 dark:text-gray-200">Total Items</span>
            <span className="font-semibold text-gray-900 dark:text-gray-100">{numOfCartItems}</span>
          </div>
          <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
            <span className="font-medium text-gray-700 dark:text-gray-200">Total Price</span>
            <span className="font-semibold text-gray-900 dark:text-gray-100">${totalPrice.toFixed(2)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6 flex-wrap">
          <Link
            to="/authUser/payment"
            className="flex-1 text-center p-3 bg-green-700 dark:bg-green-600 hover:bg-green-800 dark:hover:bg-green-500 text-white font-semibold rounded-xl shadow-md transition-transform transform hover:scale-105"
          >
            Proceed to Payment
          </Link>
          <button
            onClick={() => dispatch(clearCart())}
            className="flex-1 text-center p-3 bg-red-700 dark:bg-red-600 hover:bg-red-800 dark:hover:bg-red-500 text-white font-semibold rounded-xl shadow-md transition-transform transform hover:scale-105"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
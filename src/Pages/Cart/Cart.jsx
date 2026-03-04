import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProduct } from "../../store/thunk/deleteProduct";
import { updateQuantity } from "../../store/thunk/updateQuantity";
const Cart = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.cart?.cart?.data?.products||[]);
  const numOfCartItems = useSelector((state)=> state.cart?.cart?.numOfCartItems || 0);
  const totalPrice = useSelector((state)=> state.cart?.cart?.data?.totalCartPrice || 0);
  if (allProducts.length === 0) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
        Your cart is empty
      </h2>
      <p className="text-gray-500 dark:text-gray-400 mb-4">
        Looks like you haven’t added any products yet.
      </p>
      <Link 
        to="/authUser/products" 
        className="px-6 py-2 bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-500 text-white rounded-xl transition-colors"
      >
        Browse Products
      </Link>
    </div>
  );
}
  
  return (
    <div className="overflow-x-auto container mx-auto">
      <table className="min-w-full border border-gray-200 dark:border-gray-700 text-sm text-left text-gray-700 dark:text-gray-200">
        <thead className="bg-gray-100 dark:bg-gray-800 sticky top-0 z-10">
          <tr>
            <th className="p-2 md:p-4">
              <span className="sr-only">Image</span>
            </th>
            <th className="p-2 md:p-4 font-medium">Product</th>
            <th className="p-2 md:p-4 font-medium">Qty</th>
            <th className="p-2 md:p-4 font-medium">Price</th>
            <th className="p-2 md:p-4 font-medium">Action</th>
          </tr>
        </thead>
        <tbody>
          {allProducts.map((product) => (          
          <tr className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800" key={product._id}>
            <td className="p-1 md:p-4">
              <img
                src={product.product.imageCover}
                alt={product.product.title}
                className="w-12 sm:w-16 md:w-24 object-contain"
              />
            </td>
            <td className="p-1 md:p-4 font-semibold">{product.product.title}</td>
            <td className="p-1 md:p-4">
              <div className="flex items-center gap-2">
                <button onClick={()=>{
                  dispatch(
                    updateQuantity(
                      { productId:product.product._id,
                        newCount:(product.count-1)
                      }))}}
                className="w-6 h-6 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600">
                  -
                </button>
                <input
                  type="text"
                  value={product.count}
                  className="w-12 text-center border-0 bg-transparent dark:text-gray-200 focus:outline-none"
                  readOnly
                  disabled={true}
                />
                <button onClick={()=>{
                  dispatch(
                    updateQuantity(
                      { productId:product.product._id,
                        newCount:(product.count+1)
                      }))}}
                className="w-6 h-6 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600">
                  +
                </button>
              </div>
            </td>
            <td className="p-1 md:p-4 font-semibold">
              ${ (product?.price || 0) * (product?.count || 0) }
            </td>
            <td className="p-1 md:p-4">
              <button 
              onClick={() => {
                dispatch(deleteProduct(product.product._id));
              }}
              className="text-red-600 dark:text-red-400 hover:underline">
                Remove
              </button>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
      <div className="flex flex-col items-end gap-2 mt-6">
        <div className="flex justify-between w-full max-w-xs bg-green-200 dark:bg-green-700 text-gray-800 dark:text-gray-100 rounded-lg p-3 shadow-md">
          <span className="font-medium">Total Items:</span>
          <span className="font-bold">{numOfCartItems}</span>
        </div>
        <div className="flex justify-between w-full max-w-xs bg-green-200 dark:bg-green-700 text-gray-800 dark:text-gray-100 rounded-lg p-3 shadow-md">
          <span className="font-medium">Total Price:</span>
          <span className="font-bold">${totalPrice}</span>
        </div>
      </div>
    </div>
  );
};

export default Cart;
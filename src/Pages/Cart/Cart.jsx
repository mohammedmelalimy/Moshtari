import { useDispatch, useSelector } from "react-redux";
import { updateQuantity } from "../../store/thunk/updateQuantity";
const Cart = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.cart?.cart?.data?.products||[]);
  
  
  
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
            <td className="p-1 md:p-4 font-semibold">${product.price}</td>
            <td className="p-1 md:p-4">
              <button className="text-red-600 dark:text-red-400 hover:underline">
                Remove
              </button>
            </td>
          </tr>))}
        </tbody>
      </table>
    </div>
  );
};

export default Cart;
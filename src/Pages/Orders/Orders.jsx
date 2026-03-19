import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate
import { getUserOrders } from '../../store/thunk/allOrders';

const AllOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // 2. Initialize navigate
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getUserOrders())
      .unwrap()
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [dispatch]);

  if (loading)
    return <div className="text-center py-20 dark:text-white text-2xl">Loading your orders...</div>;

  return (
    <div className="container mx-auto p-6 min-h-screen">
      {/* Header with Home Button */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Order History</h1>

        <button
          onClick={() => navigate('/authUser')}
          className="px-6 py-2 bg-slate-800 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg font-medium hover:opacity-90 transition-all shadow-md"
        >
          Back to Home
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 dark:bg-gray-900 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-800">
          <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
          <button
            onClick={() => navigate('/authUser')}
            className="text-red-600 font-semibold hover:underline"
          >
            Start Shopping Now →
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white dark:bg-gray-900 shadow-lg rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800"
            >
              {/* Order Header */}
              <div className="bg-gray-50 dark:bg-gray-800 p-4 flex flex-wrap justify-between items-center gap-4">
                <div>
                  <p className="text-sm text-gray-500">
                    Order ID:{' '}
                    <span className="font-mono text-slate-800 dark:text-gray-300">
                      #{order._id.slice(-8)}
                    </span>
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${order.isPaid ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}
                  >
                    {order.isPaid ? 'PAID' : 'PENDING'}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700 uppercase">
                    {order.paymentMethodType}
                  </span>
                </div>
              </div>

              {/* Items List */}
              <div className="p-4 divide-y divide-gray-100 dark:divide-gray-800">
                {order.cartItems.map((item) => (
                  <div key={item._id} className="py-4 flex items-center gap-4">
                    <img
                      src={item.product.imageCover}
                      alt={item.product.title}
                      className="w-16 h-16 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                    />
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold dark:text-white line-clamp-1">
                        {item.product.title}
                      </h3>
                      <p className="text-xs text-gray-500">Quantity: {item.count}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-slate-800 dark:text-white">{item.price} EGP</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total Footer */}
              <div className="p-4 bg-gray-50 dark:bg-gray-800/30 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Paid</p>
                <p className="text-xl font-black text-red-600">{order.totalOrderPrice} EGP</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllOrders;

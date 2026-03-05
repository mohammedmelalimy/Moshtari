import { useDispatch, useSelector } from "react-redux";
import { deleteFromWishlist } from "../../store/thunk/Wishlist";

const Wishlist = ({ open, setOpen }) => {
  const wishItems = useSelector((state) => state.wishlist.wishlist.data || []);
  const dispatch = useDispatch();

  return (
    <div>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-30 transition-opacity"        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-40 h-screen w-96 p-6 overflow-y-auto bg-white dark:bg-gray-900 
        shadow-xl border-l border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">My Wishlist</h2>
          <button
            onClick={() => setOpen(false)}
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Empty state */}
        {wishItems.length === 0 && (
          <div className="text-center mt-20">
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              Your wishlist is empty
            </p>
          </div>
        )}

        {/* Items */}
        {wishItems.map((item,index) => (
          <div key={item.id || index}
            className="flex items-center gap-4 mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <img
              src={item.imageCover}
              alt={item.title}
              className="w-16 h-16 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="text-md font-semibold text-gray-900 dark:text-white">{item.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">${item.price}</p>
            </div>
            <button onClick={()=>dispatch(deleteFromWishlist(item.id))} className="text-red-500 hover:text-red-700 transition">
              remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../store/slices/authSlice';

const Dropdown = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = useSelector((state) => state.auth.user);

  const dropdownRef = useRef();

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(logout());
    navigate('/login');
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!token) return null;

  return (
    <div ref={dropdownRef} className="relative">
      {/* Avatar Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`
          w-12 h-12 rounded-full 
          bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
          flex items-center justify-center
          shadow-lg hover:shadow-2xl
          transform hover:scale-110 hover:rotate-3
          transition-transform duration-300
          ring-2 ring-transparent hover:ring-white/30 dark:hover:ring-gray-300/30
        `}
      >
        <img
          className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-800"
          src={`https://ui-avatars.com/api/?name=${user.name}`}
          alt="User avatar"
        />
      </button>

      {/* Dropdown menu */}
      <div
        className={`
          absolute right-0 mt-3 z-20 w-72 rounded-xl shadow-xl border border-gray-300 dark:border-gray-600
          bg-white dark:bg-gray-900 overflow-hidden transform transition-all duration-200
          origin-top-right
          ${open ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}
        `}
      >
        {/* PROFILE */}
        <div className="p-4 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center gap-3">
          <img
            className="w-12 h-12 rounded-full border-2 border-white dark:border-gray-700"
            src={`https://ui-avatars.com/api/?name=${user.name}`}
            alt="User avatar"
          />
          <div className="flex flex-col">
            <h4 className="font-semibold text-gray-800 dark:text-white">{user.name}</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
          </div>
        </div>

        {/* MENU ITEMS */}
        <ul className="text-sm text-gray-700 dark:text-gray-200">
          <li>
            <button
              onClick={() => setOpen(false)}
              className="w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition flex items-center gap-2"
            >
              👤 My Profile
            </button>
          </li>
          <li>
            <Link
              to="/authUser/allorders"
              onClick={() => setOpen(false)}
              className="w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition flex items-center gap-2"
            >
              📦 Orders
            </Link>
          </li>
          <li className="border-t border-gray-300 dark:border-gray-600">
            <button
              onClick={handleLogout}
              className="w-full px-4 py-3 text-left text-red-600 dark:text-red-400 font-bold hover:bg-red-100 dark:hover:bg-red-900/20 rounded transition flex items-center gap-2"
            >
              🔓 Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;

import { User } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
          bg-linear-to-r from-blue-500 via-purple-500 to-pink-500
          dark:bg-gray-700
          flex items-center justify-center
          shadow-md hover:shadow-xl
          hover:scale-110 hover:rotate-3
          transition-transform duration-300
        `}
      >
        <User className="w-6 h-6 text-white dark:text-gray-200 drop-shadow" />
      </button>

      {/* Dropdown menu */}
      <div
        className={`absolute right-0 mt-3 z-20 w-72 rounded-xl shadow-xl border border-gray-300 dark:border-gray-600 
        bg-white dark:bg-black overflow-hidden transform transition-all duration-200
        ${open ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
      >
        {/* PROFILE */}
        <div className="p-4 bg-gray-100 dark:bg-gray-700 flex items-center gap-3">
          <img
            className="w-10 h-10 rounded-full"
            src={`https://ui-avatars.com/api/?name=${user.name}`}
            alt="User avatar"
          />
          <div>
            <h4 className="font-semibold text-gray-800 dark:text-white">{user.name}</h4>
            <p className="text-sm text-gray-500 dark:text-gray-300">{user.email}</p>
          </div>
        </div>

        {/* MENU ITEMS */}
        <ul className="text-sm text-gray-700 dark:text-gray-200">
          {['Account', 'Settings', 'Privacy', 'Notifications', 'Help Center'].map((item) => (
            <li key={item}>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 transition">
                {item}
              </button>
            </li>
          ))}

          <li className="border-t border-gray-300 dark:border-gray-600">
            <button
              onClick={handleLogout}
              className="w-full px-4 py-3 text-left text-red-600 dark:text-red-400 font-bold hover:bg-red-100 dark:hover:bg-red-900/20 transition"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;

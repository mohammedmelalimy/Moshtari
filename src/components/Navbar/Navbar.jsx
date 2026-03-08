import {
  Heart,
  Home,
  LayoutGrid,
  Menu,
  Moon,
  ShoppingBag,
  ShoppingBasket,
  ShoppingCart,
  SunDim,
  Tag,
  X
} from 'lucide-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { logout } from '../../store/slices/authSlice';
import { toggleTheme } from '../../store/slices/themeSlice';
import Dropdown from '../Dropdown/Dropdown';
import Wishlist from '../Wishlist/Wishlist';
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const theme = useSelector((state) => state.theme.isDark);
  const cartItems = useSelector((state) => state.cart.cart);
  const wishItems = useSelector((state) => state.wishlist.wishlist);

  return (
    <>
      <div className="sticky top-0 z-50 w-full bg-gray-100 dark:bg-black text-gray-900 dark:text-white transition-colors duration-300 border-b border-gray-300 dark:border-gray-700 py-1">
        <div className=" flex items-center justify-between h-16 px-4">
          {/* Left: Logo + Desktop Links */}
          <div className="flex items-center gap-10">
            {/* Logo */}
            <Link
              to={token ? '/authUser' : '/'}
              className="flex items-center gap-3 font-extrabold text-2xl"
            >
              <ShoppingBasket size={36} className="text-blue-500 drop-shadow-md" />
              <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-500 via-purple-500 to-pink-500">
                Moshtari
              </span>
            </Link>
            <div className="hidden lg:block">
              {token && (
                <nav className="flex text-black font-medium dark:text-white">
                  <NavLink
                    to="/authUser"
                    className="flex items-center gap-3 px-4 py-2 rounded-lg transition border-2 border-transparent hover:border-pink-500"
                  >
                    <Home size={18} />
                    Home
                  </NavLink>

                  <NavLink
                    to="/authUser/products"
                    className="flex items-center gap-3 px-4 py-2 rounded-lg transition border-2 border-transparent hover:border-pink-500"
                  >
                    <ShoppingBag size={18} />
                    Products
                  </NavLink>

                  <NavLink
                    to="/authUser/categories"
                    className="flex items-center gap-3 px-4 py-2 rounded-lg transition border-2 border-transparent hover:border-pink-500"
                  >
                    <LayoutGrid size={18} />
                    Categories
                  </NavLink>

                  <NavLink
                    to="/authUser/brands"
                    className="flex items-center gap-3 px-4 py-2 rounded-lg transition border-2 border-transparent hover:border-pink-500"
                  >
                    <Tag size={18} />
                    Brands
                  </NavLink>
                </nav>
              )}
            </div>
          </div>
          {/* Right: Theme + Cart + Dropdown */}
          <div className="flex items-center gap-4">
            {/* Theme Switch */}
            <span
              onClick={() => dispatch(toggleTheme())}
              className="cursor-pointer text-xl hover:scale-110 transition-transform"
            >
              {theme ? <SunDim size={24} /> : <Moon size={24} />}
            </span>

            {/* Cart + Wishlist */}
            {token && (
              <div className="flex items-center gap-6">
                {/* Wishlist */}
                <button
                  onClick={() => setOpen(true)}
                  className="relative flex items-center justify-center hover:text-pink-500 dark:hover:text-pink-400 transition-transform hover:scale-110"
                >
                  <Heart className="w-6 h-6" />

                  {wishItems.length > 0 && (
                    <span
                      className="
                      absolute -top-2 -right-2
                      bg-pink-400 dark:bg-pink-200 text-black text-xs font-bold
                      min-w-4.5 h-4.5
                      rounded-full flex items-center justify-center
                      px-1
                    "
                    >
                      {wishItems.length}
                    </span>
                  )}
                </button>

                {open && <Wishlist open={open} setOpen={setOpen} />}

                {/* Cart */}
                <Link
                  to="/authUser/cart"
                  className="relative flex items-center justify-center hover:text-pink-500 dark:hover:text-pink-400 transition-transform hover:scale-110"
                >
                  <ShoppingCart className="w-6 h-6" />

                  {cartItems?.numOfCartItems > 0 && (
                    <span
                      className="
                      absolute -top-2 -right-2
                      bg-pink-400 dark:bg-pink-200 text-black text-xs font-bold
                      min-w-4.5 h-4.5
                      rounded-full flex items-center justify-center
                      px-1
                    "
                    >
                      {cartItems.numOfCartItems}
                    </span>
                  )}
                </Link>

                {/* Welcome User */}
                <span className="hidden lg:block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Welcome 🖐️,{' '}
                  <span className="bg-linear-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text dark:from-purple-400 dark:to-pink-500">
                    {user?.name}
                  </span>
                </span>

                {/* Dropdown */}
                <div className="hidden md:flex">
                  <Dropdown />
                </div>
              </div>
            )}
            {/* Login Buttons */}
            {!token && (
              <div className="hidden md:flex gap-3 text-sm font-semibold">
                <Link
                  to="/login"
                  className="px-5 py-2 rounded-lg bg-linear-to-r from-purple-400 to-pink-500 
                 text-white shadow font-semibold 
                 hover:bg-pink-400 transition-all duration-300"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2 rounded-lg bg-linear-to-r from-purple-400 to-pink-500 
                 text-white shadow font-semibold 
                 hover:bg-purple-500 transition-all duration-300"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  Register
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <div className="block lg:hidden cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={26} /> : <Menu size={26} />}
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="block lg:hidden px-4 py-3 space-y-2 max-h-[calc(100vh-60px)] overflow-y-auto bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-t border-gray-200 dark:border-gray-700">
          {token ? (
            <>
              <NavLink
                className="block px-2 py-1 hover:text-green-500 transition"
                to="/authUser"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                className="block px-2 py-1 hover:text-green-500 transition"
                to="/authUser/products"
                onClick={() => setMenuOpen(false)}
              >
                Products
              </NavLink>
              <NavLink
                className="block px-2 py-1 hover:text-green-500 transition"
                to="/authUser/categories"
                onClick={() => setMenuOpen(false)}
              >
                Categories
              </NavLink>
              <Link
                className="block px-2 py-1 hover:text-green-500 transition"
                to="/authUser/cart"
                onClick={() => setMenuOpen(false)}
              >
                Cart
              </Link>
              <Link
                className="block px-2 py-1 text-red-700 hover:text-green-500 transition"
                to="/"
                onClick={() => {
                  setMenuOpen(false);
                  dispatch(logout());
                }}
              >
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link
                className="block px-2 py-1 hover:text-green-500 transition"
                to="/login"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                className="block px-2 py-1 hover:text-green-500 transition"
                to="/register"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;

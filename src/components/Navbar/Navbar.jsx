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
      {/* MAIN NAV */}
      <div className="sticky top-0 z-50 w-full bg-white dark:bg-black text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300 py-1">
        <div className="flex items-center justify-between h-16 px-4">
          {/* Left Section: Logo + Desktop Links */}
          <div className="flex items-center gap-10">
            {/* Logo */}
            <Link
              to={token ? '/authUser' : '/'}
              className="flex items-center gap-3 font-extrabold text-2xl"
            >
              <ShoppingBasket size={36} className="text-blue-600 drop-shadow-md" />
              <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-600 via-indigo-600 to-pink-500">
                Moshtari
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex">
              {token && (
                <nav className="flex text-gray-800 dark:text-gray-200 font-medium">
                  <NavLink
                    to="/authUser"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-transparent hover:border-indigo-500 dark:hover:border-pink-500 hover:text-indigo-600 dark:hover:text-pink-400 transition"
                  >
                    <Home size={18} /> Home
                  </NavLink>

                  <NavLink
                    to="/authUser/products"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-transparent hover:border-indigo-500 dark:hover:border-pink-500 hover:text-indigo-600 dark:hover:text-pink-400 transition"
                  >
                    <ShoppingBag size={18} /> Products
                  </NavLink>

                  <NavLink
                    to="/authUser/categories"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-transparent hover:border-indigo-500 dark:hover:border-pink-500 hover:text-indigo-600 dark:hover:text-pink-400 transition"
                  >
                    <LayoutGrid size={18} /> Categories
                  </NavLink>

                  <NavLink
                    to="/authUser/brands"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-transparent hover:border-indigo-500 dark:hover:border-pink-500 hover:text-indigo-600 dark:hover:text-pink-400 transition"
                  >
                    <Tag size={18} /> Brands
                  </NavLink>
                </nav>
              )}
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-5">
            {/* Theme Toggle */}
            <span
              onClick={() => dispatch(toggleTheme())}
              className="cursor-pointer text-xl hover:scale-110 transition-transform"
            >
              {theme ? (
                <SunDim size={26} className="text-yellow-400" />
              ) : (
                <Moon size={26} className="text-indigo-400" />
              )}
            </span>

            {/* Wishlist + Cart + User + Dropdown */}
            {token && (
              <div className="flex items-center gap-6">
                {/* Wishlist */}
                <button
                  onClick={() => setOpen(true)}
                  className="relative hover:text-pink-500 dark:hover:text-pink-400 transition-transform hover:scale-110"
                >
                  <Heart className="w-6 h-6 text-blue-600 dark:text-indigo-400" />

                  {wishItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-pink-500 dark:bg-pink-300 text-white text-xs font-semibold rounded-full min-w-4.5 h-4.5 flex items-center justify-center px-1">
                      {wishItems.length}
                    </span>
                  )}
                </button>

                {open && <Wishlist open={open} setOpen={setOpen} />}

                {/* Cart */}
                <Link
                  to="/authUser/cart"
                  className="relative hover:text-indigo-600 dark:hover:text-pink-400 transition-transform hover:scale-110"
                >
                  <ShoppingCart className="w-6 h-6 text-blue-600 dark:text-indigo-400" />

                  {cartItems?.numOfCartItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-indigo-400 dark:bg-indigo-200 text-black text-xs font-semibold rounded-full min-w-4.5 h-4.5 flex items-center justify-center px-1">
                      {cartItems.numOfCartItems}
                    </span>
                  )}
                </Link>

                {/* Welcome User */}
                <span className="hidden lg:block text-sm font-semibold">
                  Welcome 🖐️,
                  <span className="ml-1 bg-linear-to-r from-blue-600 to-pink-500 text-transparent bg-clip-text">
                    {user?.name}
                  </span>
                </span>

                {/* Dropdown */}
                <div className="hidden lg:block ">
                  <Dropdown />
                </div>
              </div>
            )}

            {/* Login Buttons */}
            {!token && (
              <div className="hidden md:flex gap-3 text-sm font-semibold">
                <Link
                  to="/login"
                  className="px-5 py-2 rounded-lg bg-linear-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500 transition"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="px-5 py-2 rounded-lg bg-linear-to-r from-indigo-600 to-pink-500 text-white hover:from-indigo-500 hover:to-pink-400 transition"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  Register
                </Link>
              </div>
            )}

            {/* Mobile Menu */}
            <div className="block lg:hidden cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="block lg:hidden px-4 py-3 space-y-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-t border-gray-200 dark:border-gray-700">
          {token ? (
            <>
              <NavLink
                className="block px-2 py-1 hover:text-indigo-600 dark:hover:text-pink-400"
                to="/authUser"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </NavLink>

              <NavLink
                className="block px-2 py-1 hover:text-indigo-600 dark:hover:text-pink-400"
                to="/authUser/products"
                onClick={() => setMenuOpen(false)}
              >
                Products
              </NavLink>

              <NavLink
                className="block px-2 py-1 hover:text-indigo-600 dark:hover:text-pink-400"
                to="/authUser/categories"
                onClick={() => setMenuOpen(false)}
              >
                Categories
              </NavLink>

              <NavLink
                className="block px-2 py-1 hover:text-indigo-600 dark:hover:text-pink-400"
                to="/authUser/brands"
                onClick={() => setMenuOpen(false)}
              >
                Brands
              </NavLink>

              <Link
                className="block px-2 py-1 hover:text-indigo-600 dark:hover:text-pink-400"
                to="/authUser/cart"
                onClick={() => setMenuOpen(false)}
              >
                Cart
              </Link>

              <Link
                className="block px-2 py-1 text-red-600 hover:text-indigo-600 dark:hover:text-pink-400"
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
                className="block px-2 py-1 hover:text-indigo-600 dark:hover:text-pink-400"
                to="/login"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>

              <Link
                className="block px-2 py-1 hover:text-indigo-600 dark:hover:text-pink-400"
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

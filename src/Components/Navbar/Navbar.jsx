import { Heart, Menu, Moon, ShoppingBasket, ShoppingCart, SunDim, X } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { toggleTheme } from "../../store/slices/themeSlice";
import Dropdown from "../Dropdown/Dropdown";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const theme = useSelector((state) => state.theme.isDark);
  const cartItems = useSelector((state) => state.cart.cart);
  const wishItems = useSelector((state) => state.wishlist.wishlist);

  return (
    <div
      className="
      sticky top-0 z-50
      bg-gray-100 dark:bg-black
      text-gray-900 dark:text-white
      transition-colors duration-300
    "
    >
      <div className=" mx-auto flex items-center justify-between py-4 px-4">
        {/* Left: Logo + Desktop Links */}
        <div className="flex items-center gap-10">
          {/* Logo */}
          <Link
            to={token ? "/authUser" : "/"}
            className="flex items-center gap-2 text-green-700 dark:text-green-400"
          >
            <ShoppingBasket size={36} />
            <p className="text-xl font-extrabold">Moshtari</p>
          </Link>

          {/* Desktop Links */}
          {/* {token && (
            <nav className="hidden md:flex gap-6 text-base font-medium">
              <NavLink
                className="hover:text-green-600 dark:hover:text-green-400 transition"
                to="/authUser"
              >
                Home
              </NavLink>
              <NavLink
                className="hover:text-green-600 dark:hover:text-green-400 transition"
                to="/authUser/products"
              >
                Products
              </NavLink>
              <NavLink
                className="hover:text-green-600 dark:hover:text-green-400 transition"
                to="/authUser/categories"
              >
                Categories
              </NavLink>
              <NavLink
                className="hover:text-green-600 dark:hover:text-green-400 transition"
                to="/authUser/brands"
              >
                Brands
              </NavLink>
            </nav>
          )} */}
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
              {/* Wishlist Icon */}
              <Link
                to="/authUser/wishlist"
                className="relative hover:text-green-500 dark:hover:text-green-400 transition"
              >
                <Heart className="w-6 h-6" />
                {wishItems.count > 0 && (
                  <span
                    className="
                    absolute -top-2 -right-3
                    bg-red-500 text-white text-xs
                    w-5 h-5 rounded-full
                    flex items-center justify-center
                  "
                  >
                    {wishItems.count}
                  </span>
                )}
              </Link>

              {/* Cart Icon */}
              <Link
                to="/authUser/cart"
                className="relative hover:text-green-500 dark:hover:text-green-400 transition"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartItems.numOfCartItems > 0 && (
                  <span
                    className="
                    absolute -top-2 -right-3
                    bg-red-500 text-white text-xs
                    w-5 h-5 rounded-full
                    flex items-center justify-center
                  "
                  >
                    {cartItems.numOfCartItems}
                  </span>
                )}
              </Link>

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
                className="px-5 py-2 rounded-lg bg-green-500 text-white shadow hover:bg-green-600 transition"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-5 py-2 rounded-lg bg-green-500 text-white shadow hover:bg-green-600 transition"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Register
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <div
            className="md:hidden cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="
          md:hidden px-4 py-3 space-y-3
          bg-white dark:bg-gray-900
          text-gray-900 dark:text-white
          border-t border-gray-200 dark:border-gray-700
        "
        >
          {token ? (
            <>
              <NavLink
                className="block hover:text-green-500 transition"
                to="/authUser"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                className="block hover:text-green-500 transition"
                to="/authUser/products"
                onClick={() => setMenuOpen(false)}
              >
                Products
              </NavLink>
              <NavLink
                className="block hover:text-green-500 transition"
                to="/authUser/categories"
                onClick={() => setMenuOpen(false)}
              >
                Categories
              </NavLink>
              <Link
                className="block hover:text-green-500 transition"
                to="/authUser/cart"
                onClick={() => setMenuOpen(false)}
              >
                Cart
              </Link>
            </>
          ) : (
            <>
              <Link
                className="block hover:text-green-500 transition"
                to="/login"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                className="block hover:text-green-500 transition"
                to="/register"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
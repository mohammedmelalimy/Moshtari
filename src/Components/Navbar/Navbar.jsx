import { Menu, ShoppingBasket, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../store/slices/authSlice";
import { toggleTheme } from "../../store/slices/themeSlice";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const theme = useSelector((state) => state.theme.isDark);
  const numOfCartItem = useSelector((state) => state.cart.cart);
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/");
    setMenuOpen(false);
  };

  return (
    <div className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white
    sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto flex items-center justify-between py-5 px-4 md:px-2">

        {/* Left: Logo + Desktop Links */}
        <div className="flex items-center gap-4 md:gap-16">
          {/* Logo */}
          <Link
            to={token?"/authUser":"/"}
            className="flex items-center gap-2 group text-green-800 dark:text-green-400"
          >
            <ShoppingBasket size={40} />
            <p className="text-2xl font-extrabold text-green-800 dark:text-green-400 transition-colors duration-300">
              Moshtari
            </p>
          </Link>

          {/* Desktop links */}
          {token &&  (
            <nav className="hidden md:flex gap-6 text-lg font-semibold">
              <NavLink
                to='/authUser'
                className="hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200"
              >
                Home
              </NavLink>
              <NavLink
                to="/authUser/products"
                className="hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200"
              >
                Products
              </NavLink>
              <NavLink
                to="/authUser/categories"
                className="hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200"
              >
                Categories
              </NavLink>
              <NavLink
                to="/authUser/brands"
                className="hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200"
              >
                Brands
              </NavLink>
            </nav>
          )}
        </div>

        {/* Right: Theme + Hamburger + Cart/Logout */}
        <div className="flex items-center gap-4 md:gap-6">

          {/* Theme switch */}
          <span
            onClick={() => dispatch(toggleTheme())}
            className="cursor-pointer text-2xl hover:scale-110 transition"
          >
            {theme ? "☀️" : "🌙"}
          </span>
                        {/* Cart Icon + Badge */}
              <Link
                to="/authUser/cart"
                className="relative flex items-center text-lg font-semibold hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200"
              >
                <ShoppingCart className="w-6 h-6" />

                {/* Badge */}
                {numOfCartItem.numOfCartItems > 0 && (
                  <span className="absolute -top-2 -right-3 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {numOfCartItem.numOfCartItems}
                  </span>
                )}
              </Link>
          {token && (
            <div className="hidden md:flex items-center gap-6">
            
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="bg-red-600 dark:bg-red-700 hover:bg-red-700 dark:hover:bg-red-800 px-5 py-2 rounded-xl text-white font-bold transition-colors duration-300 shadow-md"
              >
                Logout
              </button>
            </div>
          )}

          {!token && (
              <div className="hidden md:flex gap-4 text-lg font-semibold">
                <Link
                  to="/login"
                  className="px-6 py-2 rounded-xl font-bold shadow-md
                            bg-green-500 hover:bg-green-600 
                            dark:bg-green-600 dark:hover:bg-green-500 
                            text-white transition-all duration-200"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="px-6 py-2 rounded-xl font-bold shadow-md
                            bg-green-500 hover:bg-green-600 
                            dark:bg-green-600 dark:hover:bg-green-500
                            text-white transition-all duration-200"
                >
                  Register
                </Link>
              </div>
          )}

          {/* Hamburger Icon for mobile */}
          <div className="md:hidden cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-4 pb-4 space-y-3">
          {token ? (
            <>
              <NavLink
                to="/"
                onClick={() => setMenuOpen(false)}
                className="block hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200"
              >
                Home
              </NavLink>
              <NavLink
                to="/authUser/products"
                onClick={() => setMenuOpen(false)}
                className="block hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200"
              >
                Products
              </NavLink>
              <NavLink
                to="/authUser/products"
                onClick={() => setMenuOpen(false)}
                className="block hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200"
              >
                Categories
              </NavLink>
              <Link
                to="/authUser/products"
                onClick={() => setMenuOpen(false)}
                className="block hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200"
              >
                Cart
              </Link>
              <button
                onClick={handleLogout}
                className="w-full bg-red-600 dark:bg-red-700 hover:bg-red-700 dark:hover:bg-red-800 px-5 py-2 rounded-xl text-white font-bold transition-colors duration-300 shadow-md"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="block hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200"
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
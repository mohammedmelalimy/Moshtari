import { Home, LayoutGrid, ShoppingBag, Tag } from "lucide-react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  const token = useSelector((state) => state.auth.token);

  return (
    <aside className="hidden md:block z-40 bg-gray-100  dark:bg-black border-r border-gray-200 dark:border-gray-700
      sticky top-0 h-screen w-64">
      <div className="px-3 py-4 fixed">
        {token && (
          <nav className="flex flex-col gap-2 text-black  font-medium p-5 dark:text-white">
                <NavLink
                  to="/authUser"
                  className="flex items-center gap-3 px-4 py-2 rounded-lg transition border-2 border-transparent hover:border-blue-500">
                  <Home size={18} />
                  Home
                </NavLink>

                <NavLink
                  to="/authUser/products"
                  className="flex items-center gap-3 px-4 py-2 rounded-lg transition border-2 border-transparent hover:border-blue-500">
                  <ShoppingBag size={18} />
                  Products
                </NavLink>

                <NavLink
                  to="/authUser/categories"
                  className="flex items-center gap-3 px-4 py-2 rounded-lg transition border-2 border-transparent hover:border-blue-500">
                  <LayoutGrid size={18} />
                  Categories
                </NavLink>

                <NavLink to="/authUser/brands" className="flex items-center gap-3 px-4 py-2 rounded-lg transition border-2 border-transparent hover:border-blue-500">
                  <Tag size={18} />
                  Brands
                </NavLink>
          </nav>
        )}
      </div>
    </aside>
  );
};

export default SideBar;
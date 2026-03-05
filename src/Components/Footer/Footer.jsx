import { ShoppingBasket } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="
      bg-white text-gray-800 border-t border-gray-300 
      dark:bg-black dark:text-gray-300 dark:border-gray-700 
      transition-colors duration-300
    ">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group text-green-800 dark:text-green-400">
            <ShoppingBasket size={40} />
            <p className="text-2xl font-extrabold text-green-800 dark:text-green-400 transition-colors duration-300">
              Moshtari
            </p>
          </Link>

          {/* Links */}
          <ul className="flex flex-wrap items-center gap-8 text-lg font-semibold">
            {["About", "Privacy Policy", "Licensing", "Contact"].map((item) => (
              <li key={item}>
                <a className="
                  hover:text-green-600 dark:hover:text-green-400 
                  transition-colors duration-200 cursor-pointer
                ">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Divider */}
        <hr className="mt-10 mb-6 border-gray-300 dark:border-gray-700" />

        {/* Bottom Section */}
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          © 2026 Elalimy™. All Rights Reserved.
        </p>

      </div>
    </footer>
  );
};

export default Footer;

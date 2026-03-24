import { ShoppingBasket } from 'lucide-react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Footer = () => {
  const token = useSelector((state) => state.auth.token);

  return (
    <footer className="bg-white text-gray-800 border-t border-gray-300 dark:bg-black dark:text-gray-300 dark:border-gray-700 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Top Section */}
        <div className="flex flex-col items-center md:flex-row md:justify-between gap-8">
          {/* Logo */}
          <Link
            to={token ? '/authUser' : '/'}
            className="flex items-center gap-3 font-bold text-2xl"
          >
            <ShoppingBasket
              size={36}
              className="text-black dark:text-white transition-colors drop-shadow-md"
            />
            <span className="text-black dark:text-white transition-colors">Moshtari</span>
          </Link>

          {/* Links */}
          <ul className="flex flex-wrap justify-center md:justify-end items-center gap-4 md:gap-8 text-sm md:text-md font-semibold">
            {['About', 'Privacy Policy', 'Licensing', 'Contact'].map((item) => (
              <li key={item}>
                <a className="hover:text-rose-500 dark:hover:text-rose-400 transition-colors duration-200 cursor-pointer">
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

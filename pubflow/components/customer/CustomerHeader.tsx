import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import ShoppingCartIcon from '../icons/ShoppingCartIcon';
import { ROUTES } from '../../constants';

const CustomerHeader: React.FC = () => {
  const { cartCount } = useCart();

  return (
    <header className="bg-gray-800/80 backdrop-blur-sm sticky top-0 z-40 shadow-lg">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to={ROUTES.HOME} className="text-2xl font-bold text-amber-400">
              PubFlow
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            <Link to={ROUTES.CART} className="relative text-gray-300 hover:text-white transition">
              <ShoppingCartIcon className="h-7 w-7" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link to={ROUTES.LOGIN} className="text-sm font-medium text-gray-300 hover:text-amber-400 transition-colors">
              Staff Login
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default CustomerHeader;
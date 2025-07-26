import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X, Crown, ShoppingCart, User, LogOut } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const { getTotalItems } = useCart();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-700 to-orange-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Royal Taste</h1>
              <p className="text-xs text-gray-500 -mt-1">Food Products</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`font-medium transition-colors relative ${
                  isActive(link.path)
                    ? 'text-amber-700'
                    : 'text-gray-700 hover:text-amber-700'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-amber-700 rounded-full"></div>
                )}
              </Link>
            ))}
            
            {/* Cart Icon */}
            <Link
              to="/cart"
              className={`font-medium transition-colors relative p-2 ${
                isActive('/cart')
                  ? 'text-amber-700'
                  : 'text-gray-700 hover:text-amber-700'
              }`}
            >
              <ShoppingCart className="w-6 h-6" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-700 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Link>

            {/* User Authentication */}
            {/* Removed user authentication UI */}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-amber-700 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`font-medium transition-colors ${
                    isActive(link.path)
                      ? 'text-amber-700'
                      : 'text-gray-700 hover:text-amber-700'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/cart"
                onClick={() => setIsOpen(false)}
                className={`font-medium transition-colors flex items-center gap-2 ${
                  isActive('/cart')
                    ? 'text-amber-700'
                    : 'text-gray-700 hover:text-amber-700'
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                Cart {getTotalItems() > 0 && `(${getTotalItems()})`}
              </Link>
              
              {/* Removed user authentication UI */}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

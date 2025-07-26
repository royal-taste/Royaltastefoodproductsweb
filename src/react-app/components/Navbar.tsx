import { useState } from 'react';
import { Link } from 'react-router';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import RoyalTasteLogo from '/royaltastelogo.svg';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getTotalItems } = useCart();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-[#e4570c] shadow-lg border-b border-amber-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={RoyalTasteLogo} alt="Royal Taste Logo" className="h-16 w-auto object-contain" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-white hover:text-amber-200 transition-colors font-medium">
              Home
            </Link>
            <Link to="/about" className="text-white hover:text-amber-200 transition-colors font-medium">
              About
            </Link>
            <Link to="/products" className="text-white hover:text-amber-200 transition-colors font-medium">
              Products
            </Link>
            <Link to="/contact" className="text-white hover:text-amber-200 transition-colors font-medium">
              Contact
            </Link>
          </div>

          {/* Cart Icon */}
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative p-2 text-white hover:text-amber-200 transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 text-white hover:text-amber-200 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[#e4570c] border-t border-amber-100">
              <Link
                to="/"
                className="block px-3 py-2 text-white hover:text-amber-200 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 text-white hover:text-amber-200 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/products"
                className="block px-3 py-2 text-white hover:text-amber-200 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                to="/contact"
                className="block px-3 py-2 text-white hover:text-amber-200 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

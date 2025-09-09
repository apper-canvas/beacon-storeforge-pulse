import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";

const StorefrontHeader = ({ cartCount = 0, onCartClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/store" className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center mr-3">
              <ApperIcon name="Store" className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">StoreForge</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/store" 
              className="text-gray-700 hover:text-primary font-medium transition-colors duration-200"
            >
              Home
            </Link>
            <Link 
              to="/store" 
              className="text-gray-700 hover:text-primary font-medium transition-colors duration-200"
            >
              Products
            </Link>
            <Link 
              to="/store" 
              className="text-gray-700 hover:text-primary font-medium transition-colors duration-200"
            >
              About
            </Link>
            <Link 
              to="/store" 
              className="text-gray-700 hover:text-primary font-medium transition-colors duration-200"
            >
              Contact
            </Link>
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onCartClick}
              className="relative p-2"
            >
              <ApperIcon name="ShoppingCart" className="w-5 h-5" />
              {cartCount > 0 && (
                <Badge 
                  variant="error" 
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center p-0 text-xs"
                >
                  {cartCount}
                </Badge>
              )}
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              <ApperIcon name="Menu" className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.nav 
            className="md:hidden py-4 border-t border-gray-200"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="space-y-2">
              <Link 
                to="/store" 
                className="block px-4 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/store" 
                className="block px-4 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link 
                to="/store" 
                className="block px-4 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/store" 
                className="block px-4 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </motion.nav>
        )}
      </div>
    </header>
  );
};

export default StorefrontHeader;
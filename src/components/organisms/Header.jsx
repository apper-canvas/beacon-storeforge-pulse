import { useState } from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";

const Header = ({ onMenuClick, showSearch = false, onSearch }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onMenuClick}
              className="lg:hidden p-2"
            >
              <ApperIcon name="Menu" className="w-5 h-5" />
            </Button>
            
            {showSearch && (
              <div className="hidden sm:block">
                <SearchBar 
                  onSearch={onSearch}
                  placeholder="Search products, orders, customers..."
                  className="w-80"
                />
              </div>
            )}
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Mobile Search */}
            {showSearch && (
              <Button
                variant="ghost"
                size="sm"
                className="sm:hidden p-2"
              >
                <ApperIcon name="Search" className="w-5 h-5" />
              </Button>
            )}
            
            {/* Notifications */}
            <Button
              variant="ghost"
              size="sm"
              className="relative p-2"
            >
              <ApperIcon name="Bell" className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full"></span>
            </Button>
            
            {/* Settings */}
            <Button
              variant="ghost"
              size="sm"
              className="p-2"
            >
              <ApperIcon name="Settings" className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
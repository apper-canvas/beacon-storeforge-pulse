import { motion } from "framer-motion";
import { NavLink, useLocation } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  
  const menuItems = [
    { path: "/admin/dashboard", label: "Dashboard", icon: "BarChart3" },
    { path: "/admin/products", label: "Products", icon: "Package" },
    { path: "/admin/orders", label: "Orders", icon: "ShoppingBag" },
    { path: "/admin/customers", label: "Customers", icon: "Users" },
    { path: "/admin/settings", label: "Settings", icon: "Settings" },
    { path: "/store", label: "View Store", icon: "ExternalLink" },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center px-6 py-6 border-b border-gray-700">
        <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center mr-3">
          <ApperIcon name="Store" className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold text-white">StoreForge</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          const isExternal = item.path === "/store";
          
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => onClose?.()}
              className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 group ${
                isActive
                  ? "bg-primary text-white shadow-lg"
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              }`}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
            >
              <ApperIcon 
                name={item.icon} 
                className={`w-5 h-5 mr-3 transition-colors duration-200 ${
                  isActive ? "text-white" : "text-gray-400 group-hover:text-white"
                }`}
              />
              {item.label}
              {isExternal && (
                <ApperIcon name="ExternalLink" className="w-4 h-4 ml-auto" />
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="px-4 py-6 border-t border-gray-700">
        <div className="flex items-center px-3 py-2">
          <div className="w-8 h-8 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center mr-3">
            <ApperIcon name="User" className="w-4 h-4 text-gray-300" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">Store Admin</p>
            <p className="text-xs text-gray-400 truncate">admin@storeforge.com</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:bg-gray-800">
        {sidebarContent}
      </div>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          <motion.div
            className="relative flex flex-col w-64 bg-gray-800"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors duration-200"
            >
              <ApperIcon name="X" className="w-5 h-5" />
            </button>
            {sidebarContent}
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
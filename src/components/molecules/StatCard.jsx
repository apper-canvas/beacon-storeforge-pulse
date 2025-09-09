import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const StatCard = ({ 
  title, 
  value, 
  change, 
  trend, 
  icon,
  className = "",
  index = 0
}) => {
  const isPositive = trend === "up";
  
  return (
    <motion.div
      className={`bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -2 }}
    >
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {change && (
            <div className="flex items-center space-x-1">
              <ApperIcon 
                name={isPositive ? "TrendingUp" : "TrendingDown"} 
                className={`w-4 h-4 ${isPositive ? "text-success" : "text-error"}`}
              />
              <span className={`text-sm font-medium ${isPositive ? "text-success" : "text-error"}`}>
                {change}
              </span>
            </div>
          )}
        </div>
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center">
            <ApperIcon name={icon} className="w-6 h-6 text-primary" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;
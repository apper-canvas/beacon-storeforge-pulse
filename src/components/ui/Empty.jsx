import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Empty = ({ 
  title = "No data available",
  description = "Get started by adding your first item",
  icon = "Package",
  onAction,
  actionLabel = "Add Item",
  className = ""
}) => {
  return (
    <motion.div
      className={`flex items-center justify-center min-h-[400px] ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center space-y-6 max-w-md mx-auto px-4">
        <div className="relative">
          <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center mx-auto">
            <ApperIcon name={icon} className="w-10 h-10 text-primary" />
          </div>
          <div className="absolute inset-0 w-20 h-20 bg-primary/5 rounded-full mx-auto animate-pulse" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
        
        {onAction && (
          <div className="space-y-3">
            <Button onClick={onAction} className="w-full">
              <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
              {actionLabel}
            </Button>
            <p className="text-sm text-gray-500">
              Start building your store and watch your business grow.
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Empty;
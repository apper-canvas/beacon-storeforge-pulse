import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Error = ({ message = "Something went wrong", onRetry, className = "" }) => {
  return (
    <motion.div
      className={`flex items-center justify-center min-h-[400px] ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center space-y-6 max-w-md mx-auto px-4">
        <div className="relative">
          <div className="w-20 h-20 bg-gradient-to-br from-error/20 to-error/10 rounded-full flex items-center justify-center mx-auto">
            <ApperIcon name="AlertTriangle" className="w-10 h-10 text-error" />
          </div>
          <div className="absolute inset-0 w-20 h-20 bg-error/5 rounded-full mx-auto animate-pulse" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-900">Oops! Something went wrong</h3>
          <p className="text-gray-600 leading-relaxed">{message}</p>
        </div>
        
        {onRetry && (
          <div className="space-y-3">
            <Button onClick={onRetry} className="w-full">
              <ApperIcon name="RefreshCw" className="w-4 h-4 mr-2" />
              Try Again
            </Button>
            <p className="text-sm text-gray-500">
              If the problem persists, please check your connection and try again.
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Error;
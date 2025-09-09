import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";

const ProductCard = ({ 
  product, 
  onEdit, 
  onDelete, 
  onAddToCart,
  showActions = true,
  className = "",
  index = 0
}) => {
  const isLowStock = product.inventory < 10;
  
  return (
    <motion.div
      className={`bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -4, scale: 1.02 }}
    >
      <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        {product.images && product.images.length > 0 ? (
          <img 
            src={product.images[0]} 
            alt={product.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ApperIcon name="Package" className="w-16 h-16 text-gray-400" />
          </div>
        )}
        
        {isLowStock && (
          <Badge 
            variant="warning" 
            className="absolute top-2 right-2"
          >
            Low Stock
          </Badge>
        )}
        
        <Badge 
          variant={product.status === "active" ? "success" : "default"}
          className="absolute top-2 left-2"
        >
          {product.status}
        </Badge>
      </div>
      
      <div className="p-4">
        <div className="space-y-2 mb-4">
          <h3 className="font-semibold text-gray-900 line-clamp-2">{product.title}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
          
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-primary">
              ${product.price?.toFixed(2)}
            </span>
            <span className="text-sm text-gray-500">
              {product.inventory} in stock
            </span>
          </div>
        </div>
        
        {showActions && (
          <div className="flex gap-2">
            {onEdit && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(product)}
                className="flex-1"
              >
                <ApperIcon name="Edit2" className="w-4 h-4 mr-1" />
                Edit
              </Button>
            )}
            
            {onDelete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(product.Id)}
                className="text-error hover:bg-error/10"
              >
                <ApperIcon name="Trash2" className="w-4 h-4" />
              </Button>
            )}
            
            {onAddToCart && (
              <Button
                size="sm"
                onClick={() => onAddToCart(product)}
                disabled={product.inventory === 0}
                className="flex-1"
              >
                <ApperIcon name="ShoppingCart" className="w-4 h-4 mr-1" />
                Add to Cart
              </Button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;
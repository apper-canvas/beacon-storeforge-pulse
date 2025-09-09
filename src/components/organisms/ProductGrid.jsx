import { motion } from "framer-motion";
import ProductCard from "@/components/molecules/ProductCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";

const ProductGrid = ({ 
  products, 
  loading, 
  error, 
  onEdit, 
  onDelete, 
  onAddToCart,
  onRetry,
  showActions = true,
  emptyMessage = "No products found"
}) => {
  if (loading) {
    return <Loading type="grid" />;
  }
  
  if (error) {
    return <Error message={error} onRetry={onRetry} />;
  }
  
  if (!products || products.length === 0) {
    return (
      <Empty 
        title="No Products Yet"
        description={emptyMessage}
        icon="Package"
        onAction={onEdit ? () => onEdit(null) : undefined}
        actionLabel="Add Product"
      />
    );
  }

  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {products.map((product, index) => (
        <ProductCard
          key={product.Id}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
          onAddToCart={onAddToCart}
          showActions={showActions}
          index={index}
        />
      ))}
    </motion.div>
  );
};

export default ProductGrid;
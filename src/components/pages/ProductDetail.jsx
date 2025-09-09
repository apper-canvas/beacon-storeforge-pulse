import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import StorefrontHeader from "@/components/organisms/StorefrontHeader";
import CartSidebar from "@/components/organisms/CartSidebar";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import { getProductById } from "@/services/api/productService";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const loadProduct = async () => {
    try {
      setError(null);
      setLoading(true);
      const data = await getProductById(parseInt(id));
      setProduct(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProduct();
    // Load cart from localStorage
    const savedCart = localStorage.getItem("storeforge-cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, [id]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("storeforge-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = () => {
    if (!product || product.inventory === 0) return;

    const existingItem = cartItems.find(item => item.Id === product.Id);
    
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.Id === product.Id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity }]);
    }
    
    toast.success(`${product.title} added to cart!`);
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    
    setCartItems(cartItems.map(item =>
      item.Id === productId
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const handleRemoveItem = (productId) => {
    setCartItems(cartItems.filter(item => item.Id !== productId));
    toast.success("Item removed from cart");
  };

  const handleCheckout = () => {
    navigate("/store/checkout");
    setIsCartOpen(false);
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <StorefrontHeader cartCount={cartCount} onCartClick={() => setIsCartOpen(true)} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Loading />
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background">
        <StorefrontHeader cartCount={cartCount} onCartClick={() => setIsCartOpen(true)} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Error message={error || "Product not found"} onRetry={loadProduct} />
        </div>
      </div>
    );
  }

  const isOutOfStock = product.inventory === 0;
  const isLowStock = product.inventory < 10;

  return (
    <div className="min-h-screen bg-background">
      <StorefrontHeader 
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <motion.nav 
          className="flex items-center space-x-2 text-sm text-gray-600 mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button onClick={() => navigate("/store")} className="hover:text-primary transition-colors duration-200">
            Store
          </button>
          <ApperIcon name="ChevronRight" className="w-4 h-4" />
          <span className="text-gray-900 font-medium">Product Details</span>
        </motion.nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                {product.images && product.images.length > 0 ? (
                  <img 
                    src={product.images[selectedImage]} 
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ApperIcon name="Package" className="w-24 h-24 text-gray-400" />
                  </div>
                )}
              </div>
              
              {/* Thumbnail Images */}
              {product.images && product.images.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors duration-200 ${
                        selectedImage === index ? "border-primary" : "border-gray-200"
                      }`}
                    >
                      <img src={image} alt={`${product.title} ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <Badge variant={product.status === "active" ? "success" : "default"}>
                  {product.status}
                </Badge>
                {isLowStock && !isOutOfStock && (
                  <Badge variant="warning">Low Stock</Badge>
                )}
                {isOutOfStock && (
                  <Badge variant="error">Out of Stock</Badge>
                )}
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>
              
              <p className="text-4xl font-bold text-primary mb-6">
                ${product.price?.toFixed(2)}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">Quantity:</span>
              
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-gray-50 transition-colors duration-200"
                  disabled={quantity <= 1}
                >
                  <ApperIcon name="Minus" className="w-4 h-4" />
                </button>
                
                <span className="px-4 py-2 text-center min-w-[3rem] font-medium">
                  {quantity}
                </span>
                
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-gray-50 transition-colors duration-200"
                  disabled={quantity >= product.inventory}
                >
                  <ApperIcon name="Plus" className="w-4 h-4" />
                </button>
              </div>
              
              <span className="text-sm text-gray-500">
                {product.inventory} available
              </span>
            </div>

            <div className="space-y-4">
              <Button 
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                size="lg"
                className="w-full"
              >
                <ApperIcon name="ShoppingCart" className="w-5 h-5 mr-2" />
                {isOutOfStock ? "Out of Stock" : "Add to Cart"}
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="w-full"
              >
                <ApperIcon name="Heart" className="w-5 h-5 mr-2" />
                Add to Wishlist
              </Button>
            </div>

            {/* Product Features */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Features</h3>
              <div className="space-y-3">
                {[
                  { icon: "Truck", text: "Free shipping on orders over $100" },
                  { icon: "RotateCcw", text: "30-day return policy" },
                  { icon: "Shield", text: "1-year warranty included" },
                  { icon: "Headphones", text: "24/7 customer support" }
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <ApperIcon name={feature.icon} className="w-5 h-5 text-primary" />
                    <span className="text-gray-600">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />
    </div>
  );
};

export default ProductDetail;
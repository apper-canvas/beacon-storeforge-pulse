import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import StorefrontHeader from "@/components/organisms/StorefrontHeader";
import ProductCard from "@/components/molecules/ProductCard";
import CartSidebar from "@/components/organisms/CartSidebar";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { getAllProducts } from "@/services/api/productService";

const Storefront = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const loadProducts = async () => {
    try {
      setError(null);
      setLoading(true);
      const data = await getAllProducts();
      // Only show active products in storefront
      const activeProducts = data.filter(product => product.status === "active" && product.inventory > 0);
      setProducts(activeProducts);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
    // Load cart from localStorage
    const savedCart = localStorage.getItem("storeforge-cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("storeforge-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (product) => {
    const existingItem = cartItems.find(item => item.Id === product.Id);
    
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.Id === product.Id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
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

  return (
    <div className="min-h-screen bg-background">
      <StorefrontHeader 
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
      />
      
      <main>
        {/* Hero Section */}
        <motion.section 
          className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <motion.h1 
                className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Welcome to{" "}
                <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  StoreForge
                </span>
              </motion.h1>
              
              <motion.p 
                className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Discover amazing products crafted with care and delivered with excellence.
                Your shopping experience begins here.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Button size="lg" className="mr-4">
                  <ApperIcon name="ArrowDown" className="w-5 h-5 mr-2" />
                  Shop Now
                </Button>
                <Button variant="outline" size="lg">
                  <ApperIcon name="Info" className="w-5 h-5 mr-2" />
                  Learn More
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Products Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Featured Products
              </h2>
              <p className="text-lg text-gray-600">
                Handpicked selections from our premium collection
              </p>
            </motion.div>

            {loading ? (
              <Loading type="grid" />
            ) : error ? (
              <Error message={error} onRetry={loadProducts} />
            ) : products.length === 0 ? (
              <Empty
                title="No Products Available"
                description="Check back soon for new arrivals and featured items"
                icon="Package"
              />
            ) : (
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                {products.map((product, index) => (
                  <Link key={product.Id} to={`/store/product/${product.Id}`}>
                    <ProductCard
                      product={product}
                      onAddToCart={handleAddToCart}
                      showActions={false}
                      index={index}
                      className="hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                ))}
              </motion.div>
            )}
          </div>
        </section>

        {/* Features Section */}
        <motion.section 
          className="py-16 bg-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose StoreForge?</h2>
              <p className="text-lg text-gray-600">We're committed to providing the best shopping experience</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: "Truck",
                  title: "Fast Delivery",
                  description: "Free shipping on orders over $100 with express delivery options"
                },
                {
                  icon: "Shield",
                  title: "Secure Shopping",
                  description: "Your data and payments are protected with enterprise-grade security"
                },
                {
                  icon: "HeadphonesIcon",
                  title: "24/7 Support",
                  description: "Our friendly support team is here to help you anytime, anywhere"
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="text-center p-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ApperIcon name={feature.icon} className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
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

export default Storefront;
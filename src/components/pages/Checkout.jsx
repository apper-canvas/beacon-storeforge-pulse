import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import StorefrontHeader from "@/components/organisms/StorefrontHeader";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import Input from "@/components/atoms/Input";
import { createOrder } from "@/services/api/orderService";

const Checkout = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: ""
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem("storeforge-cart");
    if (savedCart) {
      const cart = JSON.parse(savedCart);
      if (cart.length === 0) {
        navigate("/store");
        return;
      }
      setCartItems(cart);
    } else {
      navigate("/store");
    }
  }, [navigate]);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Customer information
    if (!formData.customerName.trim()) newErrors.customerName = "Name is required";
    if (!formData.customerEmail.trim()) newErrors.customerEmail = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";

    // Shipping address
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.zipCode.trim()) newErrors.zipCode = "ZIP code is required";

    // Payment information
    if (!formData.cardNumber.trim()) newErrors.cardNumber = "Card number is required";
    if (!formData.expiryDate.trim()) newErrors.expiryDate = "Expiry date is required";
    if (!formData.cvv.trim()) newErrors.cvv = "CVV is required";
    if (!formData.cardName.trim()) newErrors.cardName = "Cardholder name is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      
      const orderData = {
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        items: cartItems.map(item => ({
          productId: item.Id,
          title: item.title,
          price: item.price,
          quantity: item.quantity
        })),
        total: total,
        status: "pending",
        shippingAddress: {
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country
        }
      };

      await createOrder(orderData);
      
      // Clear cart
      localStorage.removeItem("storeforge-cart");
      
      toast.success("Order placed successfully! You will receive a confirmation email shortly.");
      navigate("/store");
      
    } catch (err) {
      toast.error("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-background">
      <StorefrontHeader cartCount={0} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Customer Information */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center mb-6">
                    <ApperIcon name="User" className="w-5 h-5 text-primary mr-2" />
                    <h2 className="text-lg font-semibold text-gray-900">Customer Information</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      label="Full Name"
                      required
                      value={formData.customerName}
                      onChange={(e) => handleInputChange("customerName", e.target.value)}
                      error={errors.customerName}
                      placeholder="John Doe"
                    />
                    
                    <FormField
                      label="Email"
                      type="email"
                      required
                      value={formData.customerEmail}
                      onChange={(e) => handleInputChange("customerEmail", e.target.value)}
                      error={errors.customerEmail}
                      placeholder="john@example.com"
                    />
                    
                    <FormField
                      label="Phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      error={errors.phone}
                      placeholder="(555) 123-4567"
                      className="md:col-span-2"
                    />
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center mb-6">
                    <ApperIcon name="MapPin" className="w-5 h-5 text-primary mr-2" />
                    <h2 className="text-lg font-semibold text-gray-900">Shipping Address</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <FormField
                      label="Street Address"
                      required
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      error={errors.address}
                      placeholder="123 Main Street"
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        label="City"
                        required
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        error={errors.city}
                        placeholder="New York"
                      />
                      
                      <FormField
                        label="State"
                        required
                        value={formData.state}
                        onChange={(e) => handleInputChange("state", e.target.value)}
                        error={errors.state}
                        placeholder="NY"
                      />
                      
                      <FormField
                        label="ZIP Code"
                        required
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange("zipCode", e.target.value)}
                        error={errors.zipCode}
                        placeholder="10001"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center mb-6">
                    <ApperIcon name="CreditCard" className="w-5 h-5 text-primary mr-2" />
                    <h2 className="text-lg font-semibold text-gray-900">Payment Information</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <FormField
                      label="Card Number"
                      required
                      value={formData.cardNumber}
                      onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                      error={errors.cardNumber}
                      placeholder="1234 5678 9012 3456"
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        label="Expiry Date"
                        required
                        value={formData.expiryDate}
                        onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                        error={errors.expiryDate}
                        placeholder="MM/YY"
                      />
                      
                      <FormField
                        label="CVV"
                        required
                        value={formData.cvv}
                        onChange={(e) => handleInputChange("cvv", e.target.value)}
                        error={errors.cvv}
                        placeholder="123"
                      />
                      
                      <FormField
                        label="Cardholder Name"
                        required
                        value={formData.cardName}
                        onChange={(e) => handleInputChange("cardName", e.target.value)}
                        error={errors.cardName}
                        placeholder="John Doe"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  loading={loading}
                  size="lg"
                  className="w-full"
                >
                  <ApperIcon name="Lock" className="w-5 h-5 mr-2" />
                  Complete Order
                </Button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Order Summary</h2>
                
                {/* Cart Items */}
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.Id} className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        {item.images && item.images.length > 0 ? (
                          <img 
                            src={item.images[0]} 
                            alt={item.title}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <ApperIcon name="Package" className="w-6 h-6 text-gray-400" />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{item.title}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      
                      <p className="text-sm font-semibold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
                
                {/* Order Totals */}
                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">${subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-gray-900">
                      {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax</span>
                    <span className="text-gray-900">${tax.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-lg font-semibold pt-2 border-t border-gray-200">
                    <span className="text-gray-900">Total</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Security Notice */}
                <div className="mt-6 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <ApperIcon name="Shield" className="w-4 h-4 text-success" />
                    <span className="text-xs text-gray-600">
                      Your payment information is secure and encrypted
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Checkout;
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import OrderTable from "@/components/organisms/OrderTable";
import { getAllOrders, updateOrder } from "@/services/api/orderService";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const loadOrders = async () => {
    try {
      setError(null);
      setLoading(true);
      const data = await getAllOrders();
      setOrders(data);
      setFilteredOrders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = orders.filter(order =>
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.Id.toString().includes(searchTerm)
      );
      setFilteredOrders(filtered);
    } else {
      setFilteredOrders(orders);
    }
  }, [searchTerm, orders]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const updatedOrder = await updateOrder(orderId, { status: newStatus });
      setOrders(orders.map(order => order.Id === orderId ? updatedOrder : order));
      toast.success(`Order status updated to ${newStatus}`);
    } catch (err) {
      toast.error("Failed to update order status");
    }
  };

  return (
    <motion.div 
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-600 mt-2">Track and manage customer orders and deliveries.</p>
        </div>
        
        <Button variant="outline">
          <ApperIcon name="Download" className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <SearchBar
          onSearch={handleSearch}
          placeholder="Search orders by customer, email, or order ID..."
          className="flex-1"
        />
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <ApperIcon name="Filter" className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <ApperIcon name="Calendar" className="w-4 h-4 mr-2" />
            Date Range
          </Button>
        </div>
      </div>

      {/* Orders Table */}
      <OrderTable
        orders={filteredOrders}
        loading={loading}
        error={error}
        onStatusChange={handleStatusChange}
        onRetry={loadOrders}
      />

      {/* Summary Stats */}
      {!loading && !error && filteredOrders.length > 0 && (
        <motion.div 
          className="bg-white rounded-lg shadow-sm p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-primary">
                {filteredOrders.length}
              </p>
              <p className="text-sm text-gray-600">Total Orders</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-success">
                {filteredOrders.filter(o => o.status === "delivered").length}
              </p>
              <p className="text-sm text-gray-600">Delivered</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-warning">
                {filteredOrders.filter(o => o.status === "pending").length}
              </p>
              <p className="text-sm text-gray-600">Pending</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                ${filteredOrders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
              </p>
              <p className="text-sm text-gray-600">Total Revenue</p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Orders;
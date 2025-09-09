import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import CustomerTable from "@/components/organisms/CustomerTable";
import { getAllCustomers } from "@/services/api/customerService";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const loadCustomers = async () => {
    try {
      setError(null);
      setLoading(true);
      const data = await getAllCustomers();
      setCustomers(data);
      setFilteredCustomers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCustomers(filtered);
    } else {
      setFilteredCustomers(customers);
    }
  }, [searchTerm, customers]);

  const handleSearch = (term) => {
    setSearchTerm(term);
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
          <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-600 mt-2">Manage your customer relationships and order history.</p>
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
          placeholder="Search customers by name or email..."
          className="flex-1"
        />
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <ApperIcon name="Filter" className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <ApperIcon name="Mail" className="w-4 h-4 mr-2" />
            Email All
          </Button>
        </div>
      </div>

      {/* Customers Table */}
      <CustomerTable
        customers={filteredCustomers}
        loading={loading}
        error={error}
        onRetry={loadCustomers}
      />

      {/* Customer Stats */}
      {!loading && !error && filteredCustomers.length > 0 && (
        <motion.div 
          className="bg-white rounded-lg shadow-sm p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Insights</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-primary">
                {filteredCustomers.length}
              </p>
              <p className="text-sm text-gray-600">Total Customers</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-success">
                {filteredCustomers.filter(c => c.orders && c.orders.length > 0).length}
              </p>
              <p className="text-sm text-gray-600">Active Customers</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-warning">
                ${(filteredCustomers.reduce((sum, customer) => sum + (customer.totalSpent || 0), 0) / filteredCustomers.length).toFixed(2)}
              </p>
              <p className="text-sm text-gray-600">Avg. Order Value</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                ${filteredCustomers.reduce((sum, customer) => sum + (customer.totalSpent || 0), 0).toFixed(2)}
              </p>
              <p className="text-sm text-gray-600">Total Revenue</p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Customers;
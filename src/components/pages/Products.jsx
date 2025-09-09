import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import ProductGrid from "@/components/organisms/ProductGrid";
import ProductForm from "@/components/organisms/ProductForm";
import { getAllProducts, createProduct, updateProduct, deleteProduct } from "@/services/api/productService";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const loadProducts = async () => {
    try {
      setError(null);
      setLoading(true);
      const data = await getAllProducts();
      setProducts(data);
      setFilteredProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [searchTerm, products]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      await deleteProduct(productId);
      setProducts(products.filter(p => p.Id !== productId));
      toast.success("Product deleted successfully");
    } catch (err) {
      toast.error("Failed to delete product");
    }
  };

  const handleSubmit = async (productData) => {
    try {
      if (editingProduct) {
        const updatedProduct = await updateProduct(editingProduct.Id, productData);
        setProducts(products.map(p => p.Id === editingProduct.Id ? updatedProduct : p));
        toast.success("Product updated successfully");
      } else {
        const newProduct = await createProduct(productData);
        setProducts([newProduct, ...products]);
        toast.success("Product created successfully");
      }
      
      setShowForm(false);
      setEditingProduct(null);
    } catch (err) {
      toast.error("Failed to save product");
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProduct(null);
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
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600 mt-2">Manage your store inventory and product catalog.</p>
        </div>
        
        <Button onClick={() => setShowForm(true)}>
          <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <SearchBar
          onSearch={handleSearch}
          placeholder="Search products..."
          className="flex-1"
        />
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <ApperIcon name="Filter" className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <ApperIcon name="ArrowUpDown" className="w-4 h-4 mr-2" />
            Sort
          </Button>
        </div>
      </div>

      {/* Product Grid */}
      <ProductGrid
        products={filteredProducts}
        loading={loading}
        error={error}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onRetry={loadProducts}
        showActions={true}
        emptyMessage={searchTerm ? `No products found for "${searchTerm}"` : "No products found"}
      />

      {/* Product Form Modal */}
      {showForm && (
        <ProductForm
          product={editingProduct}
          onSubmit={handleSubmit}
          onClose={handleCloseForm}
        />
      )}
    </motion.div>
  );
};

export default Products;
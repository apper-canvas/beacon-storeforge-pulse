import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "@/components/organisms/Layout";
import Dashboard from "@/components/pages/Dashboard";
import Products from "@/components/pages/Products";
import Orders from "@/components/pages/Orders";
import Customers from "@/components/pages/Customers";
import Settings from "@/components/pages/Settings";
import Storefront from "@/components/pages/Storefront";
import ProductDetail from "@/components/pages/ProductDetail";
import Checkout from "@/components/pages/Checkout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="customers" element={<Customers />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        
        {/* Storefront Routes */}
        <Route path="/store" element={<Storefront />} />
        <Route path="/store/product/:id" element={<ProductDetail />} />
        <Route path="/store/checkout" element={<Checkout />} />
      </Routes>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastStyle={{
          borderRadius: "8px",
          minHeight: "60px",
          fontSize: "14px",
        }}
      />
    </BrowserRouter>
  );
}

export default App;
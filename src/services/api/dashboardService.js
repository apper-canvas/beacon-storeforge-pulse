import products from "@/services/mockData/products.json";
import orders from "@/services/mockData/orders.json";
import customers from "@/services/mockData/customers.json";

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getStats = async () => {
  await delay(400);
  
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;
  const totalCustomers = customers.length;
  
  const pendingOrders = orders.filter(order => order.status === "pending").length;
  const lowStockProducts = products.filter(product => product.inventory < 10).length;
  
  return [
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      change: "+12.5%",
      trend: "up",
      icon: "DollarSign"
    },
    {
      title: "Total Orders",
      value: totalOrders.toString(),
      change: "+8.2%",
      trend: "up", 
      icon: "ShoppingBag"
    },
    {
      title: "Products",
      value: totalProducts.toString(),
      change: `${lowStockProducts} low stock`,
      trend: lowStockProducts > 0 ? "down" : "up",
      icon: "Package"
    },
    {
      title: "Customers",
      value: totalCustomers.toString(),
      change: "+15.3%",
      trend: "up",
      icon: "Users"
    }
  ];
};

export const getRecentOrders = async () => {
  await delay(300);
  return orders
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);
};

export const getRecentProducts = async () => {
  await delay(300);
  return products
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);
};
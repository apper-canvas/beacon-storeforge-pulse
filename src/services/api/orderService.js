import orders from "@/services/mockData/orders.json";

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let orderData = [...orders];

export const getAllOrders = async () => {
  await delay(300);
  return [...orderData];
};

export const getOrderById = async (id) => {
  await delay(200);
  const order = orderData.find(o => o.Id === parseInt(id));
  if (!order) {
    throw new Error("Order not found");
  }
  return { ...order };
};

export const createOrder = async (orderData) => {
  await delay(500);
  const newId = Math.max(...orderData.map(o => o.Id)) + 1;
  const newOrder = {
    Id: newId,
    ...orderData,
    createdAt: new Date().toISOString()
  };
  orderData.unshift(newOrder);
  return { ...newOrder };
};

export const updateOrder = async (id, updates) => {
  await delay(400);
  const index = orderData.findIndex(o => o.Id === parseInt(id));
  if (index === -1) {
    throw new Error("Order not found");
  }
  const updatedOrder = {
    ...orderData[index],
    ...updates,
    Id: parseInt(id)
  };
  orderData[index] = updatedOrder;
  return { ...updatedOrder };
};

export const deleteOrder = async (id) => {
  await delay(300);
  const index = orderData.findIndex(o => o.Id === parseInt(id));
  if (index === -1) {
    throw new Error("Order not found");
  }
  orderData.splice(index, 1);
  return true;
};
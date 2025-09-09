import customers from "@/services/mockData/customers.json";

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let customerData = [...customers];

export const getAllCustomers = async () => {
  await delay(300);
  return [...customerData];
};

export const getCustomerById = async (id) => {
  await delay(200);
  const customer = customerData.find(c => c.Id === parseInt(id));
  if (!customer) {
    throw new Error("Customer not found");
  }
  return { ...customer };
};

export const createCustomer = async (customerData) => {
  await delay(500);
  const newId = Math.max(...customerData.map(c => c.Id)) + 1;
  const newCustomer = {
    Id: newId,
    ...customerData,
    createdAt: new Date().toISOString(),
    orders: [],
    totalSpent: 0
  };
  customerData.unshift(newCustomer);
  return { ...newCustomer };
};

export const updateCustomer = async (id, updates) => {
  await delay(400);
  const index = customerData.findIndex(c => c.Id === parseInt(id));
  if (index === -1) {
    throw new Error("Customer not found");
  }
  const updatedCustomer = {
    ...customerData[index],
    ...updates,
    Id: parseInt(id)
  };
  customerData[index] = updatedCustomer;
  return { ...updatedCustomer };
};

export const deleteCustomer = async (id) => {
  await delay(300);
  const index = customerData.findIndex(c => c.Id === parseInt(id));
  if (index === -1) {
    throw new Error("Customer not found");
  }
  customerData.splice(index, 1);
  return true;
};
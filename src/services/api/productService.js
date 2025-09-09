import products from "@/services/mockData/products.json";

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let productData = [...products];

export const getAllProducts = async () => {
  await delay(300);
  return [...productData];
};

export const getProductById = async (id) => {
  await delay(200);
  const product = productData.find(p => p.Id === parseInt(id));
  if (!product) {
    throw new Error("Product not found");
  }
  return { ...product };
};

export const createProduct = async (productData) => {
  await delay(500);
  const newId = Math.max(...productData.map(p => p.Id)) + 1;
  const newProduct = {
    Id: newId,
    ...productData,
    createdAt: new Date().toISOString()
  };
  productData.unshift(newProduct);
  return { ...newProduct };
};

export const updateProduct = async (id, productData) => {
  await delay(400);
  const index = productData.findIndex(p => p.Id === parseInt(id));
  if (index === -1) {
    throw new Error("Product not found");
  }
  const updatedProduct = {
    ...productData[index],
    ...productData,
    Id: parseInt(id)
  };
  productData[index] = updatedProduct;
  return { ...updatedProduct };
};

export const deleteProduct = async (id) => {
  await delay(300);
  const index = productData.findIndex(p => p.Id === parseInt(id));
  if (index === -1) {
    throw new Error("Product not found");
  }
  productData.splice(index, 1);
  return true;
};
import storeSettings from "@/services/mockData/storeSettings.json";

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let settingsData = { ...storeSettings };

export const getStoreSettings = async () => {
  await delay(300);
  return { ...settingsData };
};

export const updateStoreSettings = async (newSettings) => {
  await delay(500);
  settingsData = { ...settingsData, ...newSettings };
  return { ...settingsData };
};
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import Input from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { getStoreSettings, updateStoreSettings } from "@/services/api/settingsService";

const Settings = () => {
  const [settings, setSettings] = useState({
    name: "",
    description: "",
    logo: "",
    theme: "default",
    currency: "USD",
    notifications: {
      email: true,
      sms: false,
      push: true
    },
    shipping: {
      enabled: true,
      freeThreshold: 100,
      defaultRate: 9.99
    }
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const loadSettings = async () => {
    try {
      setError(null);
      setLoading(true);
      const data = await getStoreSettings();
      setSettings(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await updateStoreSettings(settings);
      toast.success("Settings saved successfully");
    } catch (err) {
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNestedChange = (parent, field, value) => {
    setSettings(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value
      }
    }));
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={loadSettings} />;
  }

  const themeOptions = [
    { value: "default", label: "Default" },
    { value: "modern", label: "Modern" },
    { value: "classic", label: "Classic" },
    { value: "minimal", label: "Minimal" }
  ];

  const currencyOptions = [
    { value: "USD", label: "US Dollar ($)" },
    { value: "EUR", label: "Euro (€)" },
    { value: "GBP", label: "British Pound (£)" },
    { value: "CAD", label: "Canadian Dollar (C$)" }
  ];

  return (
    <motion.div 
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Configure your store preferences and business information.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Store Information */}
        <motion.div 
          className="bg-white rounded-lg shadow-sm p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="flex items-center mb-6">
            <ApperIcon name="Store" className="w-5 h-5 text-primary mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Store Information</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label="Store Name"
              required
              value={settings.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter your store name"
            />
            
            <FormField
              label="Store Logo URL"
              value={settings.logo}
              onChange={(e) => handleInputChange("logo", e.target.value)}
              placeholder="https://example.com/logo.png"
            />
            
            <div className="md:col-span-2">
              <Label>Store Description</Label>
              <textarea
                className="mt-2 w-full h-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                value={settings.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Describe your store and products"
              />
            </div>
          </div>
        </motion.div>

        {/* Appearance */}
        <motion.div 
          className="bg-white rounded-lg shadow-sm p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="flex items-center mb-6">
            <ApperIcon name="Palette" className="w-5 h-5 text-primary mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Appearance</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label>Theme</Label>
              <select
                className="mt-2 w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={settings.theme}
                onChange={(e) => handleInputChange("theme", e.target.value)}
              >
                {themeOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <Label>Currency</Label>
              <select
                className="mt-2 w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={settings.currency}
                onChange={(e) => handleInputChange("currency", e.target.value)}
              >
                {currencyOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Shipping Settings */}
        <motion.div 
          className="bg-white rounded-lg shadow-sm p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <div className="flex items-center mb-6">
            <ApperIcon name="Truck" className="w-5 h-5 text-primary mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Shipping</h2>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="shipping-enabled"
                checked={settings.shipping.enabled}
                onChange={(e) => handleNestedChange("shipping", "enabled", e.target.checked)}
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <Label htmlFor="shipping-enabled" className="ml-3">
                Enable shipping for products
              </Label>
            </div>
            
            {settings.shipping.enabled && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="Default Shipping Rate"
                  type="number"
                  step="0.01"
                  value={settings.shipping.defaultRate}
                  onChange={(e) => handleNestedChange("shipping", "defaultRate", parseFloat(e.target.value) || 0)}
                  placeholder="9.99"
                />
                
                <FormField
                  label="Free Shipping Threshold"
                  type="number"
                  step="0.01"
                  value={settings.shipping.freeThreshold}
                  onChange={(e) => handleNestedChange("shipping", "freeThreshold", parseFloat(e.target.value) || 0)}
                  placeholder="100.00"
                />
              </div>
            )}
          </div>
        </motion.div>

        {/* Notification Settings */}
        <motion.div 
          className="bg-white rounded-lg shadow-sm p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <div className="flex items-center mb-6">
            <ApperIcon name="Bell" className="w-5 h-5 text-primary mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="email-notifications"
                checked={settings.notifications.email}
                onChange={(e) => handleNestedChange("notifications", "email", e.target.checked)}
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <Label htmlFor="email-notifications" className="ml-3">
                Email notifications for new orders
              </Label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="sms-notifications"
                checked={settings.notifications.sms}
                onChange={(e) => handleNestedChange("notifications", "sms", e.target.checked)}
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <Label htmlFor="sms-notifications" className="ml-3">
                SMS notifications for urgent updates
              </Label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="push-notifications"
                checked={settings.notifications.push}
                onChange={(e) => handleNestedChange("notifications", "push", e.target.checked)}
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <Label htmlFor="push-notifications" className="ml-3">
                Browser push notifications
              </Label>
            </div>
          </div>
        </motion.div>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button 
            type="submit" 
            loading={saving}
            size="lg"
          >
            <ApperIcon name="Save" className="w-4 h-4 mr-2" />
            Save Settings
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default Settings;
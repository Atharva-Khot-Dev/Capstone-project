import React, { useState, useEffect } from 'react';
import placeholderImage from '../images/img1.jpg';
import { MenuItemType } from './Menu';
import { Order } from './OrderConfirmation';
import { SettingsType } from './Checkout';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export interface AdminDashboardProps {
  menuItems: MenuItemType[];
  setMenuItems: (items: MenuItemType[]) => void;
  orders: Order[];
  updateOrderStatus: (orderId: number, status: string) => void;
  updateOrderPayment?: (orderId: number, paymentStatus: string) => void;
  settings: SettingsType;
  setSettings: (settings: SettingsType) => void;
}

interface SalesData {
  item_name: string;
  total: number;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({
  menuItems,
  setMenuItems,
  orders,
  updateOrderStatus,
  updateOrderPayment,
  settings,
  setSettings
}) => {

  const [activeTab, setActiveTab] = useState('orders');
  const [editingItem, setEditingItem] = useState<MenuItemType | null>(null);
  const [newItem, setNewItem] = useState({ name: '', price: '', description: '', category: '' });
  const [salesData, setSalesData] = useState<SalesData[]>([]);

  // FETCH SALES DATA FOR ANALYTICS
  useEffect(() => {
    if (activeTab === 'analytics') {
      fetch("http://localhost:5000/sales-data")
        .then(res => res.json())
        .then(data => setSalesData(data))
        .catch(err => console.log(err));
    }
  }, [activeTab]);

  const handleAddItem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const item: MenuItemType = {
      id: Date.now(),
      name: newItem.name,
      description: newItem.description,
      category: newItem.category,
      price: parseFloat(newItem.price),
      image: placeholderImage
    };
    setMenuItems([...menuItems, item]);
    setNewItem({ name: '', price: '', description: '', category: '' });
  };

  const handleUpdateItem = () => {
    if (!editingItem) return;
    setMenuItems(menuItems.map(item =>
      item.id === editingItem.id
        ? { ...editingItem, price: typeof editingItem.price === 'string'
            ? parseFloat(editingItem.price)
            : editingItem.price }
        : item
    ));
    setEditingItem(null);
  };

  const handleDeleteItem = (id: number) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
  };

  const tabs = [
    { id: 'orders', label: '📦 Orders', icon: '📦' },
    { id: 'menu', label: '🍽️ Menu Items', icon: '🍽️' },
    { id: 'analytics', label: '📊 Sales Analytics', icon: '📊' },
    { id: 'settings', label: '⚙️ Settings', icon: '⚙️' }
  ];

  return (
    <section className="pt-20 pb-16 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-dark mb-2">👨‍💼 Admin Dashboard</h2>
          <p className="text-gray-600">Manage orders, menu items, and view analytics</p>
        </div>

        <div className="mb-8">
          <nav className="flex space-x-2 bg-white p-1 rounded-xl shadow-md border border-gray-200 inline-flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-4 rounded-lg font-medium text-sm transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                    : 'text-gray-700 hover:text-primary hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* ================= ORDERS TAB ================= */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h3 className="text-xl font-bold mb-6 text-dark flex items-center">
              <span className="mr-3">📦</span> Recent Orders
            </h3>
            <div className="space-y-4">
              {orders.length === 0 ? (
                <p className="text-gray-600 py-8 text-center">No orders yet</p>
              ) : (
                orders.map(order => (
                  <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                      <div>
                        <div className="font-bold text-dark">#{order.orderNumber || order.id}</div>
                        <div className="text-xs text-gray-600 mt-1">{new Date(order.timestamp).toLocaleDateString()}</div>
                        <div className="text-sm text-gray-700 mt-2 line-clamp-2">
                          {order.items.map(item => `${item.name} (${item.quantity || 1})`).join(', ')}
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-xs text-gray-600 mb-1">Total</div>
                        <div className="text-lg font-bold text-primary">₹{order.total.toFixed(2)}</div>
                      </div>
                      
                      <div>
                        <label className="text-xs text-gray-600 block mb-1">Payment Status</label>
                        <select
                          value={order.paymentStatus || 'unpaid'}
                          onChange={(e) => updateOrderPayment && updateOrderPayment(order.id, e.target.value)}
                          className={`w-full px-3 py-2 rounded-lg border text-sm font-medium transition ${
                            order.paymentStatus === 'paid'
                              ? 'border-green-300 bg-green-50 text-green-700'
                              : 'border-orange-300 bg-orange-50 text-orange-700'
                          }`}
                        >
                          <option value="paid">✓ Paid</option>
                          <option value="unpaid">⏳ Unpaid</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="text-xs text-gray-600 block mb-1">Order Status</label>
                        <select
                          value={order.status || 'pending'}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          className={`w-full px-3 py-2 rounded-lg border text-sm font-medium transition ${
                            order.status === 'confirmed'
                              ? 'border-green-300 bg-green-50 text-green-700'
                              : order.status === 'cancelled'
                              ? 'border-red-300 bg-red-50 text-red-700'
                              : 'border-yellow-300 bg-yellow-50 text-yellow-700'
                          }`}
                        >
                          <option value="pending">⏱ Pending</option>
                          <option value="confirmed">✓ Confirmed</option>
                          <option value="cancelled">✕ Cancelled</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ================= MENU TAB ================= */}
        {activeTab === 'menu' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-xl font-bold mb-6 text-dark">➕ Add New Menu Item</h3>
              <form onSubmit={handleAddItem} className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <input
                  type="text"
                  placeholder="Item Name"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition"
                  required
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={newItem.price}
                  onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                  className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition"
                  required
                />
                <input
                  type="text"
                  placeholder="Category"
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition"
                  required
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition"
                  required
                />
                <button className="bg-gradient-to-r from-primary to-secondary text-white rounded-lg px-4 py-3 font-semibold hover:shadow-lg transition-all transform hover:-translate-y-1">
                  ➕ Add Item
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ================= ANALYTICS TAB ================= */}
        {activeTab === 'analytics' && (
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h3 className="text-xl font-bold mb-6 text-dark">📊 Top Selling Items</h3>

            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="item_name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="#FF6B6B" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* ================= SETTINGS TAB ================= */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h3 className="text-xl font-bold mb-6 text-dark">💳 Payment Settings</h3>
            <div className="max-w-md">
              <label className="block text-sm font-semibold text-dark mb-2">UPI ID</label>
              <input
                type="text"
                value={settings.upiId}
                onChange={(e) => setSettings({ ...settings, upiId: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition"
                placeholder="Enter UPI ID"
              />
              <p className="text-xs text-gray-600 mt-2">* Update your UPI ID for payment processing</p>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default AdminDashboard;

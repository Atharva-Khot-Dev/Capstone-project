import React, { useState, useEffect } from 'react';
import backgroundImage from './images/img1.jpg';
import Header from './components/Header';
import Home from './components/Home';
import Menu from './components/Menu';
import About from './components/About';
import Contact from './components/Contact';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import OrderConfirmation from './components/OrderConfirmation';
import UserOrder from './components/UserOrder';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import Chatbot from './components/Chatbot';
import { CartItem } from './components/Cart';
import { MenuItemType, defaultMenuItems } from './components/Menu';
import { Order } from './components/OrderConfirmation';
import { SettingsType } from './components/Checkout';

function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItemType[]>(defaultMenuItems);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [settings, setSettings] = useState<SettingsType>({
    upiId: '8004506394@ptsbi',
    qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='
  });

  const addToCart = (item: MenuItemType) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId: number) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(itemId);
    } else {
      setCart(cart.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      ));
    }
  };

  const createOrder = (orderData: { total: number; paymentStatus?: string }) => {
    const orderNumber = `ORD-${Date.now().toString(36)}`;
    const newOrder = {
      id: Date.now(),
      orderNumber,
      items: [...cart],
      total: orderData.total,
      status: 'pending',
      paymentStatus: orderData.paymentStatus || 'unpaid',
      timestamp: new Date().toISOString(),
      estimatedTime: '20-25 minutes'
    } as any;
    setOrders([...orders, newOrder]);
    setCurrentOrder(newOrder);
    setCart([]);
    setActiveSection('order-confirmation');
  };

  const updateOrderStatus = (orderId: number, status: string) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status } : order
    ));
  };

  const updateOrderPayment = (orderId: number, paymentStatus: string) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, paymentStatus } : order
    ));
  };

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <Header
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
      />
      <main>
        {activeSection === 'home' && <Home setActiveSection={setActiveSection} />}
        {activeSection === 'menu' && (
          <Menu
            menuItems={menuItems}
            addToCart={addToCart}
          />
        )}
        {activeSection === 'about' && <About />}
        {activeSection === 'contact' && <Contact />}
        {activeSection === 'cart' && (
          <Cart
            cart={cart}
            removeFromCart={removeFromCart}
            updateQuantity={updateQuantity}
            setActiveSection={setActiveSection}
          />
        )}
        {activeSection === 'checkout' && (
          <Checkout
            cart={cart}
            settings={settings}
            createOrder={createOrder}
          />
        )}
        {activeSection === 'order-confirmation' && (
          <OrderConfirmation
            order={currentOrder}
            setActiveSection={setActiveSection}
          />
        )}
        {activeSection === 'admin-login' && (
          <AdminLogin
            setIsAdmin={setIsAdmin}
            setActiveSection={setActiveSection}
          />
        )}
        {activeSection === 'admin' && isAdmin && (
          <AdminDashboard
            menuItems={menuItems}
            setMenuItems={setMenuItems}
            orders={orders}
            updateOrderStatus={updateOrderStatus}
            updateOrderPayment={updateOrderPayment}
            settings={settings}
            setSettings={setSettings}
          />
        )}
        {activeSection === 'my-orders' && (
          <UserOrder orders={orders} />
        )}
      </main>
      <Chatbot />
    </div>
  );
}

export default App;
# US Pizza Cafe - Complete Development Guide

## 📋 **Phase 1: Project Setup (Day 1)**

### **Step 1: Environment Setup**
```bash
# Install Node.js from nodejs.org
# Verify installation
node --version
npm --version

# Create React app
npx create-react-app us-pizza-cafe
cd us-pizza-cafe

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### **Step 2: Configure Tailwind**
```javascript
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#ff6b35',
        secondary: '#f7931e',
        accent: '#ffb627'
      }
    },
  },
  plugins: [],
}
```

### **Step 3: Setup Base Styles**
```css
/* src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

body {
  font-family: 'Inter', sans-serif;
}
```

## 📋 **Phase 2: Basic Structure (Day 2)**

### **Step 4: Create Folder Structure**
```
src/
├── components/
│   ├── Header.js
│   ├── Hero.js
│   ├── Menu.js
│   ├── About.js
│   └── Contact.js
├── App.js
├── index.js
└── index.css
```

### **Step 5: Build App.js (Main Component)**
```javascript
// src/App.js
import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      <main>
        {activeSection === 'home' && <Hero setActiveSection={setActiveSection} />}
      </main>
    </div>
  );
}

export default App;
```

### **Step 6: Create Header Component**
```javascript
// src/components/Header.js
import React from 'react';

const Header = ({ activeSection, setActiveSection }) => {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Menu' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <h1 className="text-2xl font-bold text-primary">🍕 US Pizza</h1>
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`px-3 py-2 text-sm font-medium ${
                  activeSection === item.id ? 'text-primary' : 'text-gray-700'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
```

## 📋 **Phase 3: Landing Page (Day 3)**

### **Step 7: Create Hero Component**
```javascript
// src/components/Hero.js
import React from 'react';

const Hero = ({ setActiveSection }) => {
  return (
    <section className="pt-16 bg-gradient-to-br from-primary to-secondary text-white">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Delicious Pizza Delivered Fresh
          </h1>
          <p className="text-xl mb-8">
            Authentic Italian flavors crafted with love
          </p>
          <button
            onClick={() => setActiveSection('menu')}
            className="bg-white text-primary px-8 py-4 rounded-full font-semibold hover:bg-gray-100"
          >
            🍕 View Menu
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
```

## 📋 **Phase 4: Menu System (Day 4-5)**

### **Step 8: Add Menu State to App.js**
```javascript
// Update App.js
const [menuItems, setMenuItems] = useState([
  { id: 1, name: 'Margherita Pizza', price: 250, description: 'Fresh tomatoes, mozzarella, basil', category: 'Pizza' },
  { id: 2, name: 'Pepperoni Pizza', price: 300, description: 'Pepperoni, mozzarella, tomato sauce', category: 'Pizza' }
]);

// Add to JSX
{activeSection === 'menu' && <Menu menuItems={menuItems} />}
```

### **Step 9: Create Menu Component**
```javascript
// src/components/Menu.js
import React from 'react';

const Menu = ({ menuItems }) => {
  return (
    <section className="pt-20 pb-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Menu</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems.map((item) => (
            <div key={item.id} className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
              <p className="text-gray-600 mb-2">{item.description}</p>
              <p className="text-primary font-bold">₹{item.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;
```

## 📋 **Phase 5: Shopping Cart (Day 6-7)**

### **Step 10: Add Cart State**
```javascript
// Update App.js
const [cart, setCart] = useState([]);

const addToCart = (item) => {
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
```

### **Step 11: Update Menu with Add to Cart**
```javascript
// Update Menu.js
<button 
  onClick={() => addToCart(item)}
  className="w-full bg-primary text-white px-4 py-2 rounded mt-4"
>
  Add to Cart
</button>
```

### **Step 12: Create Cart Component**
```javascript
// src/components/Cart.js
import React from 'react';

const Cart = ({ cart, removeFromCart }) => {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <section className="pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Your Cart</h2>
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between items-center bg-gray-50 p-4 mb-4 rounded">
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p>Quantity: {item.quantity}</p>
            </div>
            <div>
              <p className="font-bold">₹{(item.price * item.quantity).toFixed(2)}</p>
              <button onClick={() => removeFromCart(item.id)} className="text-red-600">Remove</button>
            </div>
          </div>
        ))}
        <div className="text-xl font-bold">Total: ₹{total.toFixed(2)}</div>
      </div>
    </section>
  );
};

export default Cart;
```

## 📋 **Phase 6: Payment System (Day 8-9)**

### **Step 13: Create Checkout Component**
```javascript
// src/components/Checkout.js
import React, { useState } from 'react';

const Checkout = ({ cart, createOrder }) => {
  const [isPaid, setIsPaid] = useState(false);
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const upiId = "yourstore@paytm";

  return (
    <section className="pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Checkout</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between mb-2">
                <span>{item.name} x {item.quantity}</span>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="font-bold text-lg">Total: ₹{total.toFixed(2)}</div>
          </div>

          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Payment</h3>
            <div className="bg-gray-200 w-48 h-48 mx-auto mb-4 flex items-center justify-center">
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(`upi://pay?pa=${upiId}&pn=US Pizza&am=${total}&cu=INR`)}`}
                alt="QR Code"
              />
            </div>
            <p className="mb-4">Scan to pay ₹{total.toFixed(2)}</p>
            
            <label className="flex items-center justify-center mb-4">
              <input
                type="checkbox"
                checked={isPaid}
                onChange={(e) => setIsPaid(e.target.checked)}
                className="mr-2"
              />
              I have completed the payment
            </label>
            
            <button
              onClick={() => isPaid && createOrder({ total })}
              disabled={!isPaid}
              className={`px-6 py-3 rounded ${isPaid ? 'bg-primary text-white' : 'bg-gray-300'}`}
            >
              Confirm Order
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
```

## 📋 **Phase 7: Admin Panel (Day 10-12)**

### **Step 14: Create Admin Login**
```javascript
// src/components/AdminLogin.js
import React, { useState } from 'react';

const AdminLogin = ({ setIsAdmin, setActiveSection }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleLogin = (e) => {
    e.preventDefault();
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      setIsAdmin(true);
      setActiveSection('admin');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <section className="pt-20 pb-16">
      <div className="max-w-md mx-auto">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-6">Admin Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={credentials.username}
            onChange={(e) => setCredentials({...credentials, username: e.target.value})}
            className="w-full p-3 border rounded mb-4"
          />
          <input
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
            className="w-full p-3 border rounded mb-4"
          />
          <button type="submit" className="w-full bg-primary text-white p-3 rounded">
            Login
          </button>
        </form>
      </div>
    </section>
  );
};

export default AdminLogin;
```

## 📋 **Phase 8: Testing & Deployment (Day 13-14)**

### **Step 15: Testing Checklist**
- [ ] Navigation works between all sections
- [ ] Add to cart functionality
- [ ] Cart quantity updates
- [ ] Checkout process
- [ ] QR code generation
- [ ] Admin login
- [ ] Menu management
- [ ] Order tracking
- [ ] Responsive design

### **Step 16: Deployment**
```bash
# Build for production
npm run build

# Deploy to Netlify
# 1. Create account on netlify.com
# 2. Drag & drop build folder
# 3. Get live URL

# Or deploy to Vercel
npm install -g vercel
vercel --prod
```

## 📚 **Learning Resources**

### **React Fundamentals**
1. **Components** - Reusable UI pieces
2. **Props** - Data passing between components
3. **State** - Component data management
4. **Hooks** - useState, useEffect
5. **Event Handling** - onClick, onChange

### **CSS/Tailwind**
1. **Flexbox** - Layout system
2. **Grid** - 2D layout
3. **Responsive Design** - Mobile-first
4. **Utility Classes** - Tailwind approach

### **JavaScript ES6+**
1. **Arrow Functions** - Modern syntax
2. **Destructuring** - Object/array unpacking
3. **Spread Operator** - Array/object copying
4. **Template Literals** - String interpolation

## 🎯 **Daily Goals**

- **Day 1-2**: Setup + Basic structure
- **Day 3-4**: Landing page + Navigation
- **Day 5-6**: Menu system + Cart
- **Day 7-8**: Checkout + Payment
- **Day 9-10**: Admin panel
- **Day 11-12**: Polish + Testing
- **Day 13-14**: Deployment + Documentation

**Total Time**: 2 weeks (1-2 hours daily)

Start with Day 1 and build incrementally. Each phase adds new functionality while reinforcing previous concepts!
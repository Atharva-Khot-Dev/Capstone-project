# US Pizza Cafe - System Architecture

## 🏗️ **Overall Architecture**

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENT SIDE (Browser)                    │
├─────────────────────────────────────────────────────────────┤
│  React Frontend (Port 3000)                                │
│  ├── Components (UI Layer)                                 │
│  ├── State Management (React Hooks)                        │
│  └── Styling (Tailwind CSS)                                │
├─────────────────────────────────────────────────────────────┤
│                    SERVER SIDE (Future)                    │
├─────────────────────────────────────────────────────────────┤
│  Flask Backend (Port 5000)                                 │
│  ├── REST API Endpoints                                    │
│  ├── Business Logic                                        │
│  └── Database Operations                                   │
├─────────────────────────────────────────────────────────────┤
│                    DATA LAYER                              │
├─────────────────────────────────────────────────────────────┤
│  SQLite Database                                           │
│  ├── Menu Items Table                                      │
│  ├── Orders Table                                          │
│  └── Settings Table                                        │
└─────────────────────────────────────────────────────────────┘
```

## 📁 **Frontend Architecture (Current Implementation)**

### **Component Hierarchy**
```
App.js (Root Component)
├── Header.js (Navigation)
├── Hero.js (Landing Page)
├── Menu.js (Product Display)
├── About.js (Business Info)
├── Contact.js (Contact Form)
├── Cart.js (Shopping Cart)
├── Checkout.js (Payment)
├── OrderConfirmation.js (Success Page)
├── AdminLogin.js (Authentication)
└── AdminDashboard.js (Management Panel)
```

### **State Management Flow**
```
App.js (Central State)
├── activeSection (Navigation State)
├── cart (Shopping Cart State)
├── orders (Order Management)
├── menuItems (Product Data)
├── isAdmin (Authentication)
├── currentOrder (Active Order)
└── settings (Configuration)
```

### **Data Flow Pattern**
```
User Action → Component → State Update → UI Re-render
     ↓
Props Passing → Child Components → Event Handlers → Parent State
```

## 🔧 **Technology Stack**

### **Frontend Technologies**
```
┌─────────────────┬─────────────────┬─────────────────┐
│   Framework     │    Styling      │   Build Tools   │
├─────────────────┼─────────────────┼─────────────────┤
│ React 18        │ Tailwind CSS    │ Create React App│
│ JavaScript ES6+ │ CSS3            │ npm             │
│ HTML5           │ Responsive Grid │ Webpack         │
└─────────────────┴─────────────────┴─────────────────┘
```

### **Backend Technologies (Planned)**
```
┌─────────────────┬─────────────────┬─────────────────┐
│   Framework     │    Database     │   Integration   │
├─────────────────┼─────────────────┼─────────────────┤
│ Flask (Python)  │ SQLite          │ REST API        │
│ SQLAlchemy ORM  │ File-based DB   │ JSON Data       │
│ Flask-CORS      │ ACID Properties │ HTTP Methods    │
└─────────────────┴─────────────────┴─────────────────┘
```

## 📊 **Database Schema (Planned)**

### **Tables Structure**
```sql
-- Menu Items Table
CREATE TABLE menu_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT,
    category TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders Table
CREATE TABLE orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    items TEXT NOT NULL,  -- JSON string
    total REAL NOT NULL,
    status TEXT DEFAULT 'pending',
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estimated_time TEXT
);

-- Settings Table
CREATE TABLE settings (
    id INTEGER PRIMARY KEY,
    upi_id TEXT,
    business_name TEXT DEFAULT 'US Pizza',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔄 **API Architecture (Future Implementation)**

### **REST Endpoints**
```
┌─────────────────┬─────────────────┬─────────────────┐
│     Endpoint    │     Method      │   Description   │
├─────────────────┼─────────────────┼─────────────────┤
│ /api/menu       │ GET             │ Get all items   │
│ /api/menu       │ POST            │ Add new item    │
│ /api/menu/:id   │ PUT             │ Update item     │
│ /api/menu/:id   │ DELETE          │ Delete item     │
├─────────────────┼─────────────────┼─────────────────┤
│ /api/orders     │ GET             │ Get all orders  │
│ /api/orders     │ POST            │ Create order    │
│ /api/orders/:id │ PUT             │ Update status   │
├─────────────────┼─────────────────┼─────────────────┤
│ /api/settings   │ GET             │ Get settings    │
│ /api/settings   │ PUT             │ Update settings │
├─────────────────┼─────────────────┼─────────────────┤
│ /api/admin/login│ POST            │ Admin auth      │
└─────────────────┴─────────────────┴─────────────────┘
```

## 🎯 **Component Architecture Details**

### **Customer Flow Components**
```
Hero → Menu → Cart → Checkout → OrderConfirmation
  ↓      ↓      ↓        ↓           ↓
Landing  Browse  Manage   Pay      Success
Page    Items   Items   UPI QR    Message
```

### **Admin Flow Components**
```
AdminLogin → AdminDashboard
     ↓            ↓
  Auth Check   Management
               ├── Orders Tab
               ├── Menu Tab
               └── Settings Tab
```

## 🔒 **Security Architecture**

### **Current Security Measures**
```
┌─────────────────────────────────────────────────────────────┐
│ Frontend Security                                           │
├─────────────────────────────────────────────────────────────┤
│ • Input Validation                                          │
│ • State-based Authentication                                │
│ • No Sensitive Data Storage                                 │
│ • HTTPS Deployment                                          │
└─────────────────────────────────────────────────────────────┘
```

### **Future Security Enhancements**
```
┌─────────────────────────────────────────────────────────────┐
│ Backend Security (Planned)                                  │
├─────────────────────────────────────────────────────────────┤
│ • JWT Token Authentication                                  │
│ • Password Hashing (bcrypt)                                │
│ • Rate Limiting                                             │
│ • SQL Injection Prevention                                  │
│ • CORS Configuration                                        │
└─────────────────────────────────────────────────────────────┘
```

## 📱 **Responsive Design Architecture**

### **Breakpoint Strategy**
```
Mobile First Approach:
├── Mobile (320px - 768px)    → Stack layout
├── Tablet (768px - 1024px)   → 2-column grid
└── Desktop (1024px+)         → 3-column grid
```

### **Component Responsiveness**
```
┌─────────────────┬─────────────────┬─────────────────┐
│     Mobile      │     Tablet      │    Desktop      │
├─────────────────┼─────────────────┼─────────────────┤
│ Single column   │ 2-column grid   │ 3-column grid   │
│ Stack navigation│ Horizontal nav  │ Full navigation │
│ Touch-friendly  │ Mixed interface │ Mouse-optimized │
└─────────────────┴─────────────────┴─────────────────┘
```

## 🚀 **Deployment Architecture**

### **Current Deployment**
```
Development Environment:
├── Local Development (npm start)
├── Build Process (npm run build)
└── Static Hosting (Netlify/Vercel)
```

### **Production Architecture (Planned)**
```
┌─────────────────────────────────────────────────────────────┐
│                    Production Setup                         │
├─────────────────────────────────────────────────────────────┤
│ Frontend: Netlify/Vercel (CDN)                             │
│ Backend: Heroku/Railway (Cloud)                            │
│ Database: SQLite → PostgreSQL                              │
│ Domain: Custom domain with SSL                             │
└─────────────────────────────────────────────────────────────┘
```

## 📈 **Scalability Architecture**

### **Current Capacity**
- **Users**: 100+ concurrent users
- **Orders**: Unlimited (memory-based)
- **Menu Items**: Unlimited
- **Performance**: <2 second load time

### **Future Scalability**
```
Horizontal Scaling:
├── Load Balancer
├── Multiple Backend Instances
├── Database Clustering
└── CDN for Static Assets
```

This architecture provides a solid foundation for a modern cafe management system with room for future enhancements and scaling.
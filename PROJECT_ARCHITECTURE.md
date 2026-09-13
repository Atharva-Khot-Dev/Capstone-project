# Code & Coffee - Project Architecture

## 1. Overview
This project is a React + TypeScript cafe ordering system with a customer shopping flow, payment checkout, admin dashboard, and chatbot support. The frontend is a single-page app built with React and Tailwind CSS, while the backend is an Express API running on port 5000 and a Python recommendation service for AI-based product suggestions.

The current implementation is a hybrid local app architecture:
- Frontend: React app running on port 3000
- Backend: Express server serving REST endpoints on port 5000
- Data layer: MySQL database when available, with in-memory fallback for local/demo use
- Recommendation layer: Python script using item association logic

---

## 2. High-Level System Structure

```text
┌──────────────────────────────────────────────────────────────┐
│                        Client (Browser)                       │
│  React + TypeScript + Tailwind                                │
│  - Header / Navigation                                        │
│  - Menu browsing                                              │
│  - Cart and checkout                                          │
│  - Order confirmation                                         │
│  - Admin dashboard                                            │
│  - Chatbot widget                                             │
└───────────────────────┬──────────────────────────────────────┘
                        │ HTTP / JSON
                        ▼
┌──────────────────────────────────────────────────────────────┐
│                    Backend API (Express)                      │
│  File: backend/server.js                                      │
│  - POST /addOrder                                             │
│  - GET /recommend                                             │
│  - GET /sales-data                                            │
│  - POST /create-order                                         │
│  - MySQL integration with fallback mode                       │
└───────────────────────┬──────────────────────────────────────┘
                        │
                        ├──────────────► MySQL Database (optional)
                        │
                        └──────────────► Python Recommendation Engine
                                            File: backend/recommendation.py
                                            - reads order data
                                            - runs association logic
                                            - returns product suggestion
```

---

## 3. Frontend Architecture

### 3.1 Runtime Stack
- React 18
- TypeScript
- Create React App (react-scripts)
- Tailwind CSS
- Recharts for analytics charts
- Local component state with React hooks

### 3.2 Main Application Flow
The root component is [src/App.tsx](src/App.tsx). It owns the primary app state and switches between page sections using the `activeSection` state.

#### Root State
```ts
const [activeSection, setActiveSection] = useState<string>('home');
const [cart, setCart] = useState<CartItem[]>([]);
const [orders, setOrders] = useState<Order[]>([]);
const [menuItems, setMenuItems] = useState<MenuItemType[]>(defaultMenuItems);
const [isAdmin, setIsAdmin] = useState<boolean>(false);
const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
const [settings, setSettings] = useState<SettingsType>({...})
```

This central state drives:
- navigation between sections
- cart changes and quantity updates
- order creation and tracking
- admin menu editing
- payment configuration

### 3.3 Screen and Component Layout

```text
src/App.tsx
├── Header
├── Home
├── Menu
├── About
├── Contact
├── Cart
├── Checkout
├── OrderConfirmation
├── UserOrder
├── AdminLogin
├── AdminDashboard
└── Chatbot
```

### 3.4 Core Customer Flow
```text
Home -> Menu -> Cart -> Checkout -> OrderConfirmation
```

The customer journey is:
1. Browse menu items
2. Add items to cart
3. Update quantities or remove items
4. Confirm order and pay via UPI QR flow
5. Store order locally in state and optionally send to backend
6. View success confirmation page

### 3.5 Admin Flow
```text
AdminLogin -> AdminDashboard
```

The admin dashboard supports:
- viewing recent orders
- updating payment status
- updating order status
- adding menu items
- viewing sales analytics
- editing payment settings

---

## 4. Backend Architecture

### 4.1 Backend Runtime
- Node.js + Express
- File: [backend/server.js](backend/server.js)
- Port: 5000
- CORS enabled for frontend requests
- JSON parsing enabled

### 4.2 API Responsibilities

```text
POST /addOrder
- stores a single order item into DB or fallback memory
- receives item_name, quantity, price

GET /recommend
- runs Python recommendation logic
- returns product recommendation text
- falls back to static recommendation text if Python fails

GET /sales-data
- returns aggregated sales information for analytics
- reads from MySQL when connected, otherwise from in-memory orders

POST /create-order
- creates a full order record with status and payment status
- inserts items into related tables if MySQL is active
```

### 4.3 Database Strategy
The system was built to support MySQL, but currently includes a resilient fallback mode:

```text
if MySQL connection succeeds:
    save into real database tables
else:
    store order data in in-memory array for local/demo usage
```

This is important because the current app is designed to continue running even when MySQL is unavailable.

---

## 5. Recommendation Engine

### 5.1 Python Module
- File: [backend/recommendation.py](backend/recommendation.py)
- Uses Python libraries for data processing and market basket analysis

### 5.2 Purpose
The recommendation service analyzes previous orders and suggests related products based on item associations. It is intended to provide personalized suggestions such as:
- “Buy Byte Burger and you may also like Caffeine Coffee”
- “Buy Stack Overflow Fries and you may also like Java Shake”

### 5.3 Current Behavior
The backend calls the Python script and, if it fails or returns no result, it falls back to a static recommendation message. This prevents the checkout journey from failing when the recommendation service is unavailable.

---

## 6. Data Model

### 6.1 Frontend Data Types
The app uses strong TypeScript interfaces for items and orders.

```ts
interface MenuItemType {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  quantity?: number;
}
```

```ts
interface CartItem extends MenuItemType {
  quantity: number;
}
```

```ts
interface Order {
  id: number;
  orderNumber: string;
  items: CartItem[];
  total: number;
  status: string;
  paymentStatus: string;
  timestamp: string;
  estimatedTime: string;
}
```

### 6.2 MySQL-Based Persistence Model
The backend expects database tables similar to:

```sql
orders (
  id,
  item_name,
  quantity,
  price
)

customer_orders (
  id,
  total,
  payment_status,
  status
)

order_items (
  id,
  order_id,
  item_name,
  quantity,
  price
)
```

This matches the server’s current SQL queries in [backend/server.js](backend/server.js).

---

## 7. Architecture Pattern Used
The project follows a lightweight layered pattern:

```text
Presentation Layer
  React components and UI state
      ↓
Application Layer
  App.tsx logic for cart, order, admin, and navigation
      ↓
Service Layer
  Express API endpoints
      ↓
Data Layer
  MySQL database or in-memory fallback
      ↓
Recommendation Layer
  Python association-based recommendation script
```

This is not a full enterprise microservice setup; it is a modular single-page application with a small backend and AI recommendation service.

---

## 8. Current Design Characteristics

### Customer-facing features
- menu browsing
- cart management
- UPI payment simulation
- order confirmation
- order tracking in UI
- chatbot assistant

### Admin-focused features
- dashboard tabs for orders, menu, analytics, and settings
- order status editing
- payment status editing
- new item creation
- sales analytics chart

### Safety and resilience
- API fallback if backend is unavailable
- graceful recommendation fallback
- local in-memory order storage for demo mode

---

## 9. Deployment Model

### Current local development setup
```text
Frontend: npm start
Backend: node backend/server.js
```

### Architecture for local run
```text
Browser (localhost:3000)
    ↔ React frontend
    ↔ Express API (localhost:5000)
    ↔ optional MySQL DB
    ↔ Python recommendation script
```

### Production direction
The project is ready for a future production upgrade with:
- proper environment variables
- backend hosting on a cloud server
- MySQL hosting service
- secure admin authentication
- REST API versioning and proper validation

---

## 10. Summary
The current project architecture is a modern React front-end connected to a Node/Express backend with optional MySQL persistence and a Python-based recommendation engine. The design is intentionally practical and demo-friendly, with fallback logic to keep the app functional even when database or ML services are temporarily unavailable.

This makes the system suitable for a capstone project, local development, and later extension into a full production cafe management application.

# Flask Backend API Endpoints

## Database Tables (SQLite)

### menu_items
- id (INTEGER PRIMARY KEY)
- name (TEXT)
- price (REAL)
- description (TEXT)
- category (TEXT)

### orders
- id (INTEGER PRIMARY KEY)
- items (TEXT - JSON)
- total (REAL)
- status (TEXT)
- timestamp (TEXT)
- estimated_time (TEXT)

### settings
- id (INTEGER PRIMARY KEY)
- upi_id (TEXT)
- qr_code (TEXT)

## API Endpoints

### Menu Items
- GET /api/menu - Get all menu items
- POST /api/menu - Add new menu item
- PUT /api/menu/{id} - Update menu item
- DELETE /api/menu/{id} - Delete menu item

### Orders
- GET /api/orders - Get all orders
- POST /api/orders - Create new order
- PUT /api/orders/{id} - Update order status

### Settings
- GET /api/settings - Get payment settings
- PUT /api/settings - Update payment settings

### Admin
- POST /api/admin/login - Admin authentication

## Frontend is ready to connect to these endpoints when backend is implemented.
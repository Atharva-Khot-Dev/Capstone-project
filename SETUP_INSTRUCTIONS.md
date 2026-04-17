# ☕ US Coffee Cafe - Setup Instructions

## 📦 Quick Setup for Friends

### 1. Extract the Project
```bash
# Extract the ZIP file to your desired location
# Navigate to the project folder
cd us-coffee-cafe
```

### 2. Install Dependencies
```bash
# Install all required packages
npm install

# This will install:
# - React 18 (Frontend framework)
# - Tailwind CSS (Styling)
# - Testing libraries
# - All build tools
```

### 3. Start the Application
```bash
# Start development server
npm start

# App will open at: http://localhost:3000
```

### 4. Build for Production (Optional)
```bash
# Create production build
npm run build

# Deploy the 'build' folder to any hosting service
```

## 🚀 Features Included

✅ **Modern Coffee Cafe Website**
- Responsive design for all devices
- Menu browsing with cart functionality
- UPI QR code payment system
- Order management system

✅ **Admin Dashboard**
- Login: admin / admin123
- Add/Edit/Delete menu items
- View and manage orders
- Update payment settings

✅ **AI Chatbot**
- Dialogflow integration
- Customer support automation
- Menu inquiries and order assistance

## 🛠️ Tech Stack

- **Frontend**: React 18 + Tailwind CSS
- **Chatbot**: Google Dialogflow
- **Payment**: UPI QR Code integration
- **Build Tool**: Create React App

## 📱 How to Use

1. **Customer Flow**: Home → Menu → Cart → Checkout → Payment
2. **Admin Access**: Click "Admin" → Login → Manage menu/orders
3. **Chatbot**: Click chat bubble → Ask questions about menu/orders

## 🔧 Customization

- **Colors**: Edit `tailwind.config.js`
- **Menu Items**: Admin dashboard or `src/App.js`
- **Business Info**: `src/components/About.js` and `src/components/Contact.js`
- **UPI ID**: Admin settings or `src/App.js`

## 📞 Support

If you face any issues:
1. Make sure Node.js is installed (v16+)
2. Delete `node_modules` and run `npm install` again
3. Check console for error messages

**Project Size**: ~5MB (without node_modules)
**Installation Time**: 2-3 minutes
**Ready to Use**: Immediately after `npm start`
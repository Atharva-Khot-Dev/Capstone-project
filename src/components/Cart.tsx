import React from 'react';
import { MenuItemType } from './Menu';

export interface CartItem extends MenuItemType {
  quantity: number;
}

export interface CartProps {
  cart: CartItem[];
  removeFromCart: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  setActiveSection: (section: string) => void;
}

const Cart: React.FC<CartProps> = ({ cart, removeFromCart, updateQuantity, setActiveSection }) => {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <section className="pt-20 pb-16 bg-gradient-to-b from-gray-50 to-white min-h-screen flex items-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
          <div className="text-6xl mb-6">🛒</div>
          <h2 className="text-3xl font-bold text-dark mb-3">Your Cart is Empty</h2>
          <p className="text-gray-600 text-lg mb-8">Looks like you haven't added anything yet!</p>
          <button
            onClick={() => setActiveSection('menu')}
            className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all transform hover:-translate-y-1"
          >
            Browse Our Menu
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-20 pb-16 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-dark mb-2">🛒 Your Cart</h2>
          <p className="text-gray-600">Review your items before checkout</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-shadow duration-300">
                <div className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-lg object-cover shadow-sm"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-dark text-lg">{item.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-primary font-bold text-lg">₹{(item.price * item.quantity).toFixed(2)}</span>
                      <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 bg-white rounded flex items-center justify-center hover:bg-primary hover:text-white transition text-sm font-bold"
                        >
                          −
                        </button>
                        <span className="w-6 text-center font-semibold text-dark">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 bg-white rounded flex items-center justify-center hover:bg-primary hover:text-white transition text-sm font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-red-600 transition text-xl h-fit"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="md:col-span-1">
            <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-24 shadow-lg">
              <h3 className="text-lg font-bold text-dark mb-4">Order Summary</h3>
              <div className="space-y-3 mb-4 pb-4 border-b">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span className="text-success">FREE</span>
                </div>
              </div>
              <div className="flex justify-between text-xl font-bold text-dark mb-6">
                <span>Total</span>
                <span className="text-primary">₹{total.toFixed(2)}</span>
              </div>
              <div className="space-y-3">
                <button
                  onClick={() => setActiveSection('checkout')}
                  className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all transform hover:-translate-y-1"
                >
                  Proceed to Checkout
                </button>
                <button
                  onClick={() => setActiveSection('menu')}
                  className="w-full border border-gray-300 text-dark py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
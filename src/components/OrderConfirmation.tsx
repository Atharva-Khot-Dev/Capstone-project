import React from 'react';
import { CartItem } from './Cart';

export interface Order {
  id: number;
  items: CartItem[];
  total: number;
  orderNumber?: string;
  status: string;
  paymentStatus?: string;
  timestamp: string;
  estimatedTime: string;
}

export interface OrderConfirmationProps {
  order: Order | null;
  setActiveSection: (section: string) => void;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ order, setActiveSection }) => {
  if (!order) return null;

  return (
    <section className="pt-20 pb-16 bg-white min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-green-50 border border-green-200 rounded-lg p-8">
          <div className="text-green-600 text-6xl mb-4">✓</div>
          <h2 className="text-3xl font-bold text-dark mb-4">Order Confirmed!</h2>

          <div className="bg-white p-6 rounded-lg mb-6">
            <h3 className="text-xl font-semibold mb-4">Order Details</h3>
            <div className="space-y-2 text-left">
              <div className="flex justify-between">
                <span className="font-medium">Order Number:</span>
                  <span>#{order.orderNumber || order.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Total Amount:</span>
                <span>₹{order.total.toFixed(2)}</span>
              </div>
                <div className="flex justify-between">
                  <span className="font-medium">Payment:</span>
                  <span className="capitalize">{order.paymentStatus || 'unpaid'}</span>
                </div>
              <div className="flex justify-between">
                <span className="font-medium">Estimated Time:</span>
                <span>{order.estimatedTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Status:</span>
                <span className="capitalize text-yellow-600">{order.status}</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold mb-2">Items Ordered:</h4>
            <div className="space-y-1">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.name} x {item.quantity}</span>
                  <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-gray-600 mb-6">
            Thank you for your order! We'll start preparing your food right away.
            You'll receive updates on your order status.
          </p>

          <button
            onClick={() => setActiveSection('home')}
            className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    </section>
  );
};

export default OrderConfirmation;
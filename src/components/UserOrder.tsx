import React from 'react';
import { Order } from './OrderConfirmation';

export interface UserOrderProps {
  orders: Order[];
}

const UserOrder: React.FC<UserOrderProps> = ({ orders }) => {
  const sorted = [...orders].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  const recent = sorted.slice(0, 10);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-300';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getPaymentColor = (payment: string) => {
    return payment === 'paid' ? 'bg-green-100 text-green-800 border-green-300' : 'bg-orange-100 text-orange-800 border-orange-300';
  };

  return (
    <section className="pt-20 pb-16 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-dark mb-2">📦 My Orders</h2>
          <p className="text-gray-600">Track your recent orders and their status</p>
        </div>
        
        <div className="space-y-4">
          {recent.length === 0 && (
            <div className="bg-white border border-gray-200 p-8 rounded-xl text-center">
              <div className="text-5xl mb-4">📋</div>
              <p className="text-gray-600 text-lg">No orders yet. Start your journey with us!</p>
            </div>
          )}

          {recent.map((order) => (
            <div key={order.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                <div>
                  <div className="font-bold text-lg text-dark mb-1">Order #{order.orderNumber || order.id}</div>
                  <div className="text-sm text-gray-600">{new Date(order.timestamp).toLocaleDateString()} at {new Date(order.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(order.status)}`}>
                    {order.status === 'confirmed' ? '✓' : order.status === 'cancelled' ? '✕' : '⏱'} {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${getPaymentColor(order.paymentStatus || 'unpaid')}`}>
                    {order.paymentStatus === 'paid' ? '💳' : '⏳'} {order.paymentStatus === 'paid' ? 'Paid' : 'Unpaid'}
                  </span>
                </div>
              </div>

              <div className="border-t border-b py-4 mb-4">
                <div className="space-y-2">
                  {order.items.map((it) => (
                    <div key={it.id} className="flex justify-between text-sm">
                      <span className="text-gray-700">{it.name} x {it.quantity}</span>
                      <span className="font-semibold text-dark">₹{(it.price * it.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-lg font-bold text-dark">Total: <span className="text-primary">₹{order.total.toFixed(2)}</span></div>
                <div className="text-sm text-gray-600">Est. time: {order.estimatedTime}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserOrder;

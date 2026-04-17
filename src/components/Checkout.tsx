import React, { useState } from 'react';
import { CartItem } from './Cart';
import paymentQR from '../images/paymentQR.jpeg';

export interface SettingsType {
  upiId: string;
  qrCode: string;
}

export interface CheckoutProps {
  cart: CartItem[];
  settings: SettingsType;
}

export interface CheckoutExtraProps {
  createOrder?: (orderData: { total: number; paymentStatus: string }) => void;
}

const Checkout: React.FC<CheckoutProps & CheckoutExtraProps> = ({ cart, settings, createOrder }) => {

  const [payLater, setPayLater] = useState(false);

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // THIS WILL STORE ORDER IN MYSQL
  const handleCheckout = async () => {

    try {

      for (let item of cart) {

        await fetch("http://localhost:5000/addOrder", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            item_name: item.name,
            quantity: item.quantity,
            price: item.price
          })
        });

      }

      const paymentStatus = payLater ? 'unpaid' : 'paid';

      if (createOrder) {
        createOrder({ total, paymentStatus });
      }

      alert("Order Stored in Database!");

      const response = await fetch("http://localhost:5000/recommend");
      const recommendation = await response.text();

      alert("Recommended for you:\n\n" + recommendation);

    } catch (error) {
      console.log(error);
      alert("Error sending order");
    }
  };

  return (
    <section className="pt-20 pb-16 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-12">
          <h2 className="text-4xl font-bold text-dark mb-2">💳 Checkout</h2>
          <p className="text-gray-600">Complete your order securely</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="md:col-span-2">
            <h3 className="text-xl font-semibold mb-4 text-dark">Order Summary</h3>

            <div className="bg-white border border-gray-200 p-6 rounded-xl space-y-4">

              {cart.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>{item.name} x {item.quantity}</span>
                  <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}

              <div className="border-t pt-4 mt-4 font-semibold flex justify-between text-lg">
                <span>Total:</span>
                <span className="text-primary">₹{total.toFixed(2)}</span>
              </div>

            </div>
          </div>

          <div>

            <h3 className="text-xl font-semibold mb-4 text-dark">Payment</h3>

            <div className="bg-white border border-gray-200 p-6 rounded-xl text-center sticky top-24">

              <p className="mb-4 font-semibold text-dark">📱 Scan to Pay</p>

              <div className="bg-gradient-to-b from-gray-50 to-white p-4 rounded-lg inline-block mb-6 border border-gray-200">
                <img
                  src={paymentQR}
                  alt="Payment QR"
                  className="w-48 h-48 object-cover rounded"
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">UPI ID:</span>
                  <span className="font-mono font-semibold">{settings.upiId}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-bold text-primary text-lg">₹{total.toFixed(2)}</span>
                </div>
              </div>

              <label className="flex items-center justify-center space-x-2 mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg cursor-pointer hover:bg-blue-100 transition">
                <input
                  type="checkbox"
                  checked={payLater}
                  onChange={(e) => setPayLater(e.target.checked)}
                  className="w-5 h-5 cursor-pointer"
                />
                <span className="text-dark font-medium">Pay Later (will be marked unpaid)</span>
              </label>

              <button
                onClick={handleCheckout}
                className={`w-full py-3 rounded-lg font-semibold transition-all transform hover:-translate-y-1 bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg`}
              >
                ✓ Confirm Order
              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Checkout;
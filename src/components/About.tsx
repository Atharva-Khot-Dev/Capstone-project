import React from 'react';

const About: React.FC = () => {
  return (
    <section className="pt-20 pb-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4">
            About Code & Coffee
          </h2>
          <p className="text-gray-600 text-xl">
            A Modern Food Ordering Platform Built with React & Technology
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          {/* LEFT - Project Info */}
          <div className="bg-white border border-gray-200 p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold text-dark mb-4">🚀 Our Platform</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Code & Coffee is a full-stack web application designed to streamline food ordering and delivery. Built with React, TypeScript, and Tailwind CSS, our platform provides an intuitive interface for customers to browse, order, and track their meals in real-time.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              From menu management to secure payment processing via UPI, order status tracking, and an intelligent admin dashboard — we've built a complete solution for modern café operations.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-primary to-secondary p-6 rounded-xl text-white text-center">
                <h4 className="text-3xl font-bold mb-2">100%</h4>
                <p className="text-sm font-semibold">React-Based</p>
              </div>
              <div className="bg-gradient-to-br from-secondary to-primary p-6 rounded-xl text-white text-center">
                <h4 className="text-3xl font-bold mb-2">Real-time</h4>
                <p className="text-sm font-semibold">Order Tracking</p>
              </div>
            </div>
          </div>

          {/* RIGHT - Features */}
          <div className="bg-white border border-gray-200 p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold text-dark mb-6">✨ Key Features</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="w-6 h-6 bg-primary text-white rounded-full mr-4 flex items-center justify-center flex-shrink-0 text-sm font-bold">✓</span>
                <div>
                  <p className="font-semibold text-dark">Menu Management</p>
                  <p className="text-sm text-gray-600">Dynamic menu with item management</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-6 h-6 bg-primary text-white rounded-full mr-4 flex items-center justify-center flex-shrink-0 text-sm font-bold">✓</span>
                <div>
                  <p className="font-semibold text-dark">Secure Payment</p>
                  <p className="text-sm text-gray-600">UPI QR code integration for fast checkout</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-6 h-6 bg-primary text-white rounded-full mr-4 flex items-center justify-center flex-shrink-0 text-sm font-bold">✓</span>
                <div>
                  <p className="font-semibold text-dark">Order Tracking</p>
                  <p className="text-sm text-gray-600">Real-time status updates with unique order IDs</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-6 h-6 bg-primary text-white rounded-full mr-4 flex items-center justify-center flex-shrink-0 text-sm font-bold">✓</span>
                <div>
                  <p className="font-semibold text-dark">Admin Dashboard</p>
                  <p className="text-sm text-gray-600">Manage orders, payment status, and analytics</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 p-8 rounded-2xl">
          <h3 className="text-2xl font-bold text-dark mb-6 text-center">💻 Built With Modern Tech</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-2">⚛️</div>
              <p className="font-semibold text-dark">React 18</p>
              <p className="text-sm text-gray-600">UI Library</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🎨</div>
              <p className="font-semibold text-dark">Tailwind CSS</p>
              <p className="text-sm text-gray-600">Styling</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">📘</div>
              <p className="font-semibold text-dark">TypeScript</p>
              <p className="text-sm text-gray-600">Type Safety</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">📊</div>
              <p className="font-semibold text-dark">Recharts</p>
              <p className="text-sm text-gray-600">Analytics</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
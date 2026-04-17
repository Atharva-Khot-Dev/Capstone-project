import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="pt-20 pb-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4">📞 Contact Us</h2>
          <p className="text-gray-600 text-lg">Have questions? We'd love to hear from you. Reach out anytime!</p>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-dark mb-8">Get In Touch</h3>
            <div className="space-y-6">
              <div className="flex items-start bg-white border border-gray-200 p-5 rounded-xl hover:shadow-lg transition-shadow">
                <span className="text-3xl mr-4">📍</span>
                <div>
                  <p className="font-bold text-dark">Address</p>
                  <p className="text-gray-600 text-sm mt-1">ST. JOHN COLLEGE OF ENGINERRING & MANGEMENT Palghar </p>
                </div>
              </div>
              <div className="flex items-start bg-white border border-gray-200 p-5 rounded-xl hover:shadow-lg transition-shadow">
                <span className="text-3xl mr-4">📞</span>
                <div>
                  <p className="font-bold text-dark">Phone</p>
                  <p className="text-gray-600 text-sm mt-1">+91 9322547125</p>
                  <p className="text-xs text-gray-500 mt-2">Available 24/7 for orders</p>
                </div>
              </div>
              <div className="flex items-start bg-white border border-gray-200 p-5 rounded-xl hover:shadow-lg transition-shadow">
                <span className="text-3xl mr-4">✉️</span>
                <div>
                  <p className="font-bold text-dark">Email</p>
                  <p className="text-gray-600 text-sm mt-1">support@codeandcoffee.com</p>
                  <p className="text-xs text-gray-500 mt-2">We'll respond within 2 hours</p>
                </div>
              </div>
            </div>
            <div className="mt-10 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 p-6 rounded-xl">
              <h4 className="text-lg font-bold text-dark mb-4">⏰ Operating Hours</h4>
              <div className="space-y-2 text-gray-700">
                <p className="flex justify-between"><span>Monday - Thursday:</span> <span className="font-semibold">11:00 AM - 10:00 PM</span></p>
                <p className="flex justify-between"><span>Friday - Saturday:</span> <span className="font-semibold">11:00 AM - 11:00 PM</span></p>
                <p className="flex justify-between"><span>Sunday:</span> <span className="font-semibold">12:00 PM - 9:00 PM</span></p>
              </div>
            </div>
          </div>
          <div className="bg-white border border-gray-200 p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold text-dark mb-6">✍️ Send us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-dark mb-2">Your Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-dark mb-2">Your Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-dark mb-2">Your Message</label>
                <textarea
                  name="message"
                  placeholder="Tell us how we can help... (feedback, suggestions, orders, etc.)"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-lg font-bold hover:shadow-lg transition-all transform hover:-translate-y-1"
              >
                ✉️ Send Message
              </button>
            </form>
            <p className="text-xs text-gray-600 text-center mt-4">We typically respond within 2-4 business hours</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
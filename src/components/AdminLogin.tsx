import React, { useState } from 'react';

export interface AdminLoginProps {
  setIsAdmin: (isAdmin: boolean) => void;
  setActiveSection: (section: string) => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ setIsAdmin, setActiveSection }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Simple authentication - in real app, use proper authentication
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      setIsAdmin(true);
      setActiveSection('admin');
      setError('');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <section className="pt-20 pb-16 bg-gray-50 min-h-screen">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-dark mb-6">Admin Login</h2>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Login
            </button>
          </form>


        </div>
      </div>
    </section>
  );
};

export default AdminLogin;
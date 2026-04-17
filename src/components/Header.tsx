import React from 'react';

export interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  cartCount: number;
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ activeSection, setActiveSection, cartCount, isAdmin, setIsAdmin }) => {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Menu' },
    { id: 'about', label: 'About' },
    { id: 'my-orders', label: 'My Orders' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleLogout = () => {
    setIsAdmin(false);
    setActiveSection('home');
  };

  return (
    <header className="bg-gradient-to-r from-primary to-secondary shadow-xl fixed w-full top-0 z-50 border-b-4 border-accent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-white cursor-pointer flex items-center gap-2 hover:opacity-90 transition duration-300" onClick={() => setActiveSection('home')}>
              ☕ Code & Coffee
            </h1>
          </div>
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`px-3 py-2 text-sm font-semibold transition-all duration-300 relative ${
                  activeSection === item.id
                    ? 'text-accent border-b-2 border-accent'
                    : 'text-white hover:text-accent'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setActiveSection('cart')}
              className="relative p-2 text-white hover:text-accent transition-colors transform hover:scale-110 duration-200"
            >
              🛒
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-primary text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
            {isAdmin ? (
              <div className="flex items-center space-x-2 border-l border-accent pl-4">
                <button
                  onClick={() => setActiveSection('admin')}
                  className="text-sm font-semibold text-accent hover:text-white transition"
                >
                  Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  className="text-sm text-white hover:text-accent transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => setActiveSection('admin-login')}
                className="text-sm text-white hover:text-accent font-semibold transition"
              >
                Admin
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
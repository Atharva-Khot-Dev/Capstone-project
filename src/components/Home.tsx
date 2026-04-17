import React from 'react';
import pizzaImage from '../images/img1.jpg';

export interface HeroProps {
  setActiveSection: (section: string) => void;
}

const Hero: React.FC<HeroProps> = ({ setActiveSection }) => {
  return (
    <section className="pt-16 bg-gradient-to-br from-primary via-secondary to-accent text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-pattern"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Where Code
              <span className="block text-accent">Meets Caffeine</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-orange-100">
              Coffee for Your Brain,
              Code for Your Dreams.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={() => setActiveSection('menu')}
                className="bg-white text-primary px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
              >
                View Menu
              </button>
            
            </div>
          </div>
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 transform hover:scale-105 transition-transform">
              <img
                src={pizzaImage}
                alt="Delicious Pizza"
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default Hero;
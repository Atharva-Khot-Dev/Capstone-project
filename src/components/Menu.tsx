import React from 'react';
import burgerImg from '../images/burgers.png';
import pizzaImg from '../images/pizza.png';
import wrapImg from '../images/wrap.jpg';
import sandwichImg from '../images/sandwich.jpg';
import friesImg from '../images/fries.webp';
import wafflesImg from '../images/waffles.jpg';
import brownieImg from '../images/brownie.jpg';
import shakeImg from '../images/shake.webp';
import coffeeImg from '../images/coffee.avif';

export interface MenuItemType {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  quantity?: number;
}

export interface MenuProps {
  menuItems?: MenuItemType[];
  addToCart: (item: MenuItemType) => void;
}

export const defaultMenuItems: MenuItemType[] = [
  {
    id: 1,
    name: "Byte Burger",
    price: 149,
    description: "Crunchy patty loaded with veggies & debug sauce",
    category: "Main Course",
    image: burgerImg
  },
  {
    id: 2,
    name: "Data Disk Pizza",
    price: 199,
    description: "Circular bites of cheesy satisfaction",
    category: "Main Course",
    image: pizzaImg
  },
  {
    id: 3,
    name: "Code Wrap",
    price: 129,
    description: "Packed with flavor — no bugs, just bytes",
    category: "Snacks",
    image: wrapImg
  },
  {
    id: 4,
    name: "Compile Sandwich",
    price: 99,
    description: "Layers that run smoothly together",
    category: "Snacks",
    image: sandwichImg
  },
  {
    id: 5,
    name: "Stack Overflow Fries",
    price: 89,
    description: "Overflowing with crispiness",
    category: "Sides",
    image: friesImg
  },
  {
    id: 6,
    name: "Binary Waffles",
    price: 119,
    description: "Sweet bites in perfect patterns",
    category: "Dessert",
    image: wafflesImg
  },
  {
    id: 7,
    name: "Runtime Brownie",
    price: 109,
    description: "Runs best when served warm",
    category: "Dessert",
    image: brownieImg
  },
  {
    id: 8,
    name: "Java Shake",
    price: 139,
    description: "Your favourite language in liquid form",
    category: "Beverage",
    image: shakeImg
  },
  {
    id: 9,
    name: "Caffeine Coffee",
    price: 99,
    description: "A warm brew to power your next code sprint",
    category: "Beverage",
    image: coffeeImg
  }
];

const Menu: React.FC<MenuProps> = ({ menuItems, addToCart }) => {
  const items = menuItems && menuItems.length ? menuItems : defaultMenuItems;
  return (
    <section className="pt-20 pb-16 bg-gradient-to-b from-gray-100 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-mono text-primary mb-4 tracking-tight">
            Code & Coffee — Menu
          </h2>
          <p className="text-gray-600 text-lg">
            Fuel your coding sessions with handcrafted bites and warm brews
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <div
              key={item.id}
              className="relative h-72 rounded-2xl overflow-hidden shadow-lg group transform hover:-translate-y-2 transition duration-300"
              style={{
                backgroundImage: `url(${item.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center"
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30 backdrop-blur-sm p-5 flex flex-col justify-end">

                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-mono font-bold text-white">
                    {item.name}
                  </h3>

                  <span className="text-white bg-primary px-3 py-1 rounded-full text-sm font-mono">
                    ₹{item.price}
                  </span>
                </div>

                <p className="text-gray-200 text-sm mb-2">
                  {item.description}
                </p>

                <p className="text-xs text-accent mb-3 bg-black/30 inline-block px-2 py-1 rounded font-mono">
                  {item.category}
                </p>

                <button
                  onClick={() => addToCart(item)}
                  className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-4 py-2 rounded-lg text-sm hover:scale-105 transition"
                >
                  Add to Cart
                </button>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Menu;
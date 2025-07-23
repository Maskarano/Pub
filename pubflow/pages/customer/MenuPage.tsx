
import React, { useState, useMemo } from 'react';
import MenuItemCard from '../../components/customer/MenuItemCard';
import CustomerHeader from '../../components/customer/CustomerHeader';
import { MOCK_MENU_ITEMS } from '../../constants';

const MenuPage: React.FC = () => {
  const [menuItems] = useState(MOCK_MENU_ITEMS); // In a real app, this would be a fetch call
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = useMemo(() => ['All', ...new Set(menuItems.map(item => item.category))], [menuItems]);

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'All') {
      return menuItems;
    }
    return menuItems.filter(item => item.category === selectedCategory);
  }, [menuItems, selectedCategory]);
  
  return (
    <div className="min-h-screen bg-gray-900">
      <CustomerHeader />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">Our Menu</h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Explore our delicious food and refreshing drinks. Order right from your table!
            </p>
        </div>

        <div className="mb-8 flex justify-center space-x-2 sm:space-x-4">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 text-sm sm:text-base font-medium rounded-full transition-colors ${
                selectedCategory === category
                  ? 'bg-amber-500 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredItems.map(item => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default MenuPage;

import React, { useState } from 'react';
import { CATEGORIES, MENU_ITEMS } from '../constants';
import { FoodCategory, FoodItem } from '../types';

interface MenuProps {
  onSelectItem: (item: FoodItem) => void;
}

const Menu: React.FC<MenuProps> = ({ onSelectItem }) => {
  const [activeCategory, setActiveCategory] = useState<FoodCategory | 'All'>('All');

  const filteredItems = MENU_ITEMS.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    return matchesCategory;
  });

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <header className="bg-white px-6 pt-6 pb-4 shadow-sm z-10 sticky top-0">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">AR Cafe</h1>
            <p className="text-sm text-gray-500">See it before you eat it</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 font-bold">
            A
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-6 px-6">
          <button
            onClick={() => setActiveCategory('All')}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === 'All' 
                ? 'bg-amber-500 text-white shadow-md shadow-amber-500/25' 
                : 'bg-white text-gray-600 border border-gray-100'
            }`}
          >
            All Items
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat 
                  ? 'bg-amber-500 text-white shadow-md shadow-amber-500/25' 
                  : 'bg-white text-gray-600 border border-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map(item => (
          <div 
            key={item.id}
            onClick={() => onSelectItem(item)}
            className="bg-white rounded-2xl p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex gap-4 h-32"
          >
            <div className="w-28 h-full rounded-xl overflow-hidden shrink-0 bg-gray-100 relative">
               <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
               <div className="absolute top-1 left-1 bg-black/50 backdrop-blur-sm text-white text-[10px] px-1.5 py-0.5 rounded">
                  3D
               </div>
            </div>
            <div className="flex flex-col justify-between py-1 flex-1">
              <div>
                <h3 className="font-bold text-gray-900 line-clamp-2 leading-tight mb-1">{item.name}</h3>
                <p className="text-xs text-gray-500 line-clamp-2">{item.description}</p>
              </div>
              <div className="flex justify-between items-end">
                <span className="font-semibold text-amber-600">${item.price.toFixed(2)}</span>
                <button className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center hover:bg-amber-100 transition-colors">
                  <span className="text-lg leading-none mb-0.5">+</span>
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredItems.length === 0 && (
          <div className="col-span-full text-center py-10 text-gray-400">
            <p>No items found. Try a different category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;

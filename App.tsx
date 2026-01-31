import React, { useState } from 'react';
import Menu from './components/Menu';
import FoodDetail from './components/FoodDetail';
import { FoodItem } from './types';

function App() {
  const [selectedItem, setSelectedItem] = useState<FoodItem | null>(null);

  // In a real router, this would be handled by URL parameters, 
  // but for a single-view focus SPA, state navigation works well.
  
  return (
    <div className="w-full h-screen max-w-md mx-auto bg-white shadow-2xl overflow-hidden relative border-x border-gray-100">
      {/* 
        We use a slide transition effect simulation by conditionally rendering.
        In a production app, use Framer Motion or React Transition Group.
      */}
      {selectedItem ? (
        <FoodDetail 
          item={selectedItem} 
          onBack={() => setSelectedItem(null)} 
        />
      ) : (
        <Menu 
          onSelectItem={setSelectedItem} 
        />
      )}
    </div>
  );
}

export default App;

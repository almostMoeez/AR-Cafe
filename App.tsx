import React, { useState } from 'react';
import Menu from './components/Menu';
import ARViewer from './components/ARViewer';
import { FoodItem } from './types';

function App() {
  const [selectedItem, setSelectedItem] = useState<FoodItem | null>(null);

  return (
    <div className="w-full h-screen max-w-md mx-auto bg-white shadow-2xl overflow-hidden relative border-x border-gray-100">
      {selectedItem ? (
        <ARViewer 
          item={selectedItem} 
          onClose={() => setSelectedItem(null)} 
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

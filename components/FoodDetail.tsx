import React, { useState, useEffect } from 'react';
import { ArrowLeft, Box, ChefHat, Info, Send, Wine } from 'lucide-react';
import { FoodItem, Message } from '../types';
import { askChefAboutFood, getFoodPairing } from '../services/geminiService';
import ARViewer from './ARViewer';

interface FoodDetailProps {
  item: FoodItem;
  onBack: () => void;
}

const FoodDetail: React.FC<FoodDetailProps> = ({ item, onBack }) => {
  const [showAR, setShowAR] = useState(false);
  const [pairing, setPairing] = useState<string | null>(null);
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Initial AI insights
    const fetchPairing = async () => {
      const result = await getFoodPairing(item);
      setPairing(result);
    };
    fetchPairing();
  }, [item]);

  const handleAskChef = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg: Message = { role: 'user', text: chatInput };
    setChatHistory(prev => [...prev, userMsg]);
    setChatInput('');
    setIsTyping(true);

    const answer = await askChefAboutFood(item, userMsg.text);
    
    setChatHistory(prev => [...prev, { role: 'model', text: answer }]);
    setIsTyping(false);
  };

  if (showAR) {
    return <ARViewer item={item} onClose={() => setShowAR(false)} />;
  }

  return (
    <div className="flex flex-col h-full bg-white pb-6">
      {/* Hero Image */}
      <div className="relative h-72 w-full shrink-0">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover"
        />
        <button 
          onClick={onBack}
          className="absolute top-4 left-4 p-2 bg-black/40 backdrop-blur-md rounded-full text-white hover:bg-black/60 transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        
        {/* Floating AR CTA */}
        <button 
          onClick={() => setShowAR(true)}
          className="absolute -bottom-6 right-6 bg-amber-500 text-white p-4 rounded-full shadow-lg hover:bg-amber-600 transition-transform active:scale-95 flex items-center gap-2 z-10"
        >
          <Box size={24} />
          <span className="font-bold">View in AR</span>
        </button>
      </div>

      {/* Content */}
      <div className="px-6 pt-10 pb-20 overflow-y-auto">
        <div className="flex justify-between items-start mb-2">
          <h1 className="text-2xl font-bold text-gray-900 leading-tight">{item.name}</h1>
          <span className="text-xl font-semibold text-amber-600">${item.price.toFixed(2)}</span>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
          <span className="flex items-center gap-1">
             <Info size={14} /> {item.calories} kcal
          </span>
          <span className="px-2 py-0.5 bg-gray-100 rounded-full text-xs font-medium uppercase tracking-wider">
            {item.category}
          </span>
        </div>

        <p className="text-gray-600 leading-relaxed mb-8">
          {item.description}
        </p>

        {/* AI Features */}
        <div className="space-y-6">
          {/* Sommelier / Pairing */}
          <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl">
            <div className="flex items-center gap-2 text-amber-800 font-semibold mb-2">
              <Wine size={18} />
              <h3>Sommelier's Pick</h3>
            </div>
            <p className="text-amber-900 text-sm italic">
              {pairing || "Asking the sommelier..."}
            </p>
          </div>

          {/* Ask the Chef */}
          <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
             <div className="bg-gray-50 p-3 border-b border-gray-100 flex items-center gap-2">
                <ChefHat size={18} className="text-gray-700" />
                <h3 className="font-semibold text-gray-800 text-sm">Ask the Chef</h3>
             </div>
             
             <div className="p-4 bg-white">
                <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                  {chatHistory.length === 0 && (
                    <p className="text-xs text-gray-400 text-center py-2">
                      Wondering about allergies, ingredients, or taste? Ask away!
                    </p>
                  )}
                  {chatHistory.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] p-2 rounded-lg text-sm ${
                        msg.role === 'user' 
                          ? 'bg-amber-100 text-amber-900 rounded-tr-none' 
                          : 'bg-gray-100 text-gray-800 rounded-tl-none'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                       <div className="bg-gray-100 p-2 rounded-lg rounded-tl-none flex gap-1 items-center">
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></span>
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></span>
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></span>
                       </div>
                    </div>
                  )}
                </div>

                <form onSubmit={handleAskChef} className="relative">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Is this spicy?"
                    className="w-full bg-gray-50 border border-gray-200 rounded-full pl-4 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                  />
                  <button 
                    type="submit"
                    disabled={!chatInput.trim() || isTyping}
                    className="absolute right-1 top-1 p-1.5 bg-amber-500 text-white rounded-full hover:bg-amber-600 disabled:bg-gray-300 transition-colors"
                  >
                    <Send size={14} />
                  </button>
                </form>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetail;

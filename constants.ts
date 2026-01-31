import { FoodCategory, FoodItem } from './types';

// Using publicly available 3D models
const POTATO_MODEL_URL = 'https://raw.githubusercontent.com/almostMoeez/AR-Cafe/refs/heads/main/public/Alo/model.glb';
const OLIVE_OIL_MODEL_URL = 'https://raw.githubusercontent.com/almostMoeez/AR-Cafe/refs/heads/main/public/Olive/model.glb';
const BIRYANI_MODEL_URL = 'https://raw.githubusercontent.com/almostMoeez/AR-Cafe/refs/heads/main/public/Biryani/model.glb';

export const MENU_ITEMS: FoodItem[] = [
  {
    id: '1',
    name: 'Roasted Potato',
    description: 'Golden crispy roasted potato seasoned with herbs and spices, served hot and fresh.',
    price: 5.99,
    calories: 220,
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82ber53?auto=format&fit=crop&w=800&q=80',
    modelUrl: POTATO_MODEL_URL,
    category: FoodCategory.SIDES,
    arScale: "0.3 0.3 0.3"
  },
  {
    id: '2',
    name: 'Premium Olive Oil',
    description: 'Extra virgin olive oil imported from Mediterranean groves. Perfect for dipping and cooking.',
    price: 12.99,
    calories: 120,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80',
    modelUrl: OLIVE_OIL_MODEL_URL,
    category: FoodCategory.SIDES,
    arScale: "0.3 0.3 0.3"
  },
  {
    id: '3',
    name: 'Chicken Biryani',
    description: 'Aromatic basmati rice layered with tender chicken, saffron, and traditional spices.',
    price: 16.99,
    calories: 650,
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    modelUrl: BIRYANI_MODEL_URL,
    category: FoodCategory.MAINS,
    arScale: "0.3 0.3 0.3"
  }
];

export const CATEGORIES = Object.values(FoodCategory);
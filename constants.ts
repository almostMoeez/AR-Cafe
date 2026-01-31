import { FoodCategory, FoodItem } from './types';

// Local models for 3D preview, CDN models for AR (external AR apps can't access localhost)
const BURGER_MODEL_URL = '/burger.glb';
// Using Google's model-viewer demo assets (confirmed working for AR)
const BURGER_AR_URL = 'https://modelviewer.dev/shared-assets/models/Astronaut.glb';
const BURGER_USDZ_URL = 'https://modelviewer.dev/shared-assets/models/Astronaut.usdz';

const AVOCADO_MODEL_URL = 'https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Models@master/2.0/Avocado/glTF-Binary/Avocado.glb';
const AVOCADO_USDZ_URL = 'https://cdn.jsdelivr.net/gh/google/model-viewer@master/packages/shared-assets/models/Avocado.usdz';

// For Semla: local GLTF for 3D preview. AR requires publicly hosted GLB.
// To enable AR for Semla, host the model on a CDN or convert to GLB and upload.
const SEMLA_MODEL_URL = 'https://raw.githubusercontent.com/almostMoeez/AR-Cafe/refs/heads/main/public/scene.gltf';

export const MENU_ITEMS: FoodItem[] = [
  {
    id: '1',
    name: 'Classic Angus Burger',
    description: 'A juicy 1/2 lb Angus beef patty topped with fresh lettuce, tomato, cheese, and our secret sauce on a brioche bun.',
    price: 14.99,
    calories: 850,
    image: 'https://picsum.photos/id/163/800/600',
    modelUrl: BURGER_MODEL_URL,
    arModelUrl: BURGER_AR_URL,
    iosModelUrl: BURGER_USDZ_URL,
    category: FoodCategory.POPULAR,
    arScale: "auto"
  },
  {
    id: '2',
    name: 'California Avocado Toast',
    description: 'Artisanal sourdough bread topped with smashed ripe avocado, chili flakes, radish, and a poached egg.',
    price: 12.50,
    calories: 420,
    image: 'https://picsum.photos/id/1084/800/600', 
    modelUrl: AVOCADO_MODEL_URL,
    iosModelUrl: AVOCADO_USDZ_URL,
    category: FoodCategory.SIDES,
    arScale: "auto"
  },
  {
    id: '3',
    name: 'Junior Cheeseburger',
    description: 'Perfectly sized for smaller appetites, featuring our signature beef patty and cheddar.',
    price: 9.99,
    calories: 450,
    // Using a reliable unsplash source for variety
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    modelUrl: BURGER_MODEL_URL,
    arModelUrl: BURGER_AR_URL,
    iosModelUrl: BURGER_USDZ_URL,
    category: FoodCategory.MAINS,
    arScale: "auto"
  },
  {
    id: '4',
    name: 'Spicy Jalapeño Burger',
    description: 'Spice up your life with double patties, pepper jack cheese, and chipotle mayo.',
    price: 16.99,
    calories: 920,
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=800&q=80',
    modelUrl: BURGER_MODEL_URL,
    arModelUrl: BURGER_AR_URL,
    iosModelUrl: BURGER_USDZ_URL,
    category: FoodCategory.POPULAR,
    arScale: "auto"
  },
  {
    id: '5',
    name: 'Swedish Semla',
    description: 'A traditional Swedish cream-filled pastry with almond paste and whipped cream in a cardamom-spiced bun.',
    price: 7.99,
    calories: 380,
    image: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=800&q=80',
    modelUrl: SEMLA_MODEL_URL,
    category: FoodCategory.DESSERTS,
    arScale: "auto"
  }
];

export const CATEGORIES = Object.values(FoodCategory);
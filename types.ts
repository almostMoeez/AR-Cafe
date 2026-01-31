export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  calories: number;
  image: string; // 2D placeholder image
  modelUrl: string; // 3D GLB model URL for preview
  arModelUrl?: string; // Optional separate URL for AR (must be publicly accessible)
  iosModelUrl?: string; // USDZ for iOS AR Quick Look
  category: FoodCategory;
  arScale?: string; // Optional scale fix for AR
}

export enum FoodCategory {
  POPULAR = 'Popular',
  MAINS = 'Mains',
  SIDES = 'Sides',
  DESSERTS = 'Desserts',
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export type MaterialNames = 'ancient' | 'rare' | 'oreha';

export type Material = {
  name: MaterialNames;
  korName: string;
  minPrice: number;
  maxPrice: number;
  quantity: number;
};

export type CreateItem = 'basic' | 'superior';

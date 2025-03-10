import {
  Category,
  CategoryPrices,
  GlassVariant,
} from '@/features/Products/types';

export interface GlassPrice {
  id?: string;
  userId: string;
  glassType: GlassVariant;
  price: number;
  constant: number;
  sellerMargin: number;
  millimeter: number;
  category: Category;
}

export interface CreateGlassPrice {
  glassType: GlassVariant;
  price: number;
  constant?: number | null;
  sellerMargin: number;
  millimeter: number;
  category: CategoryPrices;
}

export interface UpdateGlassPrice {
  id: string;
  userId: string;
  glassType: GlassVariant;
  price: number;
  constant?: number | null;
  sellerMargin: number;
  millimeter: number;
  category: CategoryPrices;
}

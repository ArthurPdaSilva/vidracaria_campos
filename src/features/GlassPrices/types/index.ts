import { Category, GlassVariant } from '@/features/Products/types';

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

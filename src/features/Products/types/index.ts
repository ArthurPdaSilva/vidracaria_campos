export type Category = 'COMUM' | 'TEMPERADO' | 'DIVERSOS';
export type CategoryPrices = 'COMUM' | 'TEMPERADO';
export type UnitOfMeasure = 'CENTIMETRO' | 'METRO' | 'MILIMETRO' | 'UNIDADE';

export interface ProductBase {
  name: string;
  unitOfMeasure: UnitOfMeasure;
  category: Category;
  glassType?: GlassVariant;
}

export type GlassVariant =
  | 'CANELADO'
  | 'INCOLOR'
  | 'FUME'
  | 'ESPELHO'
  | 'VERDE'
  | 'BOX_INCOLOR'
  | 'BOX_FUME'
  | 'BOX_VERDE';

export const GlassVariants = [
  'CANELADO',
  'INCOLOR',
  'FUME',
  'ESPELHO',
  'VERDE',
  'BOX_INCOLOR',
  'BOX_FUME',
  'BOX_VERDE',
];

export interface ProductEditAndList extends ProductBase {
  id: string;
  depth?: number;
  height?: number;
  width?: number;
  price?: number;
}

export interface EditProductValidation extends ProductEditAndList {}

export interface ProductValidation extends ProductEditAndList {
  actualQuantity: number;
  glassType: GlassVariant;
  idProduct?: string;
}

export interface CreateProductValidation extends ProductBase {}

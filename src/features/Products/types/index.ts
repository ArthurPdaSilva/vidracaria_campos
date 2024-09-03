export type Category = 'COMUM' | 'TEMPERADO' | 'DIVERSOS';
export type UnitOfMeasure = 'CENTIMETRO' | 'METRO' | 'MILIMETRO' | 'UNIDADE';

export interface ProductBase {
  name: string;
  unitOfMeasure: UnitOfMeasure;
  category: Category;
  type?: GlassVariant;
}

export type GlassVariant = 'CANELADO' | 'INCOLOR' | 'FUME' | 'ESPELHO';

export const GlassVariants = ['Canelado', 'Incolor', 'Fume', 'Espelho'];

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
  type: GlassVariant;
  idProduct?: string;
}

export interface CreateProductValidation extends ProductBase {}

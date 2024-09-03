import { ProductInfo } from '../types';

export const checkProduct = (product: ProductInfo, errors: string[]) => {
  if (product.category === 'DIVERSOS') return;

  if (product.height === undefined || product.height <= 0)
    errors.push('A altura do produto deve ser maior que 0');

  if (product.width === undefined || product.width <= 0)
    errors.push('A largura do produto deve ser maior que 0');

  if (product.depth === undefined || product.depth <= 0)
    errors.push('A espessura do produto deve ser maior que 0');
};

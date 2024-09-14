import { v4 as uuidv4 } from 'uuid';
import { BudgetItem, ProductInfo } from '../types';

export const useBudgetItem() {
  const price2mmComum = 200;
  const price3mmComum = 300;
  const price4mmComum = 400;
  const price5mmComum = 500;
  const price6mmComum = 600;
  const price2mmComumEspelho = 200;
  const price3mmComumEspelho = 300;
  const price4mmComumEspelho = 400;
  const price5mmComumEspelho = 500;
  const price6mmComumEspelho = 600;
  const price6mmTemperado = 144;
  const price8mmTemperado = 250;
  const price10mmTemperado = 300;
  const price12mmTemperado = 500;
  const constant1 = 3.52;
  const constant2 = 3.84;
  const margemVendedorComum = 2.1;
  const margemVendedorTemperado = 1.95;

  const budgetItemsToEditTable = (bdItems: BudgetItem[]): ProductInfo[] =>
    bdItems.map((item) => ({
      id: item.id || '',
      idProduct: item.idProduct,
      actualQuantity: item.quantity,
      name: item.name,
      category: item.category,
      depth: item.depth,
      height: item.height,
      price: item.unitPrice,
      type: item.type,
      width: item.width,
      rowId: uuidv4(),
    }));

  const calculateTotal = (item: ProductInfo): number => {
    if (item.category === 'DIVERSOS') {
      return Number(item.price);
    } else {
      const itemWithPrices = pricesVidracaria(item);
      return Number(itemWithPrices.price);
    }
  };

  const pricesVidracaria = (item: ProductInfo) => {
    const area = Number(item.height) * Number(item.width);
    let finalValue = 0;
    if (item.category === 'COMUM' && item.type !== 'ESPELHO') {
      const priceToUse = getPriceToUseComum(item);
      const initialValue = priceToUse * (area / constant1);
      finalValue = initialValue * margemVendedorComum;
    } else if (item.category === 'COMUM' && item.type === 'ESPELHO') {
      const priceToUse = getPriceToUseEspelho(item);
      const initialValue = priceToUse * (area / constant2);
      finalValue = initialValue * margemVendedorComum;
    } else if (item.category === 'TEMPERADO') {
      const priceToUse = getPriceToUseTemperado(item);
      finalValue = area * priceToUse * margemVendedorTemperado;
    }
    return {
      ...item,
      price: finalValue,
    };
  };

  const getPriceToUseTemperado = (item: ProductInfo) => {
    switch (item.depth) {
      case 6:
        return price6mmTemperado;
      case 8:
        return price8mmTemperado;
      case 10:
        return price10mmTemperado;
      case 12:
        return price12mmTemperado;
      default:
        return 0;
    }
  };

  const getPriceToUseEspelho = (item: ProductInfo) => {
    switch (item.depth) {
      case 2:
        return price2mmComumEspelho;
      case 3:
        return price3mmComumEspelho;
      case 4:
        return price4mmComumEspelho;
      case 5:
        return price5mmComumEspelho;
      case 6:
        return price6mmComumEspelho;
      default:
        return 0;
    }
  };

  const getPriceToUseComum = (item: ProductInfo) => {
    switch (item.depth) {
      case 2:
        return price2mmComum;
      case 3:
        return price3mmComum;
      case 4:
        return price4mmComum;
      case 5:
        return price5mmComum;
      case 6:
        return price6mmComum;
      default:
        return 0;
    }
  };

  return {
    calculateTotal,
    budgetItemsToEditTable,
  };
}

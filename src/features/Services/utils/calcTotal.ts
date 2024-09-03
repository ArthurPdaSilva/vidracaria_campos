import { ProductInfo } from '../types';

interface calcTotalProps {
  products: ProductInfo[];
  discount: number;
}

export const calcTotal = ({ products, discount }: calcTotalProps) => {
  console.log(discount);
  const total =
    products.reduce((acc, prod) => {
      if (prod.price) {
        return acc + Number(prod?.price) * prod.actualQuantity;
      }
      return 0;
    }, 0) - discount;

  return total;
};

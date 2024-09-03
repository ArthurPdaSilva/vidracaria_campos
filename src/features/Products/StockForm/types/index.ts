export enum TransactionType {
  ENTRADA = 'ENTRADA',
  SAIDA = 'SAIDA',
  BAIXAESTOQUE = 'BAIXAESTOQUE',
}

export interface TransactionStock {
  idProduct: string;
  transactionType: string;
  movementQuantity: number;
}

export interface ProductWithNameAndId {
  id: string;
  name: string;
}

export interface ReceiveProduct {
  idProduct: string;
  movementQuantity: number;
}

import { AddressValidation } from '../../Customers/types';
import { Category, GlassVariant } from '../../Products/types';

export type Status =
  | 'ORCADO'
  | 'CONTRATADO_A_VISTA'
  | 'CONTRATADO_A_PRAZO'
  | 'FINALIZADO';

export type PaymentMethod = 'DINHEIRO' | 'CREDITO' | 'DEBITO' | 'PIX';

export interface ServiceValidation {
  status: Status;
  products: ProductInfo[];
  discount?: number;
  images?: string[];
  files?: File[];
  total?: number;
  observation?: string;
}

export interface ServiceValidationTable {
  ownerName?: string;
  total?: number;
  status: Status;
  id?: string;
  deliveryForecast?: string;
}

export interface CreateServiceValidation extends ServiceValidation {
  client: string;
}

export interface EditServiceValidation extends ServiceValidation {
  deliveryForecast?: string | null;
  ownerName: string;
  downPayment?: number;
  paymentMethod: PaymentMethod;
  id: string;
  address?: AddressValidation;
}

export interface ProductInfo {
  name: string;
  depth?: number;
  height?: number;
  price?: number;
  width?: number;
  id: string;
  idProduct?: string;
  actualQuantity: number;
  category?: Category;
  type?: GlassVariant;
  rowId?: string;
}

export interface BudgetItem {
  quantity: number;
  category: Category;
  height: number;
  width: number;
  depth: number;
  name: string;
  total: number;
  type?: GlassVariant;
  id?: string;
  idProduct?: string;
  unitPrice?: number;
}

export interface Image {
  id: string;
  url: string;
}

export interface GetProductsByService {
  idBudget: string;
  items: BudgetItem[];
}

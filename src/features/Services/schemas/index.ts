import * as Yup from 'yup';
import { PaymentMethod, Status } from '../types';

export const EditServiceSchema = Yup.object().shape({
  id: Yup.string().required(),
  deliveryForecast: Yup.string().nullable(),
  status: Yup.mixed<Status>().required('Campo obrigatório'),
  ownerName: Yup.string().required('Campo obrigatório'),
  discount: Yup.number().optional().min(0, 'O desconto deve ser no mínimo 0'),
  downPayment: Yup.number().optional(),
  paymentMethod: Yup.mixed<PaymentMethod>().optional(),
  products: Yup.array()
    .required('Campo obrigatório')
    .of(
      Yup.object().shape({
        id: Yup.string().required('O ID do produto é obrigatório'),
        name: Yup.string().required('O nome do produto é obrigatório'),
        depth: Yup.number().min(0, 'A profundidade deve ser no mínimo 1'),
        height: Yup.number().min(0, 'A altura deve ser no mínimo 1'),
        price: Yup.number().min(0, 'O preço deve ser no mínimo 0'),
        width: Yup.number().min(0, 'A largura deve ser no mínimo 1'),
        actualQuantity: Yup.number()
          .required('Campo obrigatório')
          .integer('A quantidade atual deve ser um número inteiro')
          .min(1, 'A quantidade atual deve ser no mínimo 1'),
      }),
    ),
});

export const CreateServiceSchema = Yup.object().shape({
  total: Yup.number(),
  discount: Yup.number().optional().min(0, 'O desconto deve ser no mínimo 0'),
  status: Yup.mixed<Status>().required('Campo obrigatório'),
  client: Yup.string().required('Campo obrigatório'),
  products: Yup.array()
    .required('Campo obrigatório')
    .of(
      Yup.object().shape({
        id: Yup.string().required('O ID do produto é obrigatório'),
        name: Yup.string().required('O nome do produto é obrigatório'),
        depth: Yup.number().min(0, 'A profundidade deve ser no mínimo 1'),
        height: Yup.number().min(0, 'A altura deve ser no mínimo 1'),
        price: Yup.number().min(0, 'O preço deve ser no mínimo 0'),
        width: Yup.number().min(0, 'A largura deve ser no mínimo 1'),
        actualQuantity: Yup.number()
          .required('Campo obrigatório')
          .integer('A quantidade atual deve ser um número inteiro')
          .min(1, 'A quantidade atual deve ser no mínimo 1'),
      }),
    ),
});

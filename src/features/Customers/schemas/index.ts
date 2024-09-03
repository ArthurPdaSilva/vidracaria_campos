import * as Yup from 'yup';
import { CustomerValidation } from '../types';

export const ClientSchema = Yup.object<CustomerValidation>().shape({
  id: Yup.string(),
  cpf_cnpj: Yup.string(),
  customerType: Yup.string().required('O campo pessoa é obrigatório'),
  email: Yup.string().email('Digite o email no formato correto'),
  name: Yup.string().required('O nome é obrigatório'),
  phone: Yup.string(),
  address: Yup.object().shape({
    address: Yup.string().required('a rua é obrigatório'),
    zipCode: Yup.string().required('O cep é obrigatório'),
    number: Yup.string().required('O numero é obrigatório'),
    city: Yup.string().required('a cidade é obrigatório'),
    state: Yup.string().required('O estado é obrigatório'),
    landmark: Yup.string(),
  }),
});

import * as Yup from 'yup';
import { UserValidation } from '../types';

export const LoginSchema = Yup.object<UserValidation>().shape({
  email: Yup.string().required('O email é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
  name: Yup.string().optional(),
  rule: Yup.string().optional(),
});

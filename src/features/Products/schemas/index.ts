import * as Yup from 'yup';
import { Category, UnitOfMeasure } from '../types';

export const EditProductSchema = Yup.object().shape({
  id: Yup.string().required('Campo obrigatório'),
  name: Yup.string().required('Campo obrigatório'),
  unitOfMeasure: Yup.mixed<UnitOfMeasure>()
    .oneOf(['CENTIMETRO', 'METRO', 'MILIMETRO', 'UNIDADE'])
    .required('Campo obrigatório'),
  category: Yup.mixed<Category>()
    .oneOf(['COMUM', 'TEMPERADO', 'DIVERSOS'])
    .required('Campo obrigatório'),
  price: Yup.number(),
  glassType: Yup.string()
    .oneOf([
      'CANELADO',
      'INCOLOR',
      'FUME',
      'ESPELHO',
      'VERDE',
      'BOX_INCOLOR',
      'BOX_FUME',
      'BOX_VERDE',
    ])
    .test('is-required-if-common', 'Campo obrigatório', function (value) {
      const { category } = this.parent;
      return category !== 'COMUM' || (category === 'COMUM' && !!value);
    }),
});

export const CreateProductSchema = Yup.object({
  name: Yup.string().required('Campo obrigatório'),
  unitOfMeasure: Yup.string()
    .oneOf(['CENTIMETRO', 'METRO', 'MILIMETRO', 'UNIDADE'])
    .required('Campo obrigatório'),
  category: Yup.string()
    .oneOf(['COMUM', 'TEMPERADO', 'DIVERSOS'])
    .required('Campo obrigatório'),
  glassType: Yup.string()
    .oneOf([
      'CANELADO',
      'INCOLOR',
      'FUME',
      'ESPELHO',
      'VERDE',
      'BOX_INCOLOR',
      'BOX_FUME',
      'BOX_VERDE',
    ])
    .test('is-required-if-common', 'Campo obrigatório', function (value) {
      const { category } = this.parent;
      return category !== 'COMUM' || (category === 'COMUM' && !!value);
    }),
});

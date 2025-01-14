import * as Yup from 'yup';

export const GlassPriceSchema = Yup.object().shape({
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
    .required('Campo obrigatório'),
  price: Yup.number().required('Campo obrigatório'),
  sellerMargin: Yup.number().required('Campo obrigatório'),
  millimeter: Yup.number().required('Campo obrigatório'),
  category: Yup.string()
    .oneOf(['COMUM', 'TEMPERADO'])
    .required('Campo obrigatório'),
  constant: Yup.number()
    .transform((value, originalValue) => {
      return originalValue === '' ? undefined : value;
    })
    .nullable()
    .when(['category'], ([category], schema) => {
      return category === 'TEMPERADO'
        ? schema.nullable()
        : schema.required('Campo obrigatório');
    }),
});

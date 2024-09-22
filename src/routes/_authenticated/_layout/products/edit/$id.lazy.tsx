import { PageHeader } from '@/components/PageHeader';
import { EditProductSchema } from '@/features/Products/schemas';
import {
  useGetProductById,
  useUpdateProduct,
} from '@/features/Products/services';
import {
  EditProductValidation,
  GlassVariants,
} from '@/features/Products/types';
import { boxStyles, buttonStyles, formStyles, textFieldStyles } from '@/styles';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

const ProducstUpdateForm = () => {
  const { id } = Route.useParams();
  const product = useGetProductById(id);
  const updateProduct = useUpdateProduct();

  const onSubmit: SubmitHandler<EditProductValidation> = async (data) => {
    updateProduct.mutate(data);
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm<EditProductValidation>({
    resolver: yupResolver(EditProductSchema),
    defaultValues: {
      id: '',
      name: '',
      category: 'COMUM',
      unitOfMeasure: 'CENTIMETRO',
      price: 0,
      type: 'CANELADO',
    },
  });

  useEffect(() => {
    if (watch('category') === 'DIVERSOS') {
      setValue('unitOfMeasure', 'UNIDADE');
    } else {
      setValue('unitOfMeasure', 'METRO');
    }
    if (watch('category') !== 'COMUM') {
      setValue('type', undefined);
    }
  }, [watch('category')]);

  useEffect(() => {
    if (product.data) {
      setValue('id', product.data.id || '');
      setValue('name', product.data.name || '');
      setValue('category', product.data.category || 'COMUM');
      setValue('unitOfMeasure', product.data.unitOfMeasure || 'CENTIMETRO');
      setValue('price', product.data.price || 1);
      setValue('type', product.data.type || 'CANELADO');
    }
  }, [product.data, setValue]);

  return (
    <Box sx={boxStyles}>
      <form onSubmit={handleSubmit(onSubmit)} style={formStyles}>
        <PageHeader backTo="/products" title="Editar Produto" />

        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              type="text"
              id="Nome"
              label="Nome"
              placeholder="Digite o nome"
              error={!!errors.name}
              helperText={errors.name?.message}
              sx={textFieldStyles}
              InputLabelProps={{
                shrink: !!field.value,
              }}
              {...field}
            />
          )}
        />

        <Box sx={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <FormControl sx={textFieldStyles}>
                <InputLabel htmlFor="category">Categoria</InputLabel>
                <Select
                  type="text"
                  id="category"
                  labelId="category-label"
                  label="Categoria"
                  error={!!errors.category}
                  placeholder="Digite a categoria do produto"
                  {...field}
                >
                  <MenuItem value="COMUM">Comum</MenuItem>
                  <MenuItem value="TEMPERADO">Temperado</MenuItem>
                  <MenuItem value="DIVERSOS">Diversos</MenuItem>
                </Select>
              </FormControl>
            )}
          />

          <Controller
            name="unitOfMeasure"
            control={control}
            render={({ field }) => (
              <FormControl sx={textFieldStyles}>
                <InputLabel htmlFor="unitOfMeasure">
                  Unidade de Medida
                </InputLabel>
                <Select
                  type="text"
                  id="unitOfMeasure"
                  label="Unidade de Medida"
                  error={!!errors.unitOfMeasure}
                  placeholder="Digite a unidade de medida do produto"
                  {...field}
                >
                  {watch('category') === 'DIVERSOS' && (
                    <MenuItem value="UNIDADE">Unidade</MenuItem>
                  )}
                  {watch('category') !== 'DIVERSOS' && (
                    <MenuItem value="METRO">Metro</MenuItem>
                  )}
                </Select>
              </FormControl>
            )}
          />
        </Box>
        {watch('category') === 'DIVERSOS' && (
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <TextField
                  type="number"
                  id="price"
                  label="Preço"
                  placeholder="Digite o preço do produto"
                  {...field}
                  error={!!errors.price}
                  helperText={errors.price?.message}
                  sx={textFieldStyles}
                  InputLabelProps={{
                    shrink:
                      field.value !== undefined && field.value !== 0
                        ? true
                        : false,
                  }}
                />
              )}
            />
          </Box>
        )}

        {watch('category') === 'COMUM' && (
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <FormControl sx={textFieldStyles}>
                <InputLabel htmlFor="variant">Variação</InputLabel>
                <Select
                  type="text"
                  id="variant"
                  label="Variação"
                  error={!!errors.type}
                  placeholder="Digite a variação do produto"
                  {...field}
                >
                  {GlassVariants.map((variant) => (
                    <MenuItem value={variant.toUpperCase()} key={variant}>
                      {variant}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
        )}

        <LoadingButton
          id="btn-save"
          type="submit"
          variant="contained"
          sx={buttonStyles}
          loading={updateProduct.isPending}
        >
          Salvar
        </LoadingButton>
      </form>
    </Box>
  );
};

export const Route = createLazyFileRoute(
  '/_authenticated/_layout/products/edit/$id',
)({
  component: ProducstUpdateForm,
});

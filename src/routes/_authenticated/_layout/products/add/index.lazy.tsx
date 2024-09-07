import PageHeader from '@/components/PageHeader/index.tsx';
import { CreateProductSchema } from '@/features/Products/schemas/index.ts';
import { useCreateProduct } from '@/features/Products/services/index.tsx';
import {
  CreateProductValidation,
  GlassVariants,
} from '@/features/Products/types/index.ts';
import {
  boxStyles,
  buttonStyles,
  formStyles,
  textFieldStyles,
} from '@/styles/index.ts';
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

function ProductsCreateForm() {
  const create = useCreateProduct();

  const onSubmit: SubmitHandler<CreateProductValidation> = (data) => {
    create.mutate(data);
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm<CreateProductValidation>({
    resolver: yupResolver(CreateProductSchema),
    defaultValues: {
      category: 'COMUM',
      name: '',
      unitOfMeasure: 'CENTIMETRO',
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

  return (
    <Box sx={boxStyles}>
      <form onSubmit={handleSubmit(onSubmit)} style={formStyles}>
        <PageHeader title="Cadastrar Produto" backTo="/products" />

        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              type="text"
              id="name"
              label="Nome"
              placeholder="Digite o nome"
              error={!!errors.name}
              helperText={errors.name?.message}
              sx={textFieldStyles}
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
          loading={create.isPending}
        >
          Salvar
        </LoadingButton>
      </form>
    </Box>
  );
}

export const Route = createLazyFileRoute(
  '/_authenticated/_layout/products/add/',
)({
  component: ProductsCreateForm,
});

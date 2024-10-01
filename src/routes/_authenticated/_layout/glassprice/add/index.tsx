import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/_layout/glassprice/add/')(
  {
    component: () => <PricesForm />,
  },
);

import { PageHeader } from '@/components/PageHeader';
import { SectionHeader } from '@/components/SectionHeader';
import { boxStyles, buttonStyles, formStyles, textFieldStyles } from '@/styles';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { GlassVariants } from '@/features/Products/types';
import { Controller, useForm } from 'react-hook-form';
import { CreateGlassPrice } from '@/features/GlassPrices/types';
import { GlassPriceSchema } from '@/features/GlassPrices/schemas';
import { yupResolver } from '@hookform/resolvers/yup';
import { DepthsCommon } from '@/features/Dashboard/types';
import { useCreateGlassPrice } from '@/features/GlassPrices/services';

const PricesForm = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateGlassPrice>({
    resolver: yupResolver(GlassPriceSchema),
  });

  const create = useCreateGlassPrice();

  const onSubmit = (data: CreateGlassPrice) => {
    create.mutateAsync(data);
  };

  return (
    <Box sx={boxStyles}>
      <form style={formStyles} onSubmit={handleSubmit(onSubmit)}>
        <PageHeader title="Controle de preços" backTo="/glassprice" />
        <SectionHeader label={'Informações'} />

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
              {errors.category && (
                <Typography variant="caption" color={'error'}>
                  {errors.category.message}
                </Typography>
              )}
            </FormControl>
          )}
        />

        <Controller
          name="glassType"
          control={control}
          render={({ field }) => (
            <FormControl sx={textFieldStyles}>
              <InputLabel htmlFor="variant">Variação</InputLabel>
              <Select
                type="text"
                id="variant"
                label="Variação"
                error={!!errors.glassType}
                placeholder="Digite a variação do produto"
                {...field}
              >
                {GlassVariants.map((variant) => (
                  <MenuItem value={variant.toUpperCase()} key={variant}>
                    {variant}
                  </MenuItem>
                ))}
              </Select>
              {errors.glassType && (
                <Typography variant="caption" color={'error'}>
                  {errors.glassType.message}
                </Typography>
              )}
            </FormControl>
          )}
        />

        <SectionHeader label={'Cálculos'} />
        <Controller
          name="constant"
          control={control}
          render={({ field }) => (
            <FormControl sx={textFieldStyles}>
              <TextField
                label={'Constante de cálculo'}
                type="number"
                error={Boolean(errors.constant)}
                helperText={errors.constant?.message}
                {...field}
              />
            </FormControl>
          )}
        />
        <Controller
          name="sellerMargin"
          control={control}
          render={({ field }) => (
            <FormControl sx={textFieldStyles}>
              <TextField
                label={'Margem de venda'}
                type="number"
                error={Boolean(errors.sellerMargin)}
                helperText={errors.sellerMargin?.message}
                {...field}
              />
            </FormControl>
          )}
        />

        <Controller
          name="price"
          control={control}
          render={({ field }) => (
            <FormControl sx={textFieldStyles}>
              <TextField
                label={'Valor'}
                type="number"
                error={Boolean(errors.price)}
                helperText={errors.price?.message}
                {...field}
              />
            </FormControl>
          )}
        />

        <Controller
          name="millimeter"
          control={control}
          render={({ field }) => (
            <FormControl variant="outlined" sx={{ marginBottom: 4 }}>
              <InputLabel id="select-depth-label">Espessura</InputLabel>
              <Select
                id="select-depth-label"
                labelId="select-depth-label"
                error={Boolean(errors.millimeter)}
                label={'Espessura'}
                {...field}
              >
                {DepthsCommon.map((unit) => (
                  <MenuItem value={unit} key={unit}>
                    {unit}mm
                  </MenuItem>
                ))}
              </Select>
              {errors.millimeter && (
                <Typography variant="caption" color={'error'}>
                  {errors.millimeter.message}
                </Typography>
              )}
            </FormControl>
          )}
        />
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
};
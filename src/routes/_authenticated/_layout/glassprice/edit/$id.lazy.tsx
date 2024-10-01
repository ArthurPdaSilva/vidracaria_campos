import { PageHeader } from '@/components/PageHeader';
import { SectionHeader } from '@/components/SectionHeader';
import { DepthsCommon } from '@/features/Dashboard/types';
import { GlassPriceSchema } from '@/features/GlassPrices/schemas';
import {
  useGetGlassPriceById,
  useUpdateGlassPrice,
} from '@/features/GlassPrices/services';
import { CreateGlassPrice } from '@/features/GlassPrices/types';
import { GlassVariants } from '@/features/Products/types';
import { boxStyles, formStyles, textFieldStyles, buttonStyles } from '@/styles';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  TextField,
} from '@mui/material';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';

const PricesForm = () => {
  const { id } = Route.useParams();
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<CreateGlassPrice>({
    resolver: yupResolver(GlassPriceSchema),
  });

  const create = useUpdateGlassPrice();
  const { data } = useGetGlassPriceById(id);

  useEffect(() => {
    if (data) {
      console.log('🚀 ~ useEffect ~ data:', data);
      setValue('category', data.category);
      setValue('constant', data.constant);
      setValue('glassType', data.glassType);
      setValue('millimeter', data.millimeter);
      setValue('price', data.price);
      setValue('sellerMargin', data.sellerMargin);
    }
  }, [data]);

  const onSubmit = (data: CreateGlassPrice) => {
    create.mutateAsync({ price: data, id });
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
                InputLabelProps={{
                  shrink: true,
                }}
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
                InputLabelProps={{
                  shrink: true,
                }}
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
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
          )}
        />

        <Controller
          name="millimeter"
          control={control}
          render={({ field }) => (
            <FormControl variant="outlined">
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

export const Route = createLazyFileRoute(
  '/_authenticated/_layout/glassprice/edit/$id',
)({
  component: () => <PricesForm />,
});
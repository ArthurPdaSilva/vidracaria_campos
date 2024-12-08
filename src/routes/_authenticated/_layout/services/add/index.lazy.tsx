import { AddCircleOutlineRoundedIcon } from '@/assets/images/icons';
import { PageHeader } from '@/components/PageHeader';
import { SectionHeader } from '@/components/SectionHeader';
import { useGetAllCustomers } from '@/features/Customers/services';
import { AddressValidation } from '@/features/Customers/types';
import { DepthsCommon } from '@/features/Dashboard/types';
import { useGetAllProducts } from '@/features/Products/services';
import { ImageInput } from '@/features/Services/components/ImageInput';
import { TableProductInfo } from '@/features/Services/components/TableInfoProduct';
import { CreateServiceSchema } from '@/features/Services/schemas';
import {
  useCalculateProduct,
  useCreateService,
} from '@/features/Services/services';
import {
  CreateServiceValidation,
  ProductInfo,
} from '@/features/Services/types';
import { calcTotal } from '@/features/Services/utils/calcTotal';
import { checkProduct } from '@/features/Services/utils/checkProduct';
import { formatCurrency } from '@/features/Services/utils/convertMoney';
import { boxStyles, buttonStyles, formStyles, textFieldStyles } from '@/styles';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import {
  Autocomplete,
  Box,
  Chip,
  CircularProgress,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { createLazyFileRoute } from '@tanstack/react-router';
import { enqueueSnackbar } from 'notistack';
import { SyntheticEvent, useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

const ServicesCreateForm = () => {
  const { data: customers } = useGetAllCustomers();
  const { data: products } = useGetAllProducts();
  const create = useCreateService();
  const [customerAddress, setCustomerAddress] = useState<AddressValidation>();
  const [product, setProduct] = useState<ProductInfo>();
  const [images, setImages] = useState<File[]>([]);
  const { mutateAsync: calcProdRequest, isPending: loadingCalc } =
    useCalculateProduct();

  const onSubmit: SubmitHandler<CreateServiceValidation> = (data) => {
    create.mutate({ ...data, files: images });
  };

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateServiceValidation>({
    resolver: yupResolver(CreateServiceSchema),
    defaultValues: {
      client: undefined,
      total: 0,
      products: [],
      status: 'ORCADO',
      images: [],
      discount: 0,
    },
  });

  const updateProdQtd = (prod: ProductInfo, newAmount: number): ProductInfo => {
    const amount = newAmount > 0 ? newAmount : 1;
    return {
      ...prod,
      actualQuantity: amount,
      price: prod.price,
    };
  };

  const handleAddProduct = async () => {
    let errors: string[] = [];
    if (product) {
      checkProduct(product, errors);

      if (errors.length > 0) {
        errors.forEach((error) => {
          enqueueSnackbar(error, { variant: 'error' });
        });
        return;
      }

      setValue('products', [
        ...watch('products'),
        {
          ...product,
          price:
            product.category === 'DIVERSOS'
              ? product.price
              : await calcProdRequest(product),
        },
      ]);
      setProduct(undefined);
    }
  };

  useEffect(() => {
    let discount = watch('discount');
    if (watch('products')) {
      setValue(
        'total',
        calcTotal({
          products: watch('products') || [],
          discount: discount ? discount : 0,
        }),
      );
    }
  }, [products, watch('products'), watch('discount')]);

  useEffect(() => {
    if (watch('client') && watch('client') !== '')
      setCustomerAddress(
        customers?.find((customer) => customer.id === watch('client'))?.address,
      );
  }, [watch('client')]);

  return (
    <Box sx={boxStyles}>
      <form onSubmit={handleSubmit(onSubmit)} style={formStyles}>
        <PageHeader title="Cadastrar Serviço" backTo="/services" />
        <SectionHeader label="Informações" />
        <Controller
          name="client"
          control={control}
          render={({ field }) => (
            <FormControl
              error={errors.client !== undefined}
              variant="outlined"
              sx={{ minWidth: 120 }}
            >
              {customers && (
                <Autocomplete
                  disablePortal
                  id="select-client"
                  onChange={(
                    _event: SyntheticEvent,
                    newValue: { id: string | undefined; label: string } | null,
                  ) => {
                    if (newValue && newValue.id) {
                      setValue('client', newValue.id);
                    }
                  }}
                  inputValue={field.value}
                  options={customers?.map((customer) => ({
                    id: customer.id,
                    label: customer.name,
                  }))}
                  renderInput={(params) => (
                    <TextField {...params} label="Cliente" />
                  )}
                />
              )}
              <FormHelperText>{errors.client?.message}</FormHelperText>
            </FormControl>
          )}
        />

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <FormControl sx={textFieldStyles} error={errors.client !== undefined}>
            <TextField
              type="text"
              id="address"
              label="Endereço"
              placeholder="Digite o endereço completo"
              value={`${customerAddress?.address || ''}, ${customerAddress?.number || ''}, ${customerAddress?.city || ''}, ${customerAddress?.state || ''}, ${customerAddress?.zipCode || ''} - ${customerAddress?.landmark || ''}`}
              disabled
            />
          </FormControl>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              marginBottom: '1rem',
              flex: 1,
            }}
          >
            <Controller
              name="images"
              control={control}
              render={({ field }) => (
                <ImageInput
                  images={images}
                  setImages={setImages}
                  field={field}
                />
              )}
            />
            <Box
              gap={1}
              display="flex"
              flexWrap="wrap"
              maxHeight="10vh"
              overflow="auto"
            >
              {images &&
                images.map((img, key) => (
                  <Chip
                    key={key}
                    label={img.name.slice(0, 6)}
                    onDelete={() =>
                      setImages((prev) =>
                        prev.filter((_img, index) => key !== index),
                      )
                    }
                  />
                ))}
            </Box>
          </Box>
        </Box>
        <SectionHeader label="Produtos" />

        <Box sx={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <FormControl variant="outlined" sx={{ flex: 1, minWidth: 160 }}>
            <InputLabel id="select-product-label">Produto</InputLabel>
            <Select
              labelId="select-product-label"
              id="select-product"
              label="Produto"
              onChange={(e) => {
                const prodSelected = products?.find(
                  (prod) => prod.id === e.target.value,
                );
                if (prodSelected)
                  setProduct({
                    id: e.target.value as string,
                    name: prodSelected.name,
                    actualQuantity: 1,
                    depth: prodSelected?.depth,
                    height: prodSelected?.height,
                    price: prodSelected?.price,
                    width: prodSelected?.width,
                    category: prodSelected.category,
                    glassType: prodSelected.glassType,
                    rowId: uuidv4(),
                  });
              }}
              value={product?.id || ''}
            >
              {products?.map((product) => (
                <MenuItem value={product.id} key={product.id}>
                  {product.name} {product.glassType ? product.glassType : ''} -{' '}
                  {product.category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {product?.category !== 'DIVERSOS' && (
            <>
              <FormControl variant="outlined">
                <TextField
                  id="heightTxt"
                  name="height"
                  value={
                    Number(product?.height) === 0 ? '' : Number(product?.height)
                  }
                  label="Altura (M)"
                  type="number"
                  InputLabelProps={{
                    shrink:
                      product && (!!product.height || product.height === 0),
                  }}
                  onChange={(e) => {
                    product &&
                      setProduct({
                        ...product,
                        height: e.target.value
                          ? Number(e.target.value)
                          : undefined,
                      });
                  }}
                />
              </FormControl>
              <FormControl variant="outlined">
                <TextField
                  id="widthTxt"
                  name="width"
                  value={
                    Number(product?.width) === 0 ? '' : Number(product?.width)
                  }
                  label="Largura (M)"
                  type="number"
                  InputLabelProps={{
                    shrink: product && (!!product.width || product.width === 0),
                  }}
                  onChange={(e) => {
                    product &&
                      setProduct({
                        ...product,
                        width: e.target.value
                          ? Number(e.target.value)
                          : undefined,
                      });
                  }}
                />
              </FormControl>

              <FormControl variant="outlined" sx={{ width: 130 }}>
                <InputLabel id="select-depth-label">Espessura</InputLabel>
                <Select
                  id="select-depth-label"
                  labelId="select-depth-label"
                  name="depth"
                  label="Espessura"
                  value={product ? product.depth : ''}
                  onChange={(e) => {
                    product &&
                      setProduct({
                        ...product,
                        depth: Number(e.target.value) ?? 0,
                      });
                  }}
                >
                  {DepthsCommon.map((unit) => (
                    <MenuItem value={unit} key={unit}>
                      {unit}mm
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          )}
          <IconButton onClick={handleAddProduct}>
            {loadingCalc ? (
              <CircularProgress />
            ) : (
              <AddCircleOutlineRoundedIcon />
            )}
          </IconButton>
        </Box>

        <TableProductInfo
          data={watch('products') ? watch('products') || [] : []}
          onDecrementDispatch={(id) =>
            setValue(
              'products',
              (watch('products') || []).map((prod) =>
                prod.rowId === id
                  ? updateProdQtd(prod, prod.actualQuantity - 1)
                  : prod,
              ),
            )
          }
          onIncrementDispatch={(id) =>
            setValue(
              'products',
              (watch('products') || []).map((prod) =>
                prod.rowId === id
                  ? updateProdQtd(prod, prod.actualQuantity + 1)
                  : prod,
              ),
            )
          }
          onDeleteDispatch={(id) =>
            setValue(
              'products',
              (watch('products') || []).filter((prod) => prod.rowId !== id),
            )
          }
        />

        <SectionHeader label="Observações" />

        <Controller
          name="observation"
          control={control}
          render={({ field }) => (
            <TextField
              multiline
              label="Descrição"
              {...field}
              rows={3}
              sx={{
                resize: 'none',
                marginBottom: '20px',
              }}
            />
          )}
        />

        <Controller
          name="userManual"
          control={control}
          render={({ field }) => (
            <TextField
              multiline
              label="Manual de uso"
              {...field}
              rows={3}
              sx={{
                resize: 'none',
              }}
            />
          )}
        />

        <SectionHeader label="Total" />

        <Controller
          name="discount"
          control={control}
          render={({ field }) => (
            <TextField
              type="number"
              label="Desconto em R$"
              sx={{ minWidth: 160, mb: 2 }}
              {...field}
              value={field.value || ''}
              inputProps={{ min: 0 }}
            />
          )}
        />
        <Controller
          name="total"
          control={control}
          render={({ field }) => (
            <TextField
              label="Total"
              disabled
              sx={{ minWidth: 160, mb: 2 }}
              {...field}
              value={formatCurrency(watch('total') ?? 0)}
            />
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
  '/_authenticated/_layout/services/add/',
)({
  component: ServicesCreateForm,
});

import { PageHeader } from '@/components/PageHeader';
import { SectionHeader } from '@/components/SectionHeader';
import { TableProductInfo } from '@/components/TableInfoProduct';
import { DepthsCommon } from '@/features/Dashboard/types';
import { useGetAllProducts } from '@/features/Products/services';
import { ImageInput } from '@/features/Services/components/ImageInput';
import { EditServiceSchema } from '@/features/Services/schemas';
import {
  useGetImagesByServiceId,
  useGetProducstByServiceId,
  useGetServiceById,
  usePutServiceById,
} from '@/features/Services/services';
import { EditServiceValidation, ProductInfo } from '@/features/Services/types';
import { FormatAddress } from '@/features/Services/utils/address';
import { useBudgetItem } from '@/features/Services/utils/budgetItem';
import { calcTotal } from '@/features/Services/utils/calcTotal';
import { checkProduct } from '@/features/Services/utils/checkProduct';
import { formatCurrency } from '@/features/Services/utils/convertMoney';
import { useGetIcons } from '@/hooks/useGetIcons';
import { boxStyles, buttonStyles, formStyles, textFieldStyles } from '@/styles';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import {
  Alert,
  Box,
  Chip,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { createLazyFileRoute } from '@tanstack/react-router';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

dayjs.extend(customParseFormat);

const ServicesEditForm = () => {
  const { id } = Route.useParams();
  const [images, setImages] = useState<File[]>([]);

  const { data: products } = useGetAllProducts();
  const { data: service } = useGetServiceById(id);
  const { mutate: putService, isPending } = usePutServiceById();
  const { data: productsPersisted } = useGetProducstByServiceId(id);
  const { data: imagesPersisted } = useGetImagesByServiceId(id);
  const { calculateTotal, budgetItemsToEditTable } = useBudgetItem();
  const [product, setProduct] = useState<ProductInfo>();
  const { AddCircleOutlineRoundedIcon } = useGetIcons();
  const [persistedImagesState, setPersitedImagesState] = useState<any[]>([]);
  const onSubmit: SubmitHandler<EditServiceValidation> = (data) => {
    putService({
      data: {
        ...data,
        files: images,
        deliveryForecast: data.deliveryForecast
          ? dayjs(data.deliveryForecast).format('DD-MM-YYYY')
          : undefined,
      },
      imagesPersistedArr: persistedImagesState,
    });
  };

  useEffect(() => {
    if (service) {
      const formattedDate = dayjs(
        service.deliveryForecast,
        'DD-MM-YYYY',
      ).format('YYYY-MM-DD');
      setValue('deliveryForecast', formattedDate);
      setValue('discount', service.discount);
      setValue('images', service.images);
      setValue('ownerName', service.ownerName);
      setValue('observation', service.observation ?? undefined);
      setValue('userManual', service.userManual);
      setValue('downPayment', service.downPayment ?? undefined);
      setValue('paymentMethod', service.paymentMethod ?? 'DINHEIRO');
      setValue('total', service.total);
      setValue('status', service.status);
      setValue('id', service.id);
      setValue(
        'products',
        budgetItemsToEditTable(productsPersisted?.items || []),
      );
    }
  }, [service]);

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useForm<EditServiceValidation>({
    resolver: yupResolver(EditServiceSchema),
    defaultValues: {
      total: service?.total ?? 0,
      address: service?.address,
      ownerName: service?.ownerName,
      status: 'ORCADO',
      downPayment: 0,
      paymentMethod: 'DINHEIRO',
      images: service?.images,
      discount: 0,
      files: [],
      id: service?.id,
    },
  });

  const disableFields = service?.status === 'FINALIZADO';

  useEffect(() => {
    let discount = watch('discount');
    if (products && watch('products') && discount) {
      setValue(
        'total',
        calcTotal({
          products: watch('products') || [],
          discount: discount > 0 ? discount : 0,
        }),
      );
    }
  }, [products, watch('products'), watch('discount')]);

  useEffect(() => {
    if (imagesPersisted) {
      setPersitedImagesState(imagesPersisted);
    }
  }, [imagesPersisted]);

  useEffect(() => {
    setValue(
      'products',
      budgetItemsToEditTable(productsPersisted?.items || []),
    );
  }, [productsPersisted]);

  const handleAddProduct = () => {
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
          price: calculateTotal(product),
          type: product.type,
        },
      ]);
      setProduct(undefined);
    }
  };

  const updateProdQtd = (prod: ProductInfo, newAmount: number): ProductInfo => {
    const amount = newAmount > 0 ? newAmount : 1;
    return {
      ...prod,
      actualQuantity: amount,
      price: prod.price,
    };
  };

  return (
    <Box sx={boxStyles}>
      <form onSubmit={handleSubmit(onSubmit)} style={formStyles}>
        <PageHeader title="Editar Serviço" backTo="/services" />
        <SectionHeader label="Informações" />
        {disableFields && (
          <Alert
            variant="standard"
            color="info"
            sx={{
              marginBottom: '20px',
            }}
          >
            Este serviço já foi finalizado, portanto não é possível realizar
            qualquer alteração.
          </Alert>
        )}
        <Controller
          name="ownerName"
          control={control}
          render={({ field }) => (
            <FormControl variant="outlined">
              <TextField
                disabled
                {...field}
                error={errors.ownerName !== undefined}
                helperText={errors.ownerName?.message}
              />
            </FormControl>
          )}
        />

        <Box sx={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <FormControl sx={textFieldStyles}>
            <TextField
              type="text"
              id="address"
              label="Endereço"
              placeholder="Digite o endereço completo"
              value={FormatAddress(service?.address)}
              disabled
              error={errors.address !== undefined}
              helperText={errors?.address?.address?.message}
            />
          </FormControl>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              marginBottom: '1rem',
              flex: '1',
            }}
          >
            <Controller
              name="images"
              control={control}
              render={({ field }) => (
                <ImageInput
                  disabled={disableFields}
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
              {persistedImagesState &&
                persistedImagesState.map((img, key) => (
                  <Chip
                    key={key}
                    label={'Imagem salva ' + img.id}
                    onDelete={
                      !disableFields
                        ? () => {
                            setPersitedImagesState(
                              persistedImagesState?.filter(
                                (imgP) => imgP.id !== img.id,
                              ),
                            );
                          }
                        : undefined
                    }
                  />
                ))}
              {images &&
                images.map((img, key) => (
                  <Chip
                    key={key}
                    label={img.name.slice(0, 6)}
                    onDelete={() =>
                      !disableFields
                        ? setImages((prev) =>
                            prev.filter((_img, index) => key !== index),
                          )
                        : undefined
                    }
                  />
                ))}
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <FormControl variant="outlined" sx={{ flex: 1, pt: 1 }}>
            <Controller
              name="deliveryForecast"
              control={control}
              render={({ field }) => (
                <TextField
                  type="date"
                  id="date"
                  disabled={disableFields}
                  label="Previsão de entrega"
                  {...field}
                  value={
                    field.value
                      ? dayjs(field.value, 'YYYY-MM-DD').format('YYYY-MM-DD')
                      : dayjs().format('YYYY-MM-DD')
                  }
                  onChange={(e) => {
                    const formattedDate = dayjs(
                      e.target.value,
                      'YYYY-MM-DD',
                    ).format('YYYY-MM-DD');
                    field.onChange(formattedDate);
                  }}
                />
              )}
            />
          </FormControl>
          <FormControl variant="outlined" sx={{ flex: 1, pt: 1 }}>
            <InputLabel id="select-status-label">Status</InputLabel>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select
                  labelId="select-status-label"
                  id="select-status"
                  disabled={disableFields}
                  label="Status"
                  {...field}
                  value={watch('status')}
                >
                  <MenuItem value={'ORCADO'} key={'ORCADO'}>
                    Orçado
                  </MenuItem>
                  <MenuItem
                    value={'CONTRATADO_A_VISTA'}
                    key={'CONTRATADO_A_VISTA'}
                  >
                    Contratado a vista
                  </MenuItem>
                  <MenuItem
                    value={'CONTRATADO_A_PRAZO'}
                    key={'CONTRATADO_A_PRAZO'}
                  >
                    Contratado a prazo
                  </MenuItem>
                  <MenuItem value={'FINALIZADO'} key={'FINALIZADO'}>
                    Finalizado
                  </MenuItem>
                </Select>
              )}
            />
          </FormControl>
        </Box>

        <Box
          sx={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
            mt: '1rem',
          }}
        >
          <FormControl variant="outlined" sx={{ flex: 1, pt: 1 }}>
            <InputLabel id="select-payment-label">
              Método de Pagamento
            </InputLabel>
            <Controller
              name="paymentMethod"
              control={control}
              render={({ field }) => (
                <Select
                  labelId="select-payment-label"
                  id="select-payment"
                  disabled={disableFields}
                  label="Método de Pagamento"
                  {...field}
                  value={watch('paymentMethod')}
                >
                  <MenuItem value={'DINHEIRO'} key={'DINHEIRO'}>
                    Dinheiro
                  </MenuItem>
                  <MenuItem value={'CREDITO'} key={'CREDITO'}>
                    Crédito
                  </MenuItem>
                  <MenuItem value={'DEBITO'} key={'DEBITO'}>
                    Débito
                  </MenuItem>
                  <MenuItem value={'PIX'} key={'PIX'}>
                    Pix
                  </MenuItem>
                </Select>
              )}
            />
          </FormControl>
          <FormControl variant="outlined" sx={{ flex: 1, pt: 1 }}>
            <Controller
              name="downPayment"
              control={control}
              render={({ field }) => (
                <TextField
                  type="number"
                  disabled={disableFields}
                  label="Entrada em R$"
                  {...field}
                  value={field.value || ''}
                />
              )}
            />
          </FormControl>
        </Box>

        <SectionHeader label="Produtos" />
        <Box sx={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <FormControl variant="outlined" sx={{ flex: 1, minWidth: '200px' }}>
            <InputLabel id="select-product-label">Produto</InputLabel>
            <Select
              labelId="select-product-label"
              id="select-product"
              disabled={disableFields}
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
                    category: prodSelected.category,
                    depth: prodSelected.depth,
                    height: prodSelected.height,
                    price: prodSelected.price,
                    width: prodSelected.width,
                    idProduct: prodSelected.idProduct,
                    type: prodSelected.type,
                    rowId: uuidv4(),
                  });
              }}
              value={product?.id || ''}
            >
              {products?.map((product) => (
                <MenuItem value={product.id} key={product.id}>
                  {product.name} - {product.category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {product?.category !== 'DIVERSOS' && (
            <>
              <FormControl
                variant="outlined"
                sx={{ flex: 1, minWidth: '200px' }}
              >
                <TextField
                  id="heightTxt"
                  disabled={disableFields}
                  value={
                    Number(product?.height) === 0 ? 0 : Number(product?.height)
                  }
                  label="Altura (M)"
                  name="height"
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
              <FormControl
                variant="outlined"
                sx={{ flex: 1, minWidth: '200px' }}
              >
                <TextField
                  id="widthTxt"
                  name="width"
                  disabled={disableFields}
                  value={
                    Number(product?.width) === 0 ? 0 : Number(product?.width)
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
                  disabled={disableFields}
                  label={'Espessura'}
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
          <IconButton onClick={handleAddProduct} disabled={disableFields}>
            <AddCircleOutlineRoundedIcon />
          </IconButton>
        </Box>
        <TableProductInfo
          data={watch('products') ? watch('products') || [] : []}
          disableActions={disableFields}
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
              disabled={disableFields}
              InputLabelProps={{
                shrink: !!field.value,
              }}
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
              disabled={disableFields}
              label="Desconto em R$"
              sx={{ minWidth: 160, mb: 2 }}
              {...field}
              value={field.value || ''}
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
          disabled={disableFields}
          variant="contained"
          sx={buttonStyles}
          loading={isPending}
        >
          Salvar
        </LoadingButton>
      </form>
    </Box>
  );
};

export const Route = createLazyFileRoute(
  '/_authenticated/_layout/services/edit/$id',
)({
  component: ServicesEditForm,
});

import { CloseButton } from '@/components/CloseButton';
import { Loader } from '@/components/Loader';
import { modalStyles } from '@/styles';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { modalHeaderStyles, modalTitleStyles } from '../styles';
import { TransactionStockSchema } from './schemas';
import { useGetAllProductsWithNameAndId, useReceiveProduct } from './services';
import { stockProductStyles } from './styles';
import {
  ProductWithNameAndId,
  TransactionStock,
  TransactionType,
} from './types';

interface StockFormProps {
  open: boolean;
  onClose: () => void;
  variant: 'DOWN' | 'ENTER';
}

export const StockForm = ({ onClose, open, variant }: StockFormProps) => {
  const [selectedProduct, setSelectedProduct] =
    useState<ProductWithNameAndId | null>(null);
  const { data: product } = useGetAllProductsWithNameAndId();
  const { mutate: receiveProduct, isPending, isSuccess } = useReceiveProduct();
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(TransactionStockSchema),
    defaultValues: {
      idProduct: '',
      movementQuantity: 0,
      transactionType:
        variant === 'ENTER'
          ? TransactionType.ENTRADA
          : TransactionType.BAIXAESTOQUE,
    },
  });
  useEffect(() => {
    setValue(
      'transactionType',
      variant === 'ENTER'
        ? TransactionType.ENTRADA
        : TransactionType.BAIXAESTOQUE,
    );
  }, [variant]);

  const onSubmit: SubmitHandler<TransactionStock> = (data) => {
    receiveProduct(data);
  };

  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
  }, [isSuccess]);

  if (!product) return <Loader open />;

  return (
    <Modal open={open} onClose={onClose} sx={modalStyles}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={stockProductStyles}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1em',
            }}
          >
            <Box sx={modalHeaderStyles}>
              <CloseButton onClose={onClose} />
            </Box>

            <Typography sx={modalTitleStyles} variant="h5">
              {variant === 'DOWN' ? 'Baixa de estoque' : 'Entrada de Estoque'}
            </Typography>
            <Divider />
            <Controller
              name="idProduct"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  value={selectedProduct}
                  onChange={(_e, newValue) => {
                    setSelectedProduct(newValue);
                    field.onChange(newValue ? newValue.id : 0);
                  }}
                  options={product}
                  getOptionLabel={(option) => option.name}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Produto Diversos"
                      error={!!errors.idProduct}
                      helperText={errors.idProduct?.message}
                    />
                  )}
                />
              )}
            />
            <Controller
              name="movementQuantity"
              control={control}
              render={({ field }) => (
                <TextField
                  type="number"
                  id="movementQuantity"
                  label="Quantidade"
                  placeholder="Digite a quantidade"
                  error={!!errors.movementQuantity}
                  helperText={errors.movementQuantity?.message}
                  {...field}
                />
              )}
            />
          </Box>
          <Box
            display={'flex'}
            justifyContent={'flex-end'}
            width={'100%'}
            gap={'1em'}
            paddingTop={'1em'}
            sx={{
              borderTop: '1px solid #ccc',
            }}
          >
            <Button variant="text" onClick={onClose} color="success">
              Voltar
            </Button>
            <LoadingButton
              variant="contained"
              color="primary"
              type="submit"
              loading={isPending}
            >
              Confirmar
            </LoadingButton>
          </Box>
        </Box>
      </form>
    </Modal>
  );
};

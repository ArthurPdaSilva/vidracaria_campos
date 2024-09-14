import { PageHeader } from '@/components/PageHeader';
import { ClientSchema } from '@/features/Customers/schemas';
import {
  useGetCustomerById,
  useUpdateCustomer,
} from '@/features/Customers/services';
import { boxStylesForm } from '@/features/Customers/styles';
import { CustomerValidation } from '@/features/Customers/types';
import { useGetState } from '@/features/Customers/utils/useGetState';
import useMask from '@/hooks/useMask.tsx';
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

export const Route = createLazyFileRoute(
  '/_authenticated/_layout/customers/edit/$id',
)({
  component: CustomerUpdateForm,
});

function CustomerUpdateForm() {
  const { id } = Route.useParams();
  const states = useGetState();
  const customer = useGetCustomerById(id);
  const updateCustomer = useUpdateCustomer();
  const { maskValue, unmaskValue, phoneMask, handleInputChangeWithMask } =
    useMask();

  const onSubmit: SubmitHandler<CustomerValidation> = async (data) => {
    updateCustomer.mutate({
      ...data,
      phone: unmaskValue(data.phone ?? ''),
    });
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CustomerValidation>({
    resolver: yupResolver(ClientSchema),
    defaultValues: {
      id: '',
      name: '',
      customerType: '',
      cpfcnpj: '',
      email: '',
      phone: '',
      address: {
        address: '',
        zipCode: '',
        state: '',
        city: '',
        number: '',
        landmark: '',
      },
    },
  });

  useEffect(() => {
    if (customer.data) {
      const data = customer.data;

      setValue('id', data.id);
      setValue('name', data.name);
      setValue('customerType', data.customerType);
      setValue('cpfcnpj', data.cpfcnpj);
      setValue('email', data.email);
      setValue('phone', maskValue(phoneMask, data.phone ?? ''));
      setValue('address.address', data.address.address);
      setValue('address.zipCode', data.address.zipCode);
      setValue('address.state', data.address.state);
      setValue('address.city', data.address.city);
      setValue('address.number', data.address.number);
      setValue('address.landmark', data.address.landmark);
    }
  }, [customer.data]);

  return (
    <Box sx={boxStyles}>
      <form onSubmit={handleSubmit(onSubmit)} style={formStyles}>
        <PageHeader backTo="/customers" title="Editar Cliente" />

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
              InputLabelProps={{
                shrink: !!field.value,
              }}
              {...field}
            />
          )}
        />

        <Box sx={boxStylesForm}>
          <Controller
            name="customerType"
            control={control}
            render={({ field }) => (
              <FormControl sx={{ width: '30%', ...textFieldStyles }}>
                <InputLabel id="select-people-label">Pessoa</InputLabel>
                <Select
                  labelId="select-people-label"
                  id="select-people"
                  label="Pessoa"
                  {...field}
                >
                  <MenuItem value={'FISICA'}>Física</MenuItem>
                  <MenuItem value={'JURIDICA'}>Jurídica</MenuItem>
                </Select>
              </FormControl>
            )}
          />
          <Controller
            name="cpfcnpj"
            control={control}
            render={({ field }) => (
              <TextField
                type="text"
                id="cpfcnpj"
                label="cpfcnpj"
                placeholder="Digite o CPF/CNPJ"
                error={!!errors.cpfcnpj}
                helperText={errors.cpfcnpj?.message}
                sx={textFieldStyles}
                {...field}
              />
            )}
          />
        </Box>

        <Box sx={boxStylesForm}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                sx={{
                  width: '68%',
                  ...textFieldStyles,
                }}
                id="email"
                type="text"
                label="Email"
                placeholder="Digite o email do cliente"
                {...field}
                InputLabelProps={{
                  shrink: !!field.value,
                }}
              />
            )}
          />
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <TextField
                sx={textFieldStyles}
                id="phone"
                type="text"
                label="Telefone"
                placeholder="Digite o Telefone do cliente"
                error={!!errors.phone}
                helperText={errors.phone?.message}
                {...field}
                onChange={(e) =>
                  setValue(
                    'phone',
                    handleInputChangeWithMask(
                      e,
                      phoneMask,
                      watch('phone') ?? '',
                    ),
                  )
                }
              />
            )}
          />
        </Box>

        <Controller
          name="address.address"
          control={control}
          render={({ field }) => (
            <TextField
              id="address"
              type="text"
              label="Rua"
              error={!!errors.address?.address}
              helperText={errors.address?.address?.message}
              sx={textFieldStyles}
              placeholder="Digite o nome da rua"
              {...field}
              InputLabelProps={{
                shrink: !!field.value,
              }}
            />
          )}
        />

        <Box sx={boxStylesForm}>
          <Controller
            name="address.zipCode"
            control={control}
            render={({ field }) => (
              <TextField
                sx={{
                  width: '68%',
                  ...textFieldStyles,
                }}
                type="text"
                id="zipCode"
                label="CEP"
                error={!!errors.address?.zipCode}
                helperText={errors.address?.zipCode?.message}
                placeholder="Digite o CEP do cliente"
                {...field}
                InputLabelProps={{
                  shrink: !!field.value,
                }}
              />
            )}
          />
          <Controller
            name="address.state"
            defaultValue="PB"
            control={control}
            render={({ field }) => (
              <FormControl sx={{ width: '30%', ...textFieldStyles }}>
                <InputLabel id="select-state-label">Estado</InputLabel>
                <Select
                  labelId="select-state-label"
                  id="select-state"
                  label="Estado"
                  {...field}
                >
                  {states.map((state) => (
                    <MenuItem key={state} value={state}>
                      {state}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
        </Box>

        <Box sx={boxStylesForm}>
          <Controller
            name="address.city"
            control={control}
            render={({ field }) => (
              <TextField
                sx={{
                  width: '68%',
                  ...textFieldStyles,
                }}
                type="text"
                id="city-textfiled"
                label="Cidade"
                error={!!errors.address?.city}
                helperText={errors.address?.city?.message}
                placeholder="Digite a cidade do cliente"
                {...field}
                InputLabelProps={{
                  shrink: !!field.value,
                }}
              />
            )}
          />
          <Controller
            name="address.number"
            control={control}
            render={({ field }) => (
              <TextField
                sx={{
                  width: '30%',
                  ...textFieldStyles,
                }}
                type="text"
                id="number-address"
                label="Número"
                error={!!errors.address?.number}
                helperText={errors.address?.number?.message}
                placeholder="Digite o número da casa do cliente"
                {...field}
                InputLabelProps={{
                  shrink: !!field.value,
                }}
              />
            )}
          />
        </Box>

        <Controller
          name="address.landmark"
          control={control}
          render={({ field }) => (
            <TextField
              type="text"
              id="landmark"
              sx={textFieldStyles}
              label="Referência"
              placeholder="ex: próximo ao mercado central"
              {...field}
              InputLabelProps={{
                shrink: !!field.value,
              }}
            />
          )}
        />

        <LoadingButton
          id="btn-save"
          type="submit"
          variant="contained"
          sx={buttonStyles}
          loading={updateCustomer.isPending}
        >
          Salvar
        </LoadingButton>
      </form>
    </Box>
  );
}

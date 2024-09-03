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
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import PageHeader from '../../../../../components/PageHeader/index.tsx';
import useGetState from '../../../../../features/Customers/hooks/useGetState.tsx';
import { ClientSchema } from '../../../../../features/Customers/schemas/index.ts';
import { useCreateCustomer } from '../../../../../features/Customers/services/index.tsx';
import { boxStylesForm } from '../../../../../features/Customers/styles/index.ts';
import { CustomerValidation } from '../../../../../features/Customers/types/index.ts';
import useMask from '../../../../../hooks/useMask.tsx';
import {
  boxStyles,
  buttonStyles,
  formStyles,
  textFieldStyles,
} from '../../../../../styles/index.ts';

function CustomerCreateForm() {
  const states = useGetState();
  const createCustomer = useCreateCustomer();
  const {
    unmaskValue,
    phoneMask,
    handleInputChangeWithMask,
    cpfMask,
    cnpjMask,
  } = useMask();

  const onSubmit: SubmitHandler<CustomerValidation> = (data) => {
    createCustomer.mutate({
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
      customerType: 'FISICA',
      name: '',
      phone: '',
      cpfcnpj: '',
      email: '',
      id: '',
      address: {
        address: '',
        city: '',
        landmark: '',
        number: '',
        state: 'PB',
        zipCode: '',
      },
    },
  });

  return (
    <Box sx={boxStyles}>
      <form onSubmit={handleSubmit(onSubmit)} style={formStyles}>
        <PageHeader backTo="/customers" title="Cadastrar Cliente" />

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

        <Box sx={boxStylesForm}>
          <Controller
            name="customerType"
            control={control}
            render={({ field }) => (
              <FormControl sx={textFieldStyles}>
                <InputLabel id="select-people-label">Pessoa</InputLabel>
                <Select
                  labelId="select-people-label"
                  id="select-people"
                  label="Pessoa"
                  {...field}
                  onChange={(e) => {
                    setValue('customerType', e.target.value);
                    setValue('cpfcnpj', '');
                  }}
                >
                  <MenuItem value={'FISICA'} defaultChecked>
                    Física
                  </MenuItem>
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
                label={watch('customerType') === 'FISICA' ? 'CPF' : 'CNPJ'}
                placeholder="Digite o CPF/CNPJ"
                error={!!errors.cpfcnpj}
                helperText={errors.cpfcnpj?.message}
                sx={textFieldStyles}
                {...field}
                onChange={(e) =>
                  setValue(
                    'cpfcnpj',
                    handleInputChangeWithMask(
                      e,
                      watch('customerType') === 'FISICA' ? cpfMask : cnpjMask,
                      watch('cpfcnpj') ?? '',
                    ),
                  )
                }
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
                sx={textFieldStyles}
                id="email"
                type="text"
                label="Email"
                placeholder="Digite o email do cliente"
                error={!!errors.email}
                helperText={errors.email?.message}
                {...field}
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
            />
          )}
        />

        <Box sx={boxStylesForm}>
          <Controller
            name="address.zipCode"
            control={control}
            render={({ field }) => (
              <TextField
                sx={textFieldStyles}
                type="text"
                id="zipCode"
                label="CEP"
                error={!!errors.address?.zipCode}
                helperText={errors.address?.zipCode?.message}
                placeholder="Digite o CEP do cliente"
                {...field}
              />
            )}
          />
          <Controller
            name="address.state"
            defaultValue="PB"
            control={control}
            render={({ field }) => (
              <FormControl sx={textFieldStyles}>
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
                sx={textFieldStyles}
                type="text"
                id="city-textfiled"
                label="Cidade"
                error={!!errors.address?.city}
                helperText={errors.address?.city?.message}
                placeholder="Digite a cidade do cliente"
                {...field}
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
            />
          )}
        />
        <LoadingButton
          id="btn-save"
          type="submit"
          variant="contained"
          sx={buttonStyles}
          loading={createCustomer.isPending}
        >
          Salvar
        </LoadingButton>
      </form>
    </Box>
  );
}

export const Route = createLazyFileRoute(
  '/_authenticated/_layout/customers/add/',
)({
  component: CustomerCreateForm,
});

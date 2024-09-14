import api, { config } from '@/services/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { enqueueSnackbar } from 'notistack';
import { CustomerValidation } from '../types';

const useCreateCustomer = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (customer: CustomerValidation) => {
      const res = await api.post('/customer', customer, config);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/all-customers'] });
      navigate({ to: '/customers' });
      enqueueSnackbar('Cliente salvo com sucesso!', {
        variant: 'success',
      });
    },
    onError: () => {
      enqueueSnackbar('Erro ao salvar o cliente!', {
        variant: 'error',
      });
    },
  });
};

const useUpdateCustomer = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (customer: CustomerValidation) => {
      const res = await api.put(`/customer/${customer.id}`, customer, config);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/all-customers'] });
      queryClient.invalidateQueries({ queryKey: ['/customers'] });
      navigate({ to: '/customers' });
      enqueueSnackbar('Cliente atualizado com sucesso!', {
        variant: 'success',
      });
    },
    onError: () => {
      enqueueSnackbar('Erro ao salvar o cliente!', {
        variant: 'error',
      });
    },
  });
};

const useGetAllCustomers = () => {
  return useQuery<CustomerValidation[]>({
    queryKey: ['/all-customers'],
    queryFn: async () => {
      const res = await api.get('/customer', config);
      return res.data;
    },
  });
};

const useGetCustomerById = (id?: string) => {
  return useQuery<CustomerValidation>({
    queryKey: ['/customers', id],
    queryFn: async () => {
      const res = await api.get(`/customer/${id}`, config);
      return res.data;
    },
    enabled: id !== undefined,
    staleTime: 600000,
  });
};

const useDeleteCustomerById = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(`/customer/${id}`, config);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/all-customers'] });
      queryClient.invalidateQueries({ queryKey: ['/customers'] });
    },
  });
};

export {
  useCreateCustomer,
  useDeleteCustomerById,
  useGetAllCustomers,
  useGetCustomerById,
  useUpdateCustomer,
};

import queryClient from '@/config/queryClient';
import api, { config } from '@/services/api';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { enqueueSnackbar } from 'notistack';
import { CreateGlassPrice } from '../types';

const invalidateQueries = () => {
  queryClient.invalidateQueries({ queryKey: ['/all-products'] });
  queryClient.invalidateQueries({
    queryKey: ['/products'],
  });
  queryClient.invalidateQueries({ queryKey: ['/all-glass-prices'] });
  queryClient.invalidateQueries({
    queryKey: ['/glass-prices'],
  });
};

const useCreateGlassPrice = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (price: CreateGlassPrice) => {
      const res = await api.post(`/api/glass-prices`, price, {
        ...config,
      });
      return res.data;
    },
    onSuccess: () => {
      enqueueSnackbar('Sucesso ao criar o valor de cálculo para o vidro', {
        variant: 'success',
      });
      invalidateQueries();
      navigate({
        to: '/glassprice',
      });
    },
  });
};

const useUpdateGlassPrice = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (data: { price: CreateGlassPrice; id: string }) => {
      const res = await api.patch(`/api/glass-prices/${data.id}`, data.price, {
        ...config,
      });
      return res.data;
    },
    onSuccess: () => {
      enqueueSnackbar('Sucesso ao criar o valor de cálculo para o vidro', {
        variant: 'success',
      });
      invalidateQueries();
      navigate({
        to: '/glassprice',
      });
    },
  });
};

const useGetGlassPriceById = (id: string) => {
  return useQuery({
    queryKey: ['/glass-prices', id],
    queryFn: async () => {
      const res = await api.get(`/api/glass-prices/${id}`, {
        ...config,
      });
      return res.data;
    },
  });
};

const useGetAllGlassPrice = () => {
  return useQuery({
    queryKey: ['/all-glass-prices'],
    queryFn: async () => {
      const res = await api.get(`/api/glass-prices`, {
        ...config,
      });
      return res.data;
    },
  });
};

const useDeleteGlassPrice = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(`/api/glass-prices/${id}`, {
        ...config,
      });
      return res.data;
    },
    onSuccess: () => {
      enqueueSnackbar('Preço removido com sucesso', { variant: 'success' });
      invalidateQueries();
      window.location.reload();
    },
  });
};

export {
  useCreateGlassPrice,
  useDeleteGlassPrice,
  useGetAllGlassPrice,
  useGetGlassPriceById,
  useUpdateGlassPrice,
};

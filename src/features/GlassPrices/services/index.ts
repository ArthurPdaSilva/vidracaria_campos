import api, { config } from '@/services/api';
import { useMutation, useQuery } from '@tanstack/react-query';
import { CreateGlassPrice } from '../types';
import { enqueueSnackbar } from 'notistack';
import { useNavigate } from '@tanstack/react-router';

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
      navigate({
        to: '/glassprice',
      });
    },
  });
};

const useGetGlassPriceById = (id: string) => {
  return useQuery({
    queryKey: ['get/api/glass-prices'],
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
    queryKey: ['get/api/glass-prices'],
    queryFn: async () => {
      const res = await api.get(`/api/glass-prices`, {
        ...config,
      });
      return res.data;
    },
  });
};

const useGetDeleteGlassPrice = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(`/api/glass-prices/${id}`, {
        ...config,
      });
      return res.data;
    },
    onSuccess: () => {
      enqueueSnackbar('Preço removido com sucesso', { variant: 'success' });
      window.location.reload();
    },
  });
};

export {
  useCreateGlassPrice,
  useGetGlassPriceById,
  useGetAllGlassPrice,
  useGetDeleteGlassPrice,
  useUpdateGlassPrice,
};

import api, { config } from '@/services/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { enqueueSnackbar } from 'notistack';
import {
  CreateProductValidation,
  EditProductValidation,
  ProductValidation,
} from '../types';

const useCreateProduct = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (product: CreateProductValidation) => {
      return api.post('/product', product, config).then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/all-products'] });
      queryClient.invalidateQueries({
        queryKey: ['/all-products-with-name-and-id'],
      });
      navigate({ to: '/products' });
      enqueueSnackbar('Produto salvo com sucesso!', {
        variant: 'success',
      });
    },
    onError: () => {
      enqueueSnackbar('Erro ao salvar o Produto!', {
        variant: 'error',
      });
    },
  });
};

const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (product: EditProductValidation) => {
      return api
        .put(`/product/${product.id}`, product, config)
        .then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/all-products'] });
      queryClient.invalidateQueries({
        queryKey: ['/products'],
      });
      navigate({ to: '/products' });
      enqueueSnackbar('Produto atualizado com sucesso!', {
        variant: 'success',
      });
    },
    onError: () => {
      enqueueSnackbar('Erro ao salvar o Produto!', {
        variant: 'error',
      });
    },
  });
};

const useGetAllProducts = () => {
  return useQuery<ProductValidation[]>({
    queryKey: ['/all-products'],
    queryFn: async () => {
      const res = await api.get('/product/allProductsToList', config);
      return res.data;
    },
    staleTime: Infinity,
  });
};

const useGetProductById = (id?: string) => {
  return useQuery<EditProductValidation>({
    queryKey: ['/products', id],
    queryFn: () => {
      return api.get(`/product/${id}`, config).then((res) => res.data);
    },
    enabled: id !== undefined,
    staleTime: 600000,
  });
};

const useDeleteProductById = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => {
      return api.delete(`/product/${id}`, config).then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/all-products'] });
      queryClient.invalidateQueries({
        queryKey: ['/all-products-with-name-and-id'],
      });
      enqueueSnackbar('Produto deletado com sucesso!', {
        variant: 'success',
      });
    },
  });
};

export {
  useCreateProduct,
  useDeleteProductById,
  useGetAllProducts,
  useGetProductById,
  useUpdateProduct,
};

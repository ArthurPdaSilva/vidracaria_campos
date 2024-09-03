import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import api, { config } from '../../../../services';
import { ProductWithNameAndId, TransactionStock } from '../types';

const useReceiveProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (product: TransactionStock) => {
      return api
        .put('/stock/receiveProduct', product, config)
        .then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/all-products'] });
      enqueueSnackbar('Quantidade adicionada com sucesso!', {
        variant: 'success',
      });
    },
    onError: () => {
      enqueueSnackbar('Erro ao adicionar quantidade ao Produto!', {
        variant: 'error',
      });
    },
  });
};

const useGetAllProductsWithNameAndId = () => {
  return useQuery<ProductWithNameAndId[]>({
    queryKey: ['/all-products-with-name-and-id'],
    queryFn: async () => {
      const res = await api.get('/product/productsWithQuantity', config);
      return res.data;
    },
    staleTime: Infinity,
  });
};

export { useGetAllProductsWithNameAndId, useReceiveProduct };

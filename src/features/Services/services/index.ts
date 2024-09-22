import api, { config } from '@/services/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { enqueueSnackbar } from 'notistack';
import {
  CreateServiceValidation,
  EditServiceValidation,
  GetProductsByService,
  Image,
  ServiceValidationTable,
} from '../types';

const useGetAllServices = () => {
  return useQuery<ServiceValidationTable[]>({
    queryKey: ['/all-services'],
    queryFn: async () => {
      const res = await api.get('/budget/listBudgets', config);
      return res.data;
    },
    staleTime: Infinity,
  });
};

const useDeleteServiceById = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => {
      return api.delete(`/budget/${id}`, config).then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/all-services'] });
      queryClient.invalidateQueries({ queryKey: ['/dashboard-counters'] });
      enqueueSnackbar('Serviço deletado com sucesso!', {
        variant: 'success',
      });
    },
  });
};

const usePutServiceById = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (params: {
      data: EditServiceValidation;
      imagesPersistedArr: Image[];
    }) => {
      const formData = new FormData();
      let urls = [];

      if (params.data.files && params.data.files.length > 0) {
        params.data.files.forEach((file) => {
          formData.append('image', file);
        });
        urls = await api
          .post('/image', formData, config)
          .then((res) => res.data);
      }
      const dataConverted = {
        id: params.data.id,
        status: params.data.status,
        paymentMethod: params.data.paymentMethod,
        deliveryForecast: params.data.deliveryForecast,
        userManual: params.data.userManual,
        discount: params.data.discount,
        observation: params.data.observation,
        downPayment: params.data.downPayment,
        imgs: [
          ...params.imagesPersistedArr,
          ...urls.map((image: string) => ({ url: image, id: '' })),
        ],
        items: params.data.products.map((item) => ({
          id: item.id,
          quantity: item.actualQuantity,
          price: item.price,
          name: item.name,
          idProduct: item.idProduct,
          height: item.height,
          width: item.width,
          depth: item.depth,
          category: item.category,
          glassType: item.glassType,
        })),
      };
      return api
        .put(`/budget/${params.data.id}`, dataConverted, config)
        .then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/service'] });
      queryClient.invalidateQueries({ queryKey: ['/services-products'] });
      queryClient.invalidateQueries({ queryKey: ['/all-services'] });
      queryClient.invalidateQueries({ queryKey: ['/services-images'] });
      queryClient.invalidateQueries({ queryKey: ['/dashboard-counters'] });
      enqueueSnackbar('Serviço editado com sucesso!', {
        variant: 'success',
      });
      navigate({ to: '/services' });
    },
  });
};

const useDeleteImageById = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (path: string) => {
      return api.delete(`/image?url=${path}`, config).then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/delete-image-by-id'] });
      queryClient.invalidateQueries({ queryKey: ['/dashboard-counters'] });
      enqueueSnackbar('Serviço deletado com sucesso!', {
        variant: 'success',
      });
    },
  });
};

const useCreateService = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (service: CreateServiceValidation) => {
      console.log('🚀 ~ mutationFn: ~ service:', service);
      const formData = new FormData();
      let urls = [];

      if (service.files && service.files.length > 0) {
        service.files.forEach((file) => {
          formData.append('image', file);
        });
        urls = await api
          .post('/image', formData, config)
          .then((res) => res.data);
      }
      const serviceToCreate = {
        idCustomer: service.client,
        status: service.status,
        discount: service.discount,
        images: urls,
        observation: service.observation,
        paymentMethod: 'DINHEIRO',
        userManual: service.userManual,
        items: service.products.map((product) => {
          return {
            idProduct: product.id,
            quantity: product.actualQuantity,
            category: product.category,
            height: product.height ?? 0,
            width: product.width ?? 0,
            depth: product.depth ?? 0,
            name: product.name,
            glassType: product.glassType,
          };
        }),
      };
      return api
        .post('/budget', serviceToCreate, config)
        .then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/all-services'] });
      queryClient.invalidateQueries({ queryKey: ['/dashboard-counters'] });

      navigate({ to: '/services' });
      enqueueSnackbar('Serviço salvo com sucesso!', {
        variant: 'success',
      });
    },
    onError: () => {
      enqueueSnackbar('Erro ao salvar o Serviço!', {
        variant: 'error',
      });
    },
  });
};

const useGetServiceById = (id?: string) => {
  return useQuery<EditServiceValidation>({
    queryKey: ['/service', id],
    queryFn: async () => {
      const res = await api.get(`/budget/${id}`, config);
      return res.data;
    },
    enabled: id !== undefined,
    staleTime: 600000,
  });
};

const useGetProducstByServiceId = (id?: string) => {
  return useQuery<GetProductsByService>({
    queryKey: ['/services-products', id],
    queryFn: async () => {
      const res = await api.get(`/budget/productsByBudgetId/${id}`, config);
      return res.data;
    },
    enabled: id !== undefined,
    staleTime: 600000,
  });
};

const useGenerateBudgetPdf = () => {
  return useMutation({
    mutationFn: async (data: { id: string; clientName: string }) => {
      const res = await api.post(
        `/budget/printToPdf/${data.id}`,
        {},
        {
          ...config,
          responseType: 'blob',
        },
      );
      const blob = new Blob([res.data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${data.clientName}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    },
  });
};

const useGenerateDashPdf = () => {
  return useMutation({
    mutationFn: async (data: { startDate: string; endDate: string }) => {
      const res = await api.post(`/reports/generateResume`, data, {
        ...config,
        responseType: 'blob',
      });
      const blob = new Blob([res.data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Relatório Faturamento ${data.startDate} até ${data.endDate}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    },
  });
};

const useGetImagesByServiceId = (id?: string) => {
  return useQuery<Image[]>({
    queryKey: ['/services-images', id],
    queryFn: async () => {
      const res = await api.get(`/budget/imagesByBudgetId/${id}`, config);
      return res.data;
    },
    enabled: id !== undefined,
    staleTime: 600000,
  });
};

export {
  useCreateService,
  useDeleteImageById,
  useDeleteServiceById,
  useGenerateBudgetPdf,
  useGenerateDashPdf,
  useGetAllServices,
  useGetImagesByServiceId,
  useGetProducstByServiceId,
  useGetServiceById,
  usePutServiceById,
};

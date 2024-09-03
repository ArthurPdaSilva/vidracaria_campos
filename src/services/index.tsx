import axios from 'axios';
import { enqueueSnackbar } from 'notistack';

const api = axios.create({
  baseURL: import.meta.env.VITE_URL,
});

export const config = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
};

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const errorMessage =
      (error.response && error.response.data) ||
      'Erro desconhecido ao realizar a operação.';
    enqueueSnackbar(errorMessage, {
      variant: 'error',
    });
    return Promise.reject(error);
  },
);

export default api;

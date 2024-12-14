import { clearToken, getToken } from '@/utils/tokens';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';

const api = axios.create({
  baseURL: import.meta.env.VITE_URL,
});

export const config = {
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
};

const HTTP_STATUS = {
  UNAUTHORIZED: 401,
  INTERNAL_SERVICE_ERROR: 500,
};

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === HTTP_STATUS.UNAUTHORIZED) {
      clearToken();
      window.location.href = '/';
    }

    let errorMessage = 'Ocorreu um erro desconhecido.';

    if (error.response) {
      if (error.response.data) {
        if (error.response.data.message) {
          errorMessage = error.response.data.message;
        } else if (Array.isArray(error.response.data.messages)) {
          errorMessage = error.response.data.messages.join('\n');
        } else if (typeof error.response.data === 'string') {
          errorMessage = error.response.data;
        }
      } else if (error.response.status === HTTP_STATUS.INTERNAL_SERVICE_ERROR) {
        errorMessage = 'Erro interno no servidor.';
      }
    } else if (error.message) {
      errorMessage = error.message;
    }

    enqueueSnackbar(errorMessage, { variant: 'error' });

    return Promise.reject(error);
  },
);

export default api;

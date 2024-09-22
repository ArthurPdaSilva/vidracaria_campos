import { clearToken, getToken } from '@/utils/tokens';
import axios from 'axios';

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

    return Promise.reject(error);
  },
);

export default api;

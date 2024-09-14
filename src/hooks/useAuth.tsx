import { clearToken, getToken } from '@/utils/tokens';
import api from '../services/api';

export const useAuth = () => {
  const verifyToken = async (token: string) => {
    if (token.length > 0) {
      await api
        .post(`/auth/isValidToken?token=${token}`)
        .then((res) => res.data)
        .catch(() => clearToken());
    }
  };

  const isAuthenticated = () => {
    const token = getToken() || '';
    verifyToken(token);

    return token !== '';
  };

  return { isAuthenticated };
};

export type AuthContext = ReturnType<typeof useAuth>;

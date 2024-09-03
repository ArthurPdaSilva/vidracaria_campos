import api from '../services';

export const useAuth = () => {
  const verifyToken = async (token: string) => {
    if (token.length > 0) {
      await api
        .post(`/auth/isValidToken?token=${token}`)
        .then((res) => res.data)
        .catch(() => localStorage.clear());
    }
  };

  const isAuthenticated = () => {
    const token = localStorage.getItem('token') || '';
    verifyToken(token);
    return token !== '';
  };

  return { isAuthenticated };
};

export type AuthContext = ReturnType<typeof useAuth>;

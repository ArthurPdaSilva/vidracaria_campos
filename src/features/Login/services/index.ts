import api from '@/services/api';
import { setToken } from '@/utils/tokens';
import { useMutation } from '@tanstack/react-query';
import { UserValidation } from '../types';

const useAuthUser = () => {
  return useMutation({
    mutationFn: (user: UserValidation) => {
      return api.post('/auth', user).then((res) => res.data);
    },
    onSuccess: (data) => {
      setToken(data.token);
      window.location.reload();
    },
  });
};

export { useAuthUser };

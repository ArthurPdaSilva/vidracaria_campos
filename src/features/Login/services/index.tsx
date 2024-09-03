import { useMutation } from '@tanstack/react-query';
import api from '../../../services';
import { UserValidation } from '../types';

const useAuthUser = () => {
  return useMutation({
    mutationFn: (user: UserValidation) => {
      return api.post('/auth', user).then((res) => res.data);
    },
    onSuccess: (data) => {
      localStorage.setItem(
        'token',
        JSON.stringify(data.token).replace('"', '').replace('"', ''),
      );
      window.location.reload();
    },
  });
};

export { useAuthUser };

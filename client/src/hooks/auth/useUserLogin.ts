import AuthService from '@/services/AuthService';
import { useUserStore } from '@/stores/UserStore';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const useUserLogin = (resetForm: () => void) => {
  const login = useUserStore((state) => state.login);
  const navigate = useNavigate();

    return useMutation({
      mutationKey: ['login'],
      mutationFn: AuthService.login,
      onSuccess: (data) => {
        login({tokens: data.tokens, user: data.user});
        resetForm();
        navigate('/');
      },
    });
};

export default useUserLogin;
import AuthService from '@/services/AuthService';
import { useUserStore } from '@/shared/models/stores/user/user.store';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const useUserLogout = () => {
  const logout = useUserStore((state) => state.logout);
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ['logout'],
    mutationFn: AuthService.logout,
    onSuccess: () => {
      logout();
      navigate('/login');
    },
  });
};

export default useUserLogout;

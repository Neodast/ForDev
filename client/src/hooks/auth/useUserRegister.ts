import AuthService from '@/services/AuthService';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const useUserRegister = (resetForm: () => void) => {
  const navigate = useNavigate();


  return useMutation({
    mutationKey: ['register'],
    mutationFn: AuthService.registration,
    onSuccess: () => {
      resetForm();
      navigate('/login');
    },
  });
}

export default useUserRegister;
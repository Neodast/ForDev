import ThreadService from '@/services/ThreadService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const useThreadDelete = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ['deleteThread'],
    mutationFn: ThreadService.deleteThread,
    onSuccess: async () => {
      navigate('/threads');
      await queryClient.invalidateQueries({ queryKey: ['threads'] });
      await queryClient.invalidateQueries({ queryKey: ['thread'] });
    },
  });
};

export default useThreadDelete;
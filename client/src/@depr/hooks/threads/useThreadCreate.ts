import ThreadService from '@/services/ThreadService';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useThreadCreate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['creteThread'],
    mutationFn: ThreadService.createThread,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['threads'] });
      await queryClient.invalidateQueries({ queryKey: ['thread'] });

    },
  });
};

export default useThreadCreate;
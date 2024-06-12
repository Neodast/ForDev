import ThreadService from '@/services/ThreadService';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useThreadEdit = (threadId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['editThread'],
    mutationFn: ThreadService.editThread,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['thread', threadId] });
      await queryClient.invalidateQueries({ queryKey: ['threads'] });
    },
  });
};

export default useThreadEdit;

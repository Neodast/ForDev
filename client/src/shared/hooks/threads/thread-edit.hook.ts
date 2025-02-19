import { threadService } from '@/shared/api/services';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useThreadEdit = (threadId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['editThread'],
    mutationFn: threadService.editThread,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['thread', threadId] });
      await queryClient.invalidateQueries({ queryKey: ['threads'] });
    },
  });
};

export default useThreadEdit;

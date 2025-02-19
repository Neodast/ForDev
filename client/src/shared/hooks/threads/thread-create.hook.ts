import { threadService } from '@/shared/api/services';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useThreadCreate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['creteThread'],
    mutationFn: threadService.createThread,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['threads'] });
      await queryClient.invalidateQueries({ queryKey: ['thread'] });

    },
  });
};
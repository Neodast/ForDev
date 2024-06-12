import LikeService from '@/services/LikeService';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useLikeThread = (threadId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['likeThread'],
    mutationFn: LikeService.likeThread,
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ["likes", threadId]});
    },
  });
};

export default useLikeThread;

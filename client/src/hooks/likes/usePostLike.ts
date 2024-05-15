import LikeService from '@/services/LikeService';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useLikePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['likePost'],
    mutationFn: LikeService.likePost,
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ["likes"]});
    },
  });
};

export default useLikePost;

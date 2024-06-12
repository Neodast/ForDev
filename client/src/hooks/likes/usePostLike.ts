import LikeService from '@/services/LikeService';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useLikePost = (postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['likePost'],
    mutationFn: LikeService.likePost,
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ["likes", postId]});
    },
  });
};

export default useLikePost;

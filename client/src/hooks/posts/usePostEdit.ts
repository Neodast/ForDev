import PostService from '@/services/PostService';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const usePostEdit = (postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['editPost'],
    mutationFn: PostService.editPost,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['post', postId] });
      await queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

export default usePostEdit;

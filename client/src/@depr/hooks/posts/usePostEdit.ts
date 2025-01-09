import PostService from '@/services/PostService';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const usePostEdit = (postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: PostService.editPost,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['post', postId] });
    },
  });
};

export default usePostEdit;

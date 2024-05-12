import PostService from '@/services/PostService';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useEditPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['editPost'],
    mutationFn: PostService.editPost,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

export default useEditPost;

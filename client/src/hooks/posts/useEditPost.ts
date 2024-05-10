import PostService from '@/services/PostService';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useEditPost = (resetForm?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['editPost'],
    mutationFn: PostService.editPost,
    onSuccess: async () => {
      if (resetForm) {
        resetForm();
      }
      await queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

export default useEditPost;

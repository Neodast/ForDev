import PostService from '@/services/PostService';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const usePostCreate = (resetForm: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: PostService.createPost,
    onSettled: async() => {
      resetForm();
      await queryClient.invalidateQueries({ queryKey: ['post'] });
    },
  });
};

export default usePostCreate;

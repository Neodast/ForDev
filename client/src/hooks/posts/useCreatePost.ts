import PostService from '@/services/PostService';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useCreatePost = (resetForm: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['cretePost'],
    mutationFn: PostService.createPost,
    onSuccess: async () => {
      resetForm();
      await queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

export default useCreatePost;

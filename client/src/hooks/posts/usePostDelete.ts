import PostService from '@/services/PostService';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const usePostDelete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['deletePost'],
    mutationFn: PostService.deletePost,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

export default usePostDelete;

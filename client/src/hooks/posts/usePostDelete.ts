import PostService from '@/services/PostService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const usePostDelete = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: PostService.deletePost,
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['post'] });
    },
    onSuccess: async () => {
      navigate('/posts');
    },
  });
};

export default usePostDelete;

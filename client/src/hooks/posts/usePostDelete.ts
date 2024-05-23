import PostService from '@/services/PostService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const usePostDelete = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ['deletePost'],
    mutationFn: PostService.deletePost,
    onSuccess: async () => {
      navigate('/posts');
      await queryClient.invalidateQueries({ queryKey: ['posts'] });
      await queryClient.invalidateQueries({ queryKey: ['post'] });
    },
  });
};

export default usePostDelete;

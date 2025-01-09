import CommentService from '@/services/CommentService';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useCommentDelete = (postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['deleteComment'],
    mutationFn: CommentService.deleteComment,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['comments'] });
      await queryClient.invalidateQueries({queryKey: ["post",  postId]});
    },
  });
};

export default useCommentDelete;

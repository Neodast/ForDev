import CommentService from '@/shared/api/services/comment.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useCommentEdit = (postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['editComment'],
    mutationFn: CommentService.editComment,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['comments'] });
      await queryClient.invalidateQueries({queryKey: ["post",  postId]});
    },
  });
};

export default useCommentEdit;

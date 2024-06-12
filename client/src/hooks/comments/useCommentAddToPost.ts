import CommentService from '@/services/CommentService';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useCommentAddToPost = (postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['commentAddToPost'],
    mutationFn: CommentService.addPostComment,
    onSuccess: async() => {
      queryClient.invalidateQueries({queryKey: ["comments",  postId]});
      queryClient.invalidateQueries({queryKey: ["post",  postId]});
    }
  })
}

export default useCommentAddToPost;
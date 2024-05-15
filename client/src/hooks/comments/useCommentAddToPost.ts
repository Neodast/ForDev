import CommentService from '@/services/CommentService';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useCommentAddToPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['commentAddToPost'],
    mutationFn: CommentService.addPostComment,
    onSuccess: async() => {
      queryClient.invalidateQueries();
    }
  })
}

export default useCommentAddToPost;
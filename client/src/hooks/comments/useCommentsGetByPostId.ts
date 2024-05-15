import CommentService from '@/services/CommentService'
import { useQuery } from '@tanstack/react-query'

const useCommentsGetByPostId = (postId: number) => {
  return useQuery({
    queryKey: ['postComments', postId],
    queryFn: () => CommentService.getCommentsByPostId(postId),
  })
}

export default useCommentsGetByPostId;
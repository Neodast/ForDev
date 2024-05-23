import PostService from '@/services/PostService'
import { useQuery } from '@tanstack/react-query'

const usePostGet = (postId: number) => {
  return useQuery({
    queryKey: ['post', postId],
    queryFn: () => PostService.getPostById(postId),
  })
}

export default usePostGet;
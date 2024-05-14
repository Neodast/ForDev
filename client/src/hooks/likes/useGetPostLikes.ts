import LikeService from '@/services/LikeService'
import { useQuery } from '@tanstack/react-query'

const useGetPostLikes = (postId: number) => {
  return useQuery({
    queryKey: ["likes", postId],
    queryFn:() => LikeService.getPostLikesCount(postId),

  });
};

export default useGetPostLikes;